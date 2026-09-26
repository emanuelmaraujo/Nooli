import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  Instagram,
  Link2,
  MessageCircle,
  Nfc,
  QrCode,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Zap
} from "lucide-react";
import { SiteFooter } from "./site-footer";
import { SiteNav } from "./site-nav";

const benefits = [
  {
    icon: Zap,
    title: "Menos atrito",
    description:
      "Seu cliente encosta o celular ou aponta a câmera. Sem aplicativo, cadastro ou instrução complicada."
  },
  {
    icon: RefreshCw,
    title: "A placa não fica velha",
    description:
      "O endereço físico permanece estável. O destino pode evoluir sem reimpressão da placa."
  },
  {
    icon: BarChart3,
    title: "Você mantém o controle",
    description:
      "Ativação, destino e evolução do produto ficam concentrados na plataforma Torvya."
  }
];

const steps = [
  {
    number: "01",
    title: "Instale",
    text: "Posicione a Torvya onde a experiência acontece: balcão, mesa, caixa, recepção ou saída."
  },
  {
    number: "02",
    title: "Cliente aproxima ou escaneia",
    text: "NFC e QR Code oferecem dois caminhos simples para chegar à mesma experiência."
  },
  {
    number: "03",
    title: "Google abre direto",
    text: "Após a ativação, o cliente é encaminhado ao destino configurado, sem passar por telas desnecessárias."
  }
];

export function LandingExperience() {
  const supportNumber = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP?.replace(/\D/g, "");
  const support = supportNumber ? "https://wa.me/" + supportNumber : "/support";

  return (
    <>
      <div className="noise" aria-hidden="true" />
      <SiteNav />

      <main id="conteudo">
        <section className="hero torvya-hero">
          <div className="site-shell hero-grid">
            <div className="hero-copy-block reveal">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                Torvya · QR Code + NFC
              </div>

              <h1>
                O mundo físico
                <br />
                <span className="gradient-word">mais perto do digital.</span>
              </h1>

              <p className="hero-copy">
                Uma placa inteligente para transformar o momento certo em uma ação
                simples. Comece levando seus clientes direto para avaliar sua empresa no
                Google — com um toque ou um QR Code.
              </p>

              <div className="hero-actions">
                <Link className="primary-button" href="/como-funciona">
                  Ver como funciona <ArrowRight size={18} />
                </Link>
                <Link className="secondary-button" href="/solucoes">
                  Conhecer a Torvya
                </Link>
              </div>

              <div className="trust-row" aria-label="Diferenciais">
                <span><Check size={15} /> sem aplicativo</span>
                <span><Check size={15} /> ativação rápida</span>
                <span><Check size={15} /> destino gerenciável</span>
              </div>
            </div>

            <div className="device-stage reveal reveal-delay" aria-label="Representação da placa Torvya">
              <div className="orbit" aria-hidden="true" />
              <div className="smart-plate torvya-plate">
                <div className="plate-top">
                  <span className="plate-logo">torvya</span>
                  <Nfc size={44} aria-hidden="true" />
                </div>
                <div className="plate-center">
                  <div className="plate-copy">
                    <small>aproxime ou escaneie</small>
                    <strong>Como foi sua experiência?</strong>
                  </div>
                  <div className="qr-shell">
                    <QrCode size={108} aria-hidden="true" />
                  </div>
                </div>
                <div className="plate-caption">
                  <Star size={15} fill="currentColor" />
                  Avalie no Google
                </div>
              </div>

              <div className="float-card top">
                <div className="float-label">experiência</div>
                <div className="float-value"><span className="live-dot" /> pronta para usar</div>
              </div>
              <div className="float-card bottom">
                <div className="float-label">acesso</div>
                <div className="float-value"><Nfc size={16} /> NFC <span>+</span> <QrCode size={16} /> QR</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section compact-section" aria-label="Proposta Torvya">
          <div className="site-shell">
            <div className="statement-strip glass">
              <span>Um gesto simples.</span>
              <strong>Menos passos entre intenção e ação.</strong>
              <span>Uma experiência que continua evoluindo.</span>
            </div>
          </div>
        </section>

        <section className="section" id="produto">
          <div className="site-shell">
            <div className="section-heading">
              <div className="eyebrow"><Sparkles size={14} /> feito para ser simples</div>
              <h2>A tecnologia desaparece. A experiência fica.</h2>
              <p>
                A Torvya cuida da conexão por trás da placa para que seu cliente precise
                pensar em uma coisa só: aproximar ou escanear.
              </p>
            </div>

            <div className="feature-grid">
              {benefits.map(({ icon: Icon, title, description }) => (
                <article className="feature-card" key={title}>
                  <div className="feature-icon"><Icon size={22} /></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section journey-section" id="como-funciona">
          <div className="site-shell">
            <div className="section-heading split-heading">
              <div>
                <div className="eyebrow"><Nfc size={14} /> do balcão ao Google</div>
                <h2>Três passos para reduzir a distância até a avaliação.</h2>
              </div>
              <Link className="text-link" href="/como-funciona">
                Entender a experiência completa <ArrowRight size={16} />
              </Link>
            </div>

            <div className="journey-grid">
              {steps.map((step) => (
                <article className="journey-card" key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="site-shell">
            <div className="dual-path glass">
              <div className="dual-path-copy">
                <div className="eyebrow"><QrCode size={14} /> dois caminhos, uma experiência</div>
                <h2>QR e NFC independentes. Pareados pela Torvya.</h2>
                <p>
                  Cada tecnologia possui seu próprio endereço. Na preparação da placa,
                  basta ler um deles e depois o outro. A Torvya conecta o par e passa a
                  tratar os dois como uma única experiência.
                </p>
                <ul className="clean-checks">
                  <li><Check size={16} /> sem controlar sequência manual de tags</li>
                  <li><Check size={16} /> troca de destino sem regravar a placa</li>
                  <li><Check size={16} /> identificação individual para diagnóstico</li>
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

        <section className="section ecosystem-teaser">
          <div className="site-shell">
            <div className="section-heading">
              <div className="eyebrow"><Sparkles size={14} /> começa no Google, não termina nele</div>
              <h2>Uma infraestrutura para diferentes momentos do seu negócio.</h2>
              <p>
                O primeiro produto é focado em avaliações do Google. A plataforma foi
                desenhada para evoluir para outros destinos sem trocar a lógica física.
              </p>
            </div>

            <div className="ecosystem-row">
              <div className="ecosystem-chip active"><Star size={17} /> Google Avaliações <span>disponível</span></div>
              <div className="ecosystem-chip"><MessageCircle size={17} /> WhatsApp <span>planejado</span></div>
              <div className="ecosystem-chip"><Instagram size={17} /> Instagram <span>planejado</span></div>
              <div className="ecosystem-chip"><Link2 size={17} /> Link direto <span>planejado</span></div>
              <div className="ecosystem-chip"><Store size={17} /> Torvya Page <span>futuro</span></div>
            </div>

            <Link className="secondary-button" href="/solucoes">
              Ver ecossistema <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        <section className="section">
          <div className="site-shell">
            <div className="trust-panel">
              <div>
                <ShieldCheck size={28} />
                <h3>Privacidade e transparência desde o começo</h3>
                <p>
                  Conta sem senha, coleta enxuta de dados e páginas claras sobre
                  privacidade, cookies, direitos e uso do serviço.
                </p>
              </div>
              <Link href="/legal">Conhecer a Central legal <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>

        <section className="section" id="contato">
          <div className="site-shell">
            <div className="cta-panel glass">
              <div className="cta-content">
                <div className="eyebrow"><Sparkles size={14} /> Torvya</div>
                <h2>Faça o próximo passo parecer óbvio.</h2>
                <p>
                  Menos instruções, menos telas e menos distância entre seu cliente e a
                  ação que importa.
                </p>
                <a className="primary-button" href={support}>
                  Falar com a Torvya <MessageCircle size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <a className="support-fab" href={support} aria-label="Falar com o suporte da Torvya">
        <MessageCircle size={19} />
        <span>Suporte</span>
      </a>
    </>
  );
}
