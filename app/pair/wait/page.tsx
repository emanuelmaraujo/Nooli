import Link from "next/link";
import { Nfc, QrCode, RefreshCw } from "lucide-react";
import { Logo } from "../../../components/logo";

type Props = {
  searchParams: Promise<{ kind?: string; code?: string }>;
};

export const metadata = { title: "Conectar QR e NFC" };

export default async function PairWaitPage({ searchParams }: Props) {
  const { kind, code } = await searchParams;
  const firstWasQr = kind === "qr";

  return (
    <main className="pairing-shell">
      <div className="pairing-container">
        <Logo />
        <section className="pairing-card glass" style={{ marginTop: 34 }}>
          <div className="pairing-icon">
            {firstWasQr ? <QrCode size={30} /> : <Nfc size={30} />}
          </div>
          <div className="eyebrow">pareamento · etapa 1 de 2</div>
          <h1>{firstWasQr ? "QR Code reconhecido." : "Tag NFC reconhecida."}</h1>
          <p>
            Agora {firstWasQr
              ? "aproxime o celular da tag NFC que será instalada nesta mesma placa."
              : "aponte a câmera para o QR Code impresso na placa correspondente."}
          </p>

          <div className="pair-code">{code}</div>

          <div className="onboarding-summary">
            <strong>Não feche nem copie códigos.</strong>
            <span>
              A próxima leitura abre a Torvya novamente e conclui o vínculo automaticamente.
              O pareamento expira em 15 minutos se o segundo item não for lido.
            </span>
          </div>

          <div className="pairing-actions">
            <Link className="secondary-button" href="/support">
              Preciso de ajuda
            </Link>
            <span className="secondary-button" aria-hidden="true">
              <RefreshCw size={17} /> aguardando a outra leitura
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
