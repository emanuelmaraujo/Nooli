import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Logo } from "../../../../components/logo";
import { GoogleActivationWizard } from "../../../../components/google-activation-wizard";

type PageProps = {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ paired?: string }>;
};

export const metadata = { title: "Ativar Torvya Review" };

export default async function GoogleActivatePage({ params, searchParams }: PageProps) {
  const { code } = await params;
  const { paired } = await searchParams;
  const normalized = code.toUpperCase().replace(/[^A-Z0-9]/g, "");

  if (normalized.length < 6 || normalized.length > 16) notFound();

  return (
    <main className="activation-shell">
      <div className="activation-container">
        <Logo />
        <div className="activation-grid" style={{ marginTop: 40 }}>
          <section className="activation-side google-activation-side">
            <div>
              <div className="eyebrow">primeiro acesso · Torvya Review</div>
              <h1>Sua placa está quase pronta.</h1>
              <p>
                Informe o e-mail responsável e o link direto para avaliação no Google.
                A Torvya cuida do restante.
              </p>

              {paired === "1" && (
                <div className="success-box" style={{ marginTop: 18 }}>
                  <CheckCircle2 size={18} />
                  QR Code e NFC conectados com sucesso.
                </div>
              )}
            </div>

            <div>
              <div className="activation-code">{normalized}</div>
              <div className="step-list">
                <div className="step-item active"><span>1</span> informe o link do Google</div>
                <div className="step-item active"><span>2</span> informe seu e-mail</div>
                <div className="step-item"><span>3</span> confirme pelo link recebido</div>
              </div>
            </div>
          </section>

          <GoogleActivationWizard code={normalized} />
        </div>
      </div>
    </main>
  );
}
