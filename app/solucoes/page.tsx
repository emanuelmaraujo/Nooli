import { ArrowRight, ExternalLink, Instagram, Link2, MapPin, MessageCircle, QrCode, Star, Store, UtensilsCrossed } from "lucide-react";
import { SiteNav } from "../../components/site-nav";
import { SiteFooter } from "../../components/site-footer";

export const metadata = {
  title: "Soluções",
  description: "Nooli Review, Nooli Link e Nooli Page: uma infraestrutura, experiências diferentes.",
};

const platforms = [
  { name: "Google Avaliações", icon: Star, status: "Disponível", copy: "Leve o cliente direto para a página de avaliação do seu Perfil da Empresa no Google." },
  { name: "WhatsApp", icon: MessageCircle, status: "Em breve", copy: "Abra uma conversa, atendimento ou campanha com um toque." },
  { name: "Instagram", icon: Instagram, status: "Em breve", copy: "Direcione para perfil, campanha ou conteúdo social." },
  { name: "Site ou campanha", icon: Link2, status: "Em breve", copy: "Use qualquer URL compatível como destino direto." },
  { name: "Localização", icon: MapPin, status: "Em breve", copy: "Abra mapas e rotas para a unidade escolhida." },
  { name: "Cardápio", icon: UtensilsCrossed, status: "Em breve", copy: "Atalho direto para menu, catálogo ou pedido." },
];

export default function SolutionsPage() {
  return (
    <>
      <SiteNav />
      <main id="conteudo">
        <section className="page-hero">
          <div className="site-shell">
            <div className="eyebrow">ecossistema nooli</div>
            <h1>Uma infraestrutura.<br />Várias experiências.</h1>
            <p>
              Começamos com avaliações do Google, mas a arquitetura da Nooli foi criada
              para que uma placa física possa assumir experiências diferentes sem
              reinventar o produto.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="site-shell">
            <div className="product-showcase">
              <article className="product-card featured">
                <div className="product-status live">Disponível</div>
                <Star size={28} />
                <h2>Nooli Review</h2>
                <p>
                  QR + NFC para avaliações do Google. Primeiro acesso guiado, confirmação
                  por e-mail e redirecionamento direto após a ativação.
                </p>
                <a className="primary-button" href="/#como-funciona">
                  Conhecer <ArrowRight size={17} />
                </a>
              </article>

              <article className="product-card">
                <div className="product-status">Em breve</div>
                <QrCode size={28} />
                <h2>Nooli Link</h2>
                <p>
                  Uma placa personalizada que pode apontar para WhatsApp, Instagram,
                  site, cardápio, campanha ou outro destino permitido.
                </p>
              </article>

              <article className="product-card">
                <div className="product-status">Em desenvolvimento</div>
                <Store size={28} />
                <h2>Nooli Page</h2>
                <p>
                  Uma página própria do negócio, mais visual e mais flexível que uma
                  simples lista de links.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section platform-section">
          <div className="site-shell">
            <div className="section-heading">
              <div className="eyebrow">multiplataformas</div>
              <h2>O destino muda. A experiência continua Nooli.</h2>
              <p>
                Cada produto terá seu próprio onboarding e regras. Isso evita colocar
                opções demais na configuração de uma placa que foi vendida para uma
                finalidade específica.
              </p>
            </div>

            <div className="platform-grid">
              {platforms.map(({ name, icon: Icon, status, copy }) => (
                <article className="platform-card" key={name}>
                  <div className="platform-icon"><Icon size={22} /></div>
                  <div>
                    <div className="platform-card-head">
                      <h3>{name}</h3>
                      <span>{status}</span>
                    </div>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="site-shell">
            <div className="nooli-page-preview">
              <div className="preview-copy">
                <div className="eyebrow">futuro · nooli page</div>
                <h2>Não será só “link na bio”.</h2>
                <p>
                  A ideia é entregar uma mini-presença digital: identidade visual,
                  chamadas principais, contatos, redes, localização, cardápio,
                  promoções, horários e métricas, com blocos reorganizáveis e temas.
                </p>
                <span className="helper">
                  Recurso planejado. Funcionalidades podem mudar antes do lançamento.
                </span>
              </div>

              <div className="profile-mock" aria-label="Prévia conceitual da Nooli Page">
                <div className="profile-logo">nc</div>
                <strong>Nooli Café</strong>
                <span>Café · Brasília</span>
                <button type="button">Pedir pelo WhatsApp</button>
                <button type="button">Ver cardápio</button>
                <button type="button">Como chegar</button>
                <small>feito com nooli</small>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
