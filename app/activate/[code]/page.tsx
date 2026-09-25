import { notFound, redirect } from "next/navigation";
import { createSupabaseAdminClient } from "../../../lib/supabase/admin";
import { activationRoute, type ProductType } from "../../../lib/products";

type PageProps = { params: Promise<{ code: string }> };

export default async function ActivateRouterPage({ params }: PageProps) {
  const { code } = await params;
  const normalized = code.toUpperCase().replace(/[^A-Z0-9]/g, "");

  if (normalized.length < 6 || normalized.length > 16) notFound();

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    redirect("/activate/google/" + normalized);
  }

  const { data: plate } = await supabase
    .from("plates")
    .select("product_type")
    .eq("public_code", normalized)
    .maybeSingle();

  if (!plate) notFound();

  redirect(activationRoute((plate.product_type ?? "google_review") as ProductType, normalized));
}
