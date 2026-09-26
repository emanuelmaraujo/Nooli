import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function SiteNav() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
      <nav className="navbar" aria-label="Navegação principal">
        <Link className="brand" href="/" aria-label="Torvya — início">
          <span className="brand-mark">t</span>
          torvya
        </Link>

        <div className="nav-links">
          <Link href="/#produto">Torvya Review</Link>
          <Link href="/solucoes">Soluções</Link>
          <Link href="/#como-funciona">Como funciona</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/support">Suporte</Link>
        </div>

        <div className="nav-actions">
          <ThemeToggle />
          <Link className="pill-button" href="/login">
            Entrar <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </>
  );
}
