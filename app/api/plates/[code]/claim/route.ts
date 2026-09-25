import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "../../../../../lib/supabase/admin";
import { normalizeDestinationUrl } from "../../../../../lib/urls";

const schema = z.object({
  type: z.enum(["google","whatsapp","instagram","url"]),
  destination: z.string().min(3).max(2000),
  businessName: z.string().min(2).max(120),
  email: z.string().email()
});

export async function POST(request: Request, context: { params: Promise<{ code: string }> }) {
  const { code } = await context.params;
  const publicCode = code.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const parsed = schema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ error: "Confira os dados informados." }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Ambiente ainda não está conectado ao Supabase." }, { status: 503 });
  }

  let destinationUrl: string;
  try {
    destinationUrl = normalizeDestinationUrl(parsed.data.destination);
  } catch {
    return NextResponse.json({ error: "Informe um link válido." }, { status: 400 });
  }

  const { data: plate, error: plateError } = await supabase
    .from("plates")
    .select("id,status,organization_id")
    .eq("public_code", publicCode)
    .maybeSingle();

  if (plateError || !plate) {
    return NextResponse.json({ error: "Placa não encontrada." }, { status: 404 });
  }

  if (plate.organization_id || plate.status === "activated") {
    return NextResponse.json({ error: "Essa placa já foi configurada." }, { status: 409 });
  }

  await supabase
    .from("plate_claims")
    .delete()
    .eq("plate_id", plate.id)
    .is("consumed_at", null)
    .lt("expires_at", new Date().toISOString());

  const { data: claim, error: claimError } = await supabase
    .from("plate_claims")
    .insert({
      plate_id: plate.id,
      email: parsed.data.email.toLowerCase(),
      business_name: parsed.data.businessName,
      destination_type: parsed.data.type,
      destination_url: destinationUrl,
      expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString()
    })
    .select("id")
    .single();

  if (claimError || !claim) {
    return NextResponse.json({ error: "Já existe uma configuração pendente para esta placa." }, { status: 409 });
  }

  await supabase.from("plates").update({ status: "claiming" }).eq("id", plate.id);

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

  return NextResponse.json({ ok: true });
}
