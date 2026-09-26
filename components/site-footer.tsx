import Link from "next/link";
import { legalIdentity } from "../lib/legal";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="site-shell">
        <div className="footer-grid">
          <div>
            <Link className="brand" href="/">
              <span className="brand-mark">n</span>
              nooli
            </Link>
            <p className="footer-copy">
              Conexões físicas com destinos digitais. QR + NFC, configuração simples
              e infraestrutura preparada para evoluir.
            </p>
          </div>

          <div className="footer-links">
            <strong>Produto</strong>
            <Link href="/solucoes">Soluções</Link>
            <Link href="/#como-funciona">Como funciona</Link>
            <Link href="/support">Suporte</Link>
          </div>

          <div className="footer-links">
            <strong>Legal e privacidade</strong>
            <Link href="/legal">Central legal</Link>
            <Link href="/termos">Termos de uso</Link>
            <Link href="/privacidade">Privacidade</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/trocas-e-devolucoes">Trocas e devoluções</Link>
            <Link href="/acessibilidade">Acessibilidade</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Nooli. Todos os direitos reservados.</span>
          <span>
            {legalIdentity.document
              ? `${legalIdentity.legalName} · ${legalIdentity.document}`
              : "Operação em fase de lançamento · Brasil"}
          </span>
        </div>

        <p className="trademark-note">
          Nooli é um produto independente. Google, Google Maps, WhatsApp, Instagram e
          demais marcas citadas pertencem aos seus respectivos titulares. A referência
          a serviços de terceiros indica apenas compatibilidade e não implica afiliação,
          patrocínio ou endosso.
        </p>
      </div>
    </footer>
  );
}
