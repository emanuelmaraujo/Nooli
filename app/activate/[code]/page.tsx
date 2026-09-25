import { notFound } from "next/navigation";
import { Logo } from "../../../components/logo";
import { ActivationWizard } from "../../../components/activation-wizard";

type PageProps = { params: Promise<{ code: string }> };
export const metadata = { title: "Configurar placa" };

export default async function ActivatePage({ params }: PageProps) {
  const { code } = await params;
  const normalized = code.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (normalized.length < 6 || normalized.length > 16) notFound();

  return (
    <main className="activation-shell">
      <div className="activation-container">
        <Logo />
        <div className="activation-grid" style={{ marginTop: 40 }}>
          <section className="activation-side">
            <div>
              <div className="eyebrow">primeiro acesso</div>
              <h1>Essa Nooli ainda está esperando por você.</h1>
              <p>Configure o destino em poucos passos. Depois disso, os próximos acessos seguem direto para onde você escolheu.</p>
            </div>
            <div>
              <div className="activation-code">{normalized}</div>
              <div className="step-list">
                <div className="step-item active"><span>1</span> escolha o destino</div>
                <div className="step-item"><span>2</span> identifique sua empresa</div>
                <div className="step-item"><span>3</span> confirme seu contato</div>
              </div>
            </div>
          </section>
          <ActivationWizard code={normalized} />
        </div>
      </div>
    </main>
  );
}
