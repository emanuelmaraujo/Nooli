import { Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { SiteNav } from "../../components/site-nav";
import { SiteFooter } from "../../components/site-footer";
import { legalIdentity } from "../../lib/legal";

export const metadata = { title: "Suporte" };

export default function SupportPage() {
  const whatsapp = legalIdentity.supportWhatsapp;
  const email = legalIdentity.supportEmail;

  return (
    <>
      <SiteNav />
      <main id="conteudo" className="auth-shell">
        <div className="auth-container">
          <section className="auth-card glass">
            <div className="eyebrow">atendimento nooli</div>
            <h1>Como podemos ajudar?</h1>
            <p>
              Ativação, alteração de destino, acesso à conta, compra, entrega,
              troca, devolução ou privacidade: use um dos canais abaixo.
            </p>

            <div className="form-stack">
              {whatsapp && (
                <a className="primary-button" href={"https://wa.me/" + whatsapp.replace(/\D/g, "")}>
                  <MessageCircle size={18} /> WhatsApp
                </a>
              )}

              {email && (
                <a className="secondary-button" href={"mailto:" + email}>
                  <Mail size={18} /> {email}
                </a>
              )}

              {legalIdentity.privacyEmail && (
                <a className="secondary-button" href={"mailto:" + legalIdentity.privacyEmail}>
                  <ShieldCheck size={18} /> Privacidade e LGPD
                </a>
              )}

              {!whatsapp && !email && (
                <div className="legal-warning">
                  Os canais públicos de atendimento ainda precisam ser configurados antes
                  do início das vendas.
                </div>
              )}
            </div>

            <p className="helper" style={{ marginTop: 18 }}>
              Ao entrar em contato, guarde a confirmação ou protocolo da solicitação.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
