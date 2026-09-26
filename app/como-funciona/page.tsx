import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Nfc,
  QrCode,
  ShieldCheck,
  Star
} from "lucide-react";
import { SiteFooter } from "../../components/site-footer";
import { SiteNav } from "../../components/site-nav";

export const metadata = {
  title: "Como funciona",
  description:
    "Entenda como a Torvya conecta QR Code e NFC, ativa a placa e direciona clientes para avaliar no Google."
};

const phases = [
  {
    icon: QrCode,
    label: "Produção",
    title: "QR e NFC nascem independentes.",
    text:
      "Cada um recebe um endereço Torvya diferente. Isso permite preparar placas e tags sem precisar manter os dois itens na mesma sequência física."
  },
  {
    icon: Nfc,
    label: "Pareamento",
    title: "Leia um. Depois leia o outro.",
    text:
      "A primeira leitura fica aguardando por alguns minutos. A segunda precisa ser do outro tipo. Quando os dois códigos são válidos, a Torvya cria o vínculo."
  },
  {
    icon: Mail,
    label: "Primeiro acesso",
    title: "E-mail e link do Google. Só isso.",
    text:
      "O responsável informa o link direto de avaliação e o e-mail. A confirmação acontece por link seguro, sem criar senha."
  },
  {
    icon: Star,
    label: "Uso diário",
    title: "O cliente vai para onde importa.",
    text:
      "Depois da ativação, tanto o QR quanto o NFC levam ao mesmo destino configurado, sem telas intermediárias da Torvya."
  }
];

export default function HowItWorksPage() {
  return (
    <>
      <SiteNav />
      <main id="conteudo">
        <section className="page-hero">
          <div className="site-shell">
            <div className="eyebrow">como funciona</div>
            <h1>Do estoque ao toque do cliente.</h1>
            <p>
              A Torvya separa produção, pareamento e ativação para simplificar o trabalho
              de quem monta a placa e também a experiência de quem usa.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="site-shell">
            <div className="journey-grid journey-grid-four">
              {phases.map(({ icon: Icon, label, title, text }) => (
                <article className="journey-card process-card" key={label}>
                  <Icon size={24} />
                  <span>{label}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="site-shell">
            <div className="dual-path glass">
              <div className="dual-path-copy">
                <div className="eyebrow"><ShieldCheck size={14} /> por que separar QR e NFC?</div>
                <h2>Menos trabalho manual na montagem.</h2>
                <p>
                  Você não precisa procurar “a tag número 143 para a placa 143”. Pegue uma
                  tag disponível, leia o QR da placa e depois aproxime a tag. O sistema
                  registra a correspondência.
                </p>
                <ul className="clean-checks">
                  <li><CheckCircle2 size={16} /> códigos individuais para diagnóstico</li>
                  <li><CheckCircle2 size={16} /> vínculo validado pelo backend</li>
                  <li><CheckCircle2 size={16} /> dois caminhos para o mesmo destino final</li>
                </ul>
              </div>

              <div className="pairing-visual" aria-hidden="true">
                <div className="pair-node"><QrCode size={32} /><span>QR</span></div>
                <div className="pair-line"><span /></div>
                <div className="pair-core">T</div>
                <div className="pair-line"><span /></div>
                <div className="pair-node"><Nfc size={32} /><span>NFC</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="site-shell">
            <div className="cta-panel glass">
              <div className="cta-content">
                <div className="eyebrow">Torvya Review</div>
                <h2>Depois de pronta, a placa desaparece do caminho.</h2>
                <p>
                  O cliente encosta ou escaneia e segue para o Google. A tecnologia fica
                  nos bastidores.
                </p>
                <Link className="primary-button" href="/solucoes">
                  Conhecer as soluções <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
