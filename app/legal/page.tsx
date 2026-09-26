import Link from "next/link";
import { FileText, RotateCcw, ShieldCheck, Accessibility, Cookie, Building2 } from "lucide-react";
import { SiteNav } from "../../components/site-nav";
import { SiteFooter } from "../../components/site-footer";
import { commerceIdentityComplete, legalIdentity } from "../../lib/legal";

export const metadata = {
  title: "Central legal",
  description: "Termos, privacidade, cookies, direitos do consumidor e acessibilidade da Torvya.",
};

const items = [
  { href: "/termos", icon: FileText, title: "Termos de uso", copy: "Regras do serviço, responsabilidades e serviços de terceiros." },
  { href: "/privacidade", icon: ShieldCheck, title: "Privacidade", copy: "Como tratamos dados pessoais e como exercer seus direitos pela LGPD." },
  { href: "/cookies", icon: Cookie, title: "Cookies e tecnologias", copy: "O que é essencial para login, segurança e preferências." },
  { href: "/trocas-e-devolucoes", icon: RotateCcw, title: "Trocas e devoluções", copy: "Direito de arrependimento, garantia legal e atendimento." },
  { href: "/acessibilidade", icon: Accessibility, title: "Acessibilidade", copy: "Compromisso com acesso digital inclusivo e navegação por tecnologia assistiva." },
];

export default function LegalHubPage() {
  return (
    <>
      <SiteNav />
      <main id="conteudo" className="legal-shell">
        <div className="legal-container legal-wide">
          <div className="eyebrow">transparência</div>
          <h1>Central legal e de confiança.</h1>
          <p className="legal-lead">
            Informações objetivas sobre o produto, seus direitos, privacidade e os canais
            para falar com a Torvya.
          </p>

          <section className="identity-card">
            <Building2 size={22} />
            <div>
              <strong>Identificação do fornecedor</strong>
              <p>{legalIdentity.legalName}</p>
              {legalIdentity.document && <p>{legalIdentity.document}</p>}
              {legalIdentity.address && <p>{legalIdentity.address}</p>}
              {legalIdentity.supportEmail && <p>{legalIdentity.supportEmail}</p>}
              {!commerceIdentityComplete && (
                <p className="legal-warning">
                  A comercialização online deve ser liberada somente após o preenchimento
                  dos dados empresariais completos nas variáveis de ambiente.
                </p>
              )}
            </div>
          </section>

          <div className="legal-grid">
            {items.map(({ href, icon: Icon, title, copy }) => (
              <Link className="legal-link-card" href={href} key={href}>
                <Icon size={22} />
                <strong>{title}</strong>
                <span>{copy}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
