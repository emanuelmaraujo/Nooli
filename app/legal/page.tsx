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
  { href: "/termos", icon: FileText, title: "Termos de uso", copy: "Regras do serviço, responsabilidades e integrações de terceiros." },
  { href: "/privacidade", icon: ShieldCheck, title: "Privacidade e LGPD", copy: "Dados tratados, finalidades, segurança e exercício de direitos." },
  { href: "/cookies", icon: Cookie, title: "Cookies e tecnologias", copy: "Tecnologias essenciais, preferências e eventual medição opcional." },
  { href: "/trocas-e-devolucoes", icon: RotateCcw, title: "Trocas e devoluções", copy: "Direito de arrependimento, garantia legal e atendimento." },
  { href: "/acessibilidade", icon: Accessibility, title: "Acessibilidade", copy: "Diretrizes para uma experiência digital inclusiva." },
];

export default function LegalHubPage() {
  return (
    <><SiteNav /><main id="conteudo" className="legal-shell">
      <div className="legal-container legal-wide">
        <div className="eyebrow">transparência</div>
        <h1>Confiança também se constrói nos detalhes.</h1>
        <p className="legal-lead">Informações sobre a Torvya, seus direitos, privacidade e canais de atendimento.</p>

        <section className="identity-card">
          <Building2 size={22} /><div>
            <strong>Identificação do fornecedor</strong>
            <p>{legalIdentity.legalName}</p>
            {legalIdentity.document && <p>{legalIdentity.document}</p>}
            {legalIdentity.address && <p>{legalIdentity.address}</p>}
            {legalIdentity.supportEmail && <p>{legalIdentity.supportEmail}</p>}
            {!commerceIdentityComplete && <p className="legal-warning">A venda online só deve ser habilitada após o preenchimento dos dados empresariais e canais obrigatórios.</p>}
          </div>
        </section>

        <div className="legal-grid">
          {items.map(({ href, icon: Icon, title, copy }) => (
            <Link className="legal-link-card" href={href} key={href}>
              <Icon size={22} /><strong>{title}</strong><span>{copy}</span>
            </Link>
          ))}
        </div>
      </div>
    </main><SiteFooter /></>
  );
}
