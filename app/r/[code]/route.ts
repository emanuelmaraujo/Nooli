import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "../../../lib/supabase/admin";

export async function GET(request: Request, context: { params: Promise<{ code: string }> }) {
  const { code } = await context.params;
  const publicCode = code.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.redirect(new URL("/activate/" + publicCode, request.url));
  }

  const { data: plate } = await supabase
    .from("plates")
    .select("destination_url,status")
    .eq("public_code", publicCode)
    .maybeSingle();

  if (!plate || ["manufactured","available","claiming"].includes(plate.status) || !plate.destination_url) {
    return NextResponse.redirect(new URL("/activate/" + publicCode, request.url));
  }

  if (plate.status !== "activated") {
    return NextResponse.redirect(new URL("/support", request.url));
  }

  return NextResponse.redirect(plate.destination_url, 302);
}
