import {
  ArrowRight, Instagram, Link2, MapPin, MessageCircle, QrCode, Star, Store, UtensilsCrossed
} from "lucide-react";
import { SiteNav } from "../../components/site-nav";
import { SiteFooter } from "../../components/site-footer";

export const metadata = {
  title: "Soluções",
  description: "Torvya Review e a infraestrutura de conexão entre o ponto físico e experiências digitais.",
};

const platforms = [
  { name: "Google Avaliações", icon: Star, status: "Disponível", copy: "Acesso direto à tela de avaliação do Perfil da Empresa no Google." },
  { name: "WhatsApp", icon: MessageCircle, status: "Planejado", copy: "Abra atendimento, conversa ou campanha com um toque." },
  { name: "Instagram", icon: Instagram, status: "Planejado", copy: "Direcione para perfil, campanha ou conteúdo social." },
  { name: "Site ou campanha", icon: Link2, status: "Planejado", copy: "Use um destino web gerenciável sem trocar a mídia física." },
  { name: "Localização", icon: MapPin, status: "Planejado", copy: "Abra mapas e rotas para a unidade escolhida." },
  { name: "Cardápio", icon: UtensilsCrossed, status: "Planejado", copy: "Atalho direto para menu, catálogo ou pedido." },
];

export default function SolutionsPage() {
  return (
    <>
      <SiteNav />
      <main id="conteudo">
        <section className="page-hero">
          <div className="site-shell">
            <div className="eyebrow">ecossistema torvya</div>
            <h1>O ponto físico vira uma porta para o digital.</h1>
            <p>
              A Torvya conecta QR Code e NFC a destinos gerenciáveis. O primeiro produto
              é focado em avaliações do Google; a infraestrutura foi desenhada para crescer
              sem obrigar o cliente a substituir a placa.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="site-shell">
            <div className="product-showcase">
              <article className="product-card featured">
                <div className="product-status live">Disponível</div>
                <Star size={28} />
                <h2>Torvya Review</h2>
                <p>
                  QR + NFC para Google Avaliações, com links físicos independentes,
                  pareamento no primeiro acesso e confirmação por e-mail.
                </p>
                <a className="primary-button" href="/#como-funciona">
                  Como funciona <ArrowRight size={17} />
                </a>
              </article>

              <article className="product-card">
                <div className="product-status">Planejado</div>
                <QrCode size={28} />
                <h2>Torvya Link</h2>
                <p>
                  Um destino direto gerenciado para WhatsApp, site, campanha, redes,
                  cardápio ou outro endereço compatível.
                </p>
              </article>

              <article className="product-card">
                <div className="product-status">Futuro</div>
                <Store size={28} />
                <h2>Torvya Page</h2>
                <p>
                  Uma presença digital compacta do negócio com ações, contatos,
                  localização, horários, campanhas e métricas.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section platform-section">
          <div className="site-shell">
            <div className="section-heading">
              <div className="eyebrow">multiplataforma</div>
              <h2>Uma infraestrutura que não limita a próxima ideia.</h2>
              <p>
                Cada produto terá um onboarding próprio para manter a configuração simples,
                reduzindo decisões desnecessárias no primeiro uso.
              </p>
            </div>
            <div className="platform-grid">
              {platforms.map(({ name, icon: Icon, status, copy }) => (
                <article className="platform-card" key={name}>
                  <div className="platform-icon"><Icon size={22} /></div>
                  <div>
                    <div className="platform-card-head"><h3>{name}</h3><span>{status}</span></div>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
