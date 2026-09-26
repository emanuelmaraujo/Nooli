import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function SiteNav() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <nav className="navbar" aria-label="Navegação principal">
        <Link className="brand" href="/">
          <span className="brand-mark">n</span>
          nooli
        </Link>

        <div className="nav-links">
          <Link href="/#produto">Nooli Review</Link>
          <Link href="/solucoes">Ecossistema</Link>
          <Link href="/#como-funciona">Como funciona</Link>
          <Link href="/support">Suporte</Link>
        </div>

        <div className="nav-actions">
          <ThemeToggle />
          <Link className="pill-button" href="/login">
            Entrar <ArrowRight size={16} />
          </Link>
        </div>
      </nav>
    </>
  );
}
