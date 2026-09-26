import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Logo } from "../../../components/logo";

type Props = {
  searchParams: Promise<{ message?: string }>;
};

export const metadata = { title: "Não foi possível parear" };

export default async function PairErrorPage({ searchParams }: Props) {
  const { message } = await searchParams;

  return (
    <main className="pairing-shell">
      <div className="pairing-container">
        <Logo />
        <section className="pairing-card glass" style={{ marginTop: 34 }}>
          <div className="pairing-icon"><AlertTriangle size={30} /></div>
          <div className="eyebrow">pareamento interrompido</div>
          <h1>Não conseguimos conectar os dois itens.</h1>
          <p>{message || "Leia novamente o QR Code e depois a tag NFC da mesma placa."}</p>
          <div className="pairing-actions">
            <Link className="primary-button" href="/como-funciona">
              <RotateCcw size={17} /> Ver instruções
            </Link>
            <Link className="secondary-button" href="/support">
              Falar com o suporte
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
