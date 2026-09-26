import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "../../../../lib/supabase/admin";

const schema = z.object({ code: z.string().min(6).max(16) });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Código inválido." }, { status: 400 });

  const code = parsed.data.code.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const cookieStore = await cookies();
  const pairingId = cookieStore.get("torvya_pairing_session")?.value;

  if (!pairingId) {
    return NextResponse.json({ error: "A sessão de conexão expirou. Recomece pelo primeiro meio." }, { status: 410 });
  }

  const admin = createSupabaseAdminClient();
  if (!admin) return NextResponse.json({ error: "Ambiente ainda não conectado ao Supabase." }, { status: 503 });

  const { data: session } = await admin
    .from("pairing_sessions")
    .select("id,first_media_id,email,destination_type,destination_url,state,expires_at")
    .eq("id", pairingId)
    .maybeSingle();

  if (!session || session.state !== "pending" || new Date(session.expires_at) <= new Date()) {
    cookieStore.delete("torvya_pairing_session");
    return NextResponse.json({ error: "A sessão de conexão expirou." }, { status: 410 });
  }

  const [{ data: first }, { data: second }] = await Promise.all([
    admin.from("media_tokens").select("id,code,medium,plate_id,product_type,batch_id,sequence_number").eq("id", session.first_media_id).maybeSingle(),
    admin.from("media_tokens").select("id,code,medium,plate_id,product_type,batch_id,sequence_number").eq("code", code).maybeSingle()
  ]);

  if (!first || !second) return NextResponse.json({ error: "Não foi possível identificar os dois meios." }, { status: 404 });

  if (first.id === second.id || first.medium === second.medium) {
    return NextResponse.json({
      error: first.medium === "qr" ? "Agora aproxime o celular do NFC." : "Agora leia o QR Code."
    }, { status: 409 });
  }

  if (first.product_type !== second.product_type) {
    return NextResponse.json({ error: "Esses meios pertencem a produtos diferentes." }, { status: 409 });
  }

  if (first.plate_id || second.plate_id) {
    return NextResponse.json({ error: "Um destes meios já está vinculado a outra placa." }, { status: 409 });
  }

  const qr = first.medium === "qr" ? first : second;
  const nfc = first.medium === "nfc" ? first : second;

  const { data: plate, error: plateError } = await admin
    .from("plates")
    .insert({
      batch_id: qr.batch_id ?? nfc.batch_id ?? null,
      sequence_number: qr.sequence_number ?? nfc.sequence_number ?? null,
      public_code: qr.code,
      product_type: first.product_type ?? "google_review",
      status: "claiming",
      kv_sync_status: "pending"
    })
    .select("id")
    .single();

  if (plateError || !plate) return NextResponse.json({ error: "Não foi possível criar a placa." }, { status: 500 });

  const { error: mediaUpdateError } = await admin
    .from("media_tokens")
    .update({ plate_id: plate.id })
    .in("id", [first.id, second.id]);

  if (mediaUpdateError) {
    await admin.from("plates").delete().eq("id", plate.id);
    return NextResponse.json({ error: "Não foi possível concluir o vínculo." }, { status: 500 });
  }

  const { data: claim, error: claimError } = await admin
    .from("plate_claims")
    .insert({
      plate_id: plate.id,
      email: session.email,
      business_name: session.email.split("@")[0],
      destination_type: session.destination_type,
      destination_url: session.destination_url,
      expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString()
    })
    .select("id")
    .single();

  if (claimError || !claim) return NextResponse.json({ error: "Não foi possível preparar a confirmação." }, { status: 500 });

  await admin.from("pairing_sessions").update({
    second_media_id: second.id,
    plate_id: plate.id,
    state: "paired",
    paired_at: new Date().toISOString()
  }).eq("id", session.id);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
  const next = "/claim/complete?claim=" + claim.id;
  const callback = appUrl + "/auth/callback?next=" + encodeURIComponent(next);

  const { error: otpError } = await admin.auth.signInWithOtp({
    email: session.email,
    options: { emailRedirectTo: callback }
  });

  if (otpError) {
    return NextResponse.json({ error: "Os meios foram conectados, mas o e-mail não pôde ser enviado." }, { status: 500 });
  }

  cookieStore.delete("torvya_pairing_session");
  return NextResponse.json({ ok: true });
}
