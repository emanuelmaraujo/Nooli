import Link from "next/link";
import { legalIdentity } from "../lib/legal";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="site-shell">
        <div className="footer-grid">
          <div>
            <Logo />
            <p className="footer-copy">
              Uma ponte simples entre o mundo físico e o digital. QR Code, NFC e
              destinos gerenciáveis sem depender de aplicativo.
            </p>
          </div>

          <div className="footer-links">
            <strong>Torvya</strong>
            <Link href="/como-funciona">Como funciona</Link>
            <Link href="/solucoes">Soluções</Link>
            <Link href="/faq">Perguntas frequentes</Link>
            <Link href="/support">Suporte</Link>
          </div>

          <div className="footer-links">
            <strong>Legal e confiança</strong>
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
          Torvya é um produto independente. Google, Google Maps, WhatsApp, Instagram
          e demais marcas citadas pertencem aos seus respectivos titulares. A referência
          a serviços de terceiros indica compatibilidade e não implica afiliação,
          patrocínio ou endosso.
        </p>
      </div>
    </footer>
  );
}
