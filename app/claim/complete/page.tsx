import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../../../lib/supabase/server";
import { createSupabaseAdminClient } from "../../../lib/supabase/admin";
import { Logo } from "../../../components/logo";

type Props = {
  searchParams: Promise<{ claim?: string }>;
};

export default async function ClaimCompletePage({ searchParams }: Props) {
  const { claim: claimId } = await searchParams;
  if (!claimId) redirect("/");

  const userClient = await createSupabaseServerClient();
  const admin = createSupabaseAdminClient();

  if (!userClient || !admin) {
    return (
      <main className="auth-shell">
        <div className="auth-container">
          <Logo />
          <section className="auth-card glass">
            <h1>Ambiente ainda não conectado.</h1>
            <p>Finalize as variáveis do Supabase para concluir a ativação.</p>
          </section>
        </div>
      </main>
    );
  }

  const { data: { user } } = await userClient.auth.getUser();
  if (!user?.email) redirect("/login");

  const { data: claim } = await admin
    .from("plate_claims")
    .select("id,plate_id,email,business_name,destination_type,destination_url,expires_at,consumed_at")
    .eq("id", claimId)
    .maybeSingle();

  if (!claim || claim.consumed_at || new Date(claim.expires_at) < new Date()) {
    return (
      <main className="auth-shell">
        <div className="auth-container">
          <Logo />
          <section className="auth-card glass">
            <h1>Esse link expirou.</h1>
            <p>Escaneie ou aproxime novamente a placa para recomeçar.</p>
          </section>
        </div>
      </main>
    );
  }

  if (claim.email.toLowerCase() !== user.email.toLowerCase()) {
    return (
      <main className="auth-shell">
        <div className="auth-container">
          <Logo />
          <section className="auth-card glass">
            <h1>E-mail diferente.</h1>
            <p>Abra o link com o mesmo e-mail usado na configuração.</p>
          </section>
        </div>
      </main>
    );
  }

  const slugBase = claim.business_name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 44) || "empresa";
  const slug = slugBase + "-" + claim.id.slice(0, 6);

  const { data: organization, error: orgError } = await admin
    .from("organizations")
    .insert({ name: claim.business_name, slug })
    .select("id")
    .single();

  if (orgError || !organization) {
    return (
      <main className="auth-shell">
        <div className="auth-container"><Logo /><section className="auth-card glass"><h1>Não foi possível concluir.</h1><p>Tente novamente ou fale com o suporte.</p></section></div>
      </main>
    );
  }

  await admin.from("organization_members").insert({
    organization_id: organization.id,
    user_id: user.id,
    role: "owner"
  });

  await admin.from("plates").update({
    organization_id: organization.id,
    destination_type: claim.destination_type,
    destination_url: claim.destination_url,
    status: "activated",
    activated_at: new Date().toISOString(),
    claimed_by: user.id,
    kv_sync_status: "pending"
  }).eq("id", claim.plate_id);

  await admin.from("plate_claims").update({ consumed_at: new Date().toISOString() }).eq("id", claim.id);

  redirect("/dashboard?activated=1");
}
