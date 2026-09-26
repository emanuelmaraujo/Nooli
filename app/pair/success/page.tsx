import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Logo } from "../../../components/logo";

export const metadata = { title: "Pareamento concluído" };

export default function PairSuccessPage() {
  return (
    <main className="pairing-shell">
      <div className="pairing-container">
        <Logo />
        <section className="pairing-card glass" style={{ marginTop: 34 }}>
          <div className="pairing-icon"><CheckCircle2 size={30} /></div>
          <div className="eyebrow">pareamento concluído</div>
          <h1>QR e NFC agora são um par.</h1>
          <p>
            Os dois acessos estão ligados à mesma placa Torvya. Se ela já estiver ativada,
            ambos seguirão para o destino configurado.
          </p>
          <div className="pairing-actions">
            <Link className="primary-button" href="/dashboard">
              Abrir painel <ArrowRight size={17} />
            </Link>
            <Link className="secondary-button" href="/">
              Voltar ao site
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
