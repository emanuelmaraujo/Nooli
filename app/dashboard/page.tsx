import { redirect } from "next/navigation";
import { Logo } from "../../components/logo";
import { createSupabaseServerClient } from "../../lib/supabase/server";

export const metadata = { title: "Painel" };

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return (
      <main className="dashboard-shell">
        <div className="dashboard-container">
          <Logo />
          <section className="panel" style={{ marginTop: 40 }}>
            <h1>Ambiente ainda não conectado</h1>
            <p className="muted">O front-end está pronto. Falta apenas conectar as variáveis do Supabase.</p>
          </section>
        </div>
      </main>
    );
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: plates } = await supabase
    .from("plates")
    .select("id,public_code,destination_url,status,activated_at")
    .order("created_at", { ascending: false });

  return (
    <main className="dashboard-shell">
      <div className="dashboard-container">
        <Logo />
        <header className="dashboard-head" style={{ marginTop: 44 }}>
          <div>
            <div className="eyebrow">painel</div>
            <h1>Suas conexões.</h1>
          </div>
          <a className="secondary-button" href="/">Ver site</a>
        </header>

        <div className="dashboard-grid">
          <section className="panel">
            <strong>Placas</strong>
            <div className="plate-list">
              {(plates ?? []).length === 0 ? (
                <p className="muted">Nenhuma placa vinculada à sua conta ainda.</p>
              ) : (
                plates?.map((plate) => (
                  <div className="plate-row" key={plate.id}>
                    <div>
                      <code>{plate.public_code}</code>
                      <div className="muted" style={{ marginTop: 6 }}>{plate.destination_url ?? "Sem destino configurado"}</div>
                    </div>
                    <span>{plate.status}</span>
                  </div>
                ))
              )}
            </div>
          </section>
          <aside className="panel">
            <strong>Conta</strong>
            <p className="muted">{user.email}</p>
            <p className="helper">A URL física continua a mesma mesmo quando você troca o destino.</p>
          </aside>
        </div>
      </div>
    </main>
  );
}
