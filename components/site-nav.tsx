import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";

export function SiteNav() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <nav className="navbar" aria-label="Navegação principal">
        <Logo />

        <div className="nav-links">
          <Link href="/#produto">Produto</Link>
          <Link href="/como-funciona">Como funciona</Link>
          <Link href="/solucoes">Soluções</Link>
          <Link href="/faq">Dúvidas</Link>
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
