import { notFound } from "next/navigation";
import { Logo } from "../../../../components/logo";
import { GoogleActivationWizard } from "../../../../components/google-activation-wizard";

type PageProps = { params: Promise<{ code: string }> };

export const metadata = { title: "Ativar Nooli Review" };

export default async function GoogleActivatePage({ params }: PageProps) {
  const { code } = await params;
  const normalized = code.toUpperCase().replace(/[^A-Z0-9]/g, "");

  if (normalized.length < 6 || normalized.length > 16) notFound();

  return (
    <main className="activation-shell">
      <div className="activation-container">
        <Logo />
        <div className="activation-grid" style={{ marginTop: 40 }}>
          <section className="activation-side google-activation-side">
            <div>
              <div className="eyebrow">primeiro acesso · nooli review</div>
              <h1>Transforme um toque em uma avaliação.</h1>
              <p>
                Sua placa já está pronta. Falta somente conectar o endereço de avaliação do seu negócio no Google.
              </p>
            </div>

            <div>
              <div className="activation-code">{normalized}</div>
              <div className="step-list">
                <div className="step-item active"><span>1</span> cole o link do Google</div>
                <div className="step-item"><span>2</span> identifique o negócio</div>
                <div className="step-item"><span>3</span> confirme por e-mail</div>
              </div>
            </div>
          </section>

          <GoogleActivationWizard code={normalized} />
        </div>
      </div>
    </main>
  );
}
