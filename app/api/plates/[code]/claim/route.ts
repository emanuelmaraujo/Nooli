import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "../../../../../lib/supabase/admin";
import { normalizeGoogleReviewDestination } from "../../../../../lib/google-review";

const schema = z.object({
  destination: z.string().min(3).max(2000),
  email: z.string().email()
});

export async function POST(
  request: Request,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;
  const publicCode = code.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const parsed = schema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ error: "Confira o e-mail e o link informado." }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Ambiente ainda não conectado ao Supabase." }, { status: 503 });
  }

  let destinationUrl: string;
  try {
    destinationUrl = normalizeGoogleReviewDestination(parsed.data.destination);
  } catch {
    return NextResponse.json(
      { error: "Cole um link oficial de avaliação do Google." },
      { status: 400 }
    );
  }

  const { data: media, error: mediaError } = await supabase
    .from("media_tokens")
    .select("id,medium,plate_id,product_type")
    .eq("code", publicCode)
    .maybeSingle();

  if (mediaError) {
    return NextResponse.json({ error: "Não foi possível validar este código." }, { status: 500 });
  }

  if (media) {
    if (media.plate_id) {
      const { data: plate } = await supabase
        .from("plates")
        .select("id,status,organization_id")
        .eq("id", media.plate_id)
        .maybeSingle();

      if (plate?.organization_id || plate?.status === "activated") {
        return NextResponse.json({ error: "Essa placa já foi configurada." }, { status: 409 });
      }
    }

    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();
    const { data: session, error: sessionError } = await supabase
      .from("pairing_sessions")
      .insert({
        first_media_id: media.id,
        email: parsed.data.email.toLowerCase(),
        destination_type: "google_review",
        destination_url: destinationUrl,
        state: "pending",
        expires_at: expiresAt
      })
      .select("id")
      .single();

    if (sessionError || !session) {
      return NextResponse.json({ error: "Não foi possível iniciar o pareamento." }, { status: 500 });
    }

    const cookieStore = await cookies();
    cookieStore.set("torvya_pairing_session", session.id, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 30 * 60
    });

    return NextResponse.json({
      ok: true,
      pairingRequired: true,
      expectedMedium: media.medium === "qr" ? "nfc" : "qr"
    });
  }

  // Compatibilidade com lotes antigos, que usavam um único public_code.
  const { data: plate } = await supabase
    .from("plates")
    .select("id,status,organization_id,product_type")
    .eq("public_code", publicCode)
    .maybeSingle();

  if (!plate) {
    return NextResponse.json({ error: "Código não encontrado." }, { status: 404 });
  }

  if (plate.organization_id || plate.status === "activated") {
    return NextResponse.json({ error: "Essa placa já foi configurada." }, { status: 409 });
  }

  const { data: claim, error: claimError } = await supabase
    .from("plate_claims")
    .insert({
      plate_id: plate.id,
      email: parsed.data.email.toLowerCase(),
      business_name: parsed.data.email.split("@")[0],
      destination_type: "google_review",
      destination_url: destinationUrl,
      expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString()
    })
    .select("id")
    .single();

  if (claimError || !claim) {
    return NextResponse.json({ error: "Já existe uma configuração pendente." }, { status: 409 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
  const next = "/claim/complete?claim=" + claim.id;
  const callback = appUrl + "/auth/callback?next=" + encodeURIComponent(next);

  const { error: otpError } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: { emailRedirectTo: callback }
  });

  if (otpError) {
    return NextResponse.json({ error: "Não foi possível enviar a confirmação." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, pairingRequired: false });
}
