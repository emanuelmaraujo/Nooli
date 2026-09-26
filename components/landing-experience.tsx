"use client";

import { motion } from "framer-motion";
import {
  ArrowRight, BarChart3, Check, Link2, MessageCircle, Nfc, QrCode,
  ShieldCheck, Sparkles, Star, Zap
} from "lucide-react";
import { SiteNav } from "./site-nav";
import { SiteFooter } from "./site-footer";

const benefits = [
  {
    icon: Zap,
    title: "Menos atrito no momento certo",
    description: "O cliente toca ou escaneia e segue para a avaliação. Sem aplicativo e sem procurar seu negócio no Google."
  },
  {
    icon: Link2,
    title: "Destino sob seu controle",
    description: "A mídia física permanece a mesma enquanto o destino pode ser administrado pela Torvya."
  },
  {
    icon: BarChart3,
    title: "Base preparada para evoluir",
    description: "A mesma infraestrutura poderá atender campanhas, páginas próprias e outros destinos digitais."
  }
];

const steps = [
  ["01", "Comece por qualquer meio", "Leia o QR Code ou aproxime o celular do NFC."],
  ["02", "Informe só o essencial", "Digite seu e-mail e cole o link de avaliação do Google."],
  ["03", "Conecte o outro meio", "Se começou pelo QR, aproxime do NFC. Se começou pelo NFC, leia o QR."],
  ["04", "Confirme pelo e-mail", "Depois disso, os dois meios passam a levar ao mesmo destino."]
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
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .6, ease: "easeOut" }}
            >
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                torvya review · google avaliações
              </div>

              <h1>
                Seu cliente já está aí.
                <br />
                <span className="gradient-word">Facilite o próximo passo.</span>
              </h1>

              <p className="hero-copy">
                Uma placa inteligente com QR Code e NFC que leva o cliente direto para
                avaliar seu negócio no Google. Dois meios independentes, conectados em um
                primeiro acesso simples e seguro.
              </p>

              <div className="hero-actions">
                <a className="primary-button" href="#como-funciona">
                  Entender como funciona <ArrowRight size={18} />
                </a>
                <a className="secondary-button" href="/solucoes">
                  Conhecer a Torvya
                </a>
              </div>

              <div className="trust-strip" aria-label="Destaques">
                <span><Check size={15} /> sem aplicativo</span>
                <span><Check size={15} /> QR + NFC</span>
                <span><Check size={15} /> confirmação por e-mail</span>
              </div>
            </motion.div>

            <motion.div
              className="device-stage"
              initial={{ opacity: 0, scale: .94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: .75, delay: .08 }}
            >
              <div className="orbit" aria-hidden="true" />
              <motion.div
                className="smart-plate torvya-plate"
                animate={{ y: [0, -7, 0], rotate: [-4, -2.5, -4] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="plate-top">
                  <span className="plate-logo">torvya</span>
                  <Nfc size={42} color="var(--lime)" aria-hidden="true" />
                </div>
                <div className="plate-center">
                  <div className="plate-copy">
                    <small>aproxime ou escaneie</small>
                    <strong>Como foi sua experiência?</strong>
                  </div>
                  <div className="qr-shell" aria-label="Representação de QR Code">
                    <QrCode size={104} color="#090c10" />
                  </div>
                </div>
              </motion.div>

              <div className="float-card top">
                <div className="float-label">experiência</div>
                <div className="float-value"><Star size={16} /> Google Avaliações</div>
              </div>
              <div className="float-card bottom">
                <div className="float-label">conexão</div>
                <div className="float-value"><span className="live-dot" /> QR + NFC pareados</div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section value-section" id="produto">
          <div className="site-shell">
            <div className="section-heading">
              <div className="eyebrow"><Sparkles size={14} /> menos etapas, mais oportunidade</div>
              <h2>Peça a avaliação no ponto em que a experiência ainda está fresca.</h2>
              <p>
                A Torvya transforma uma placa física em um acesso direto e gerenciável.
                O foco inicial é Google Avaliações, sem prometer nota, filtrar opinião ou
                interferir na escolha do cliente.
              </p>
            </div>

            <div className="feature-grid">
              {benefits.map(({ icon: Icon, title, description }, index) => (
                <motion.article
                  className="feature-card"
                  key={title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: .2 }}
                  transition={{ delay: index * .06 }}
                >
                  <div className="feature-icon"><Icon size={22} /></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section pairing-story" id="como-funciona">
          <div className="site-shell">
            <div className="section-heading">
              <div className="eyebrow"><Nfc size={14} /> primeiro acesso inteligente</div>
              <h2>QR e NFC nascem separados. Você conecta os dois em segundos.</h2>
              <p>
                Isso simplifica a produção e reduz dependências: cada meio recebe sua
                própria URL Torvya e o pareamento acontece somente quando a placa chega ao cliente.
              </p>
            </div>

            <div className="pairing-demo glass">
              <div className="pairing-media-card">
                <QrCode size={42} />
                <span>QR Code</span>
                <small>link exclusivo</small>
              </div>
              <div className="pairing-line"><span>+</span></div>
              <div className="pairing-media-card">
                <Nfc size={42} />
                <span>NFC</span>
                <small>link exclusivo</small>
              </div>
              <div className="pairing-line"><span>→</span></div>
              <div className="pairing-media-card connected">
                <Star size={42} />
                <span>Google</span>
                <small>um único destino</small>
              </div>
            </div>

            <div className="flow-panel glass">
              {steps.map(([number, title, copy]) => (
                <div className="flow-row" key={number}>
                  <div className="flow-number">{number}</div>
                  <div className="flow-copy">
                    <strong>{title}</strong>
                    <span>{copy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section trust-section">
          <div className="site-shell trust-grid">
            <div>
              <div className="eyebrow"><ShieldCheck size={14} /> confiança por padrão</div>
              <h2>Sem atalhos obscuros.</h2>
            </div>
            <div className="trust-copy">
              <p>
                A Torvya reduz etapas, mas a avaliação continua sendo escolha do cliente.
                O produto não compra avaliações, não cria opiniões e não direciona apenas
                clientes satisfeitos.
              </p>
              <a href="/privacidade">Privacidade e LGPD <ArrowRight size={16} /></a>
              <a href="/termos">Termos de uso <ArrowRight size={16} /></a>
            </div>
          </div>
        </section>

        <section className="section ecosystem-teaser">
          <div className="site-shell">
            <div className="section-heading">
              <div className="eyebrow"><Sparkles size={14} /> uma marca, várias experiências</div>
              <h2>Hoje, avaliações. Amanhã, outros caminhos.</h2>
              <p>
                A Torvya Review é o primeiro produto. A arquitetura foi preparada para
                destinos diretos, WhatsApp, páginas próprias, campanhas e outras jornadas.
              </p>
            </div>
            <div className="ecosystem-row">
              <div className="ecosystem-chip active"><Star size={17} /> Google Avaliações <span>disponível</span></div>
              <div className="ecosystem-chip"><MessageCircle size={17} /> WhatsApp <span>planejado</span></div>
              <div className="ecosystem-chip"><Link2 size={17} /> Link direto <span>planejado</span></div>
              <div className="ecosystem-chip"><QrCode size={17} /> Torvya Page <span>futuro</span></div>
            </div>
            <a className="secondary-button" href="/solucoes">
              Ver soluções <ArrowRight size={18} />
            </a>
          </div>
        </section>

        <section className="section" id="contato">
          <div className="site-shell">
            <div className="cta-panel glass">
              <div className="cta-content">
                <div className="eyebrow" style={{ margin: "0 auto 20px" }}>
                  <QrCode size={14} /> torvya
                </div>
                <h2>Transforme um ponto físico em uma próxima ação.</h2>
                <p>
                  Precisa configurar sua placa ou entender como a Torvya pode funcionar
                  no seu negócio? Fale com o suporte.
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
      <a className="support-fab" href={support} aria-label="Abrir suporte Torvya">
        <MessageCircle size={19} /><span>Suporte</span>
      </a>
    </>
  );
}
