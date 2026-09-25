import { Mail, MessageCircle } from "lucide-react";
import { Logo } from "../../components/logo";

export const metadata = { title: "Suporte" };

export default function SupportPage() {
  const whatsapp = process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP;
  const email = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

  return (
    <main className="auth-shell">
      <div className="auth-container">
        <Logo />
        <section className="auth-card glass">
          <div className="eyebrow">suporte</div>
          <h1>Fale com a Nooli.</h1>
          <p>Precisa configurar uma placa, recuperar acesso ou resolver alguma coisa? Escolha o canal mais rápido.</p>
          <div className="form-stack">
            {whatsapp && <a className="primary-button" href={"https://wa.me/" + whatsapp.replace(/\D/g, "")}><MessageCircle size={18} /> WhatsApp</a>}
            {email && <a className="secondary-button" href={"mailto:" + email}><Mail size={18} /> {email}</a>}
            {!whatsapp && !email && <div className="helper">Os canais de suporte serão habilitados nas variáveis de ambiente.</div>}
          </div>
        </section>
      </div>
    </main>
  );
}
