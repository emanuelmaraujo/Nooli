import type { ReactNode } from "react";
import Link from "next/link";
import { SiteNav } from "./site-nav";
import { SiteFooter } from "./site-footer";

export function LegalPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteNav />
      <main id="conteudo" className="legal-shell">
        <div className="legal-container">
          <div className="eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          <p className="legal-lead">{description}</p>
          <div className="legal-card">{children}</div>
          <p className="legal-back">
            <Link href="/legal">← Voltar à Central legal</Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
