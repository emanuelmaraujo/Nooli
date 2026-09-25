"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Link2, MessageCircle, Nfc, QrCode, RefreshCw, Sparkles, Zap } from "lucide-react";

const features = [
  { icon: RefreshCw, title: "Mude o destino, não a placa", description: "QR e NFC apontam para a Nooli. Você troca Google, WhatsApp, Instagram ou qualquer URL pelo painel." },
  { icon: Zap, title: "Abre em milissegundos", description: "O redirecionamento roda no edge, fora do painel e do banco principal." },
  { icon: BarChart3, title: "Veja o que acontece", description: "Acompanhe acessos e uso de cada placa sem sobrecarregar a aplicação." }
];

export function LandingExperience() {
  const supportNumber = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP?.replace(/\D/g, "");
  const support = supportNumber ? "https://wa.me/" + supportNumber : "#contato";

  return (
    <>
      <div className="noise" />
      <nav className="navbar">
        <a className="brand" href="#"><span className="brand-mark">n</span>nooli</a>
        <div className="nav-links">
          <a href="#como-funciona">Como funciona</a>
          <a href="#produto">Produto</a>
          <a href="#contato">Contato</a>
        </div>
        <a className="pill-button" href="/login">Entrar <ArrowRight size={16} /></a>
      </nav>

      <main>
        <section className="hero">
          <div className="site-shell hero-grid">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="eyebrow"><span className="eyebrow-dot" /> conexão física. destino digital.</div>
              <h1>Um toque.<br /><span className="gradient-word">Qualquer destino.</span></h1>
              <p className="hero-copy">Nooli transforma uma placa física em um ponto de conexão vivo. Aproxime o celular ou escaneie. Configure uma vez. Mude o destino quando quiser.</p>
              <div className="hero-actions">
                <a className="primary-button" href="#como-funciona">Ver como funciona <ArrowRight size={18} /></a>
                <a className="secondary-button" href="#contato">Falar com a Nooli <MessageCircle size={18} /></a>
              </div>
              <div className="micro-proof">QR + NFC · sem aplicativo · destino editável</div>
            </motion.div>

            <motion.div className="device-stage" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.1 }}>
              <div className="orbit" />
              <motion.div className="smart-plate" animate={{ y: [0, -9, 0], rotate: [-5, -3.5, -5] }} transition={{ duration: 6, repeat: Infinity }}>
                <div className="plate-top">
                  <span className="plate-logo">nooli</span>
                  <Nfc size={42} color="#b9ff66" />
                </div>
                <div className="plate-center">
                  <div className="plate-copy"><small>aproxime ou escaneie</small><strong>Conta pra gente como foi.</strong></div>
                  <div className="qr-shell"><QrCode size={104} color="#090c10" /></div>
                </div>
              </motion.div>
              <div className="float-card top"><div className="float-label">status</div><div className="float-value"><span className="live-dot" /> online agora</div></div>
              <div className="float-card bottom"><div className="float-label">destino</div><div className="float-value"><Link2 size={16} /> editável</div></div>
            </motion.div>
          </div>
        </section>

        <section className="section" id="produto">
          <div className="site-shell">
            <div className="section-heading">
              <div className="eyebrow"><Sparkles size={14} /> pensado para continuar útil</div>
              <h2>A placa fica. O destino evolui.</h2>
              <p>O que está impresso não precisa mudar quando sua campanha, perfil, WhatsApp ou página mudar.</p>
            </div>
            <div className="feature-grid">
              {features.map(({ icon: Icon, title, description }, index) => (
                <motion.article className="feature-card" key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                  <div className="feature-icon"><Icon size={22} /></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="como-funciona">
          <div className="site-shell">
            <div className="section-heading">
              <div className="eyebrow"><Nfc size={14} /> simples de verdade</div>
              <h2>Do primeiro toque ao destino final.</h2>
            </div>
            <div className="flow-panel glass">
              <div className="flow-row"><div className="flow-number">01</div><div className="flow-copy"><strong>Encoste ou escaneie</strong><span>NFC e QR usam a mesma URL Nooli.</span></div><div className="flow-status">instantâneo</div></div>
              <div className="flow-row"><div className="flow-number">02</div><div className="flow-copy"><strong>Configure uma vez</strong><span>No primeiro uso, a placa abre a experiência de configuração.</span></div><div className="flow-status">1 minuto</div></div>
              <div className="flow-row"><div className="flow-number">03</div><div className="flow-copy"><strong>Pronto para receber clientes</strong><span>Depois disso, cada toque vai direto ao destino escolhido.</span></div><div className="flow-status">sempre ativo</div></div>
            </div>
          </div>
        </section>

        <section className="section" id="contato">
          <div className="site-shell">
            <div className="cta-panel glass"><div className="cta-content">
              <div className="eyebrow" style={{ margin: "0 auto 20px" }}><QrCode size={14} /> nooli</div>
              <h2>Uma pequena placa. Uma conexão que continua mudando.</h2>
              <p>Precisa configurar, trocar o destino ou falar com a gente? O suporte fica sempre acessível pela Nooli.</p>
              <a className="primary-button" href={support}>Falar com a Nooli <MessageCircle size={18} /></a>
            </div></div>
          </div>
        </section>
      </main>

      <footer className="footer"><div className="site-shell footer-row"><span>© {new Date().getFullYear()} Nooli</span><span>QR · NFC · destinos dinâmicos</span></div></footer>
      <a className="support-fab" href={support}><MessageCircle size={19} /><span>Suporte</span></a>
    </>
  );
}
