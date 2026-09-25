import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseAdminClient } from "../../../../lib/supabase/admin";

const schema = z.object({ email: z.string().email() });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });

  const supabase = createSupabaseAdminClient();
  if (!supabase) return NextResponse.json({ error: "Supabase ainda não está configurado." }, { status: 503 });

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? new URL(request.url).origin;
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
    options: { emailRedirectTo: siteUrl + "/auth/callback" }
  });

  if (error) return NextResponse.json({ error: "Não foi possível enviar o link." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
