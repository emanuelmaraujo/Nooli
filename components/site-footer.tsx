import Link from "next/link";
import { legalIdentity } from "../lib/legal";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="site-shell">
        <div className="footer-grid">
          <div>
            <Link className="brand" href="/" aria-label="Torvya — início">
              <span className="brand-mark">t</span>
              torvya
            </Link>
            <p className="footer-copy">
              A ponte entre o seu ponto físico e a próxima ação do cliente.
              QR Code e NFC independentes, pareados no primeiro acesso e gerenciados pela Torvya.
            </p>
          </div>

          <div className="footer-links">
            <strong>Produto</strong>
            <Link href="/solucoes">Soluções</Link>
            <Link href="/#como-funciona">Como funciona</Link>
            <Link href="/faq">Perguntas frequentes</Link>
            <Link href="/support">Suporte</Link>
          </div>

          <div className="footer-links">
            <strong>Legal e privacidade</strong>
            <Link href="/legal">Central legal</Link>
            <Link href="/termos">Termos de uso</Link>
            <Link href="/privacidade">Privacidade e LGPD</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/trocas-e-devolucoes">Trocas e devoluções</Link>
            <Link href="/acessibilidade">Acessibilidade</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Torvya. Todos os direitos reservados.</span>
          <span>
            {legalIdentity.document
              ? `${legalIdentity.legalName} · ${legalIdentity.document}`
              : "Operação em fase de lançamento · Brasil"}
          </span>
        </div>

        <p className="trademark-note">
          Torvya é um produto independente. Google, Google Maps, WhatsApp, Instagram e
          demais marcas citadas pertencem aos seus respectivos titulares. Compatibilidade
          não implica afiliação, patrocínio ou endosso.
        </p>
      </div>
    </footer>
  );
}
