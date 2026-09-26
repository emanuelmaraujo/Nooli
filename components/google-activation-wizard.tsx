"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2, ExternalLink, Mail, Star } from "lucide-react";

export function GoogleActivationWizard({ code }: { code: string }) {
  const [destination, setDestination] = useState("");
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState<"idle"|"loading"|"ok"|"error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();

    if (!accepted) {
      setStatus("error");
      setMessage("Confirme que leu os Termos e o Aviso de Privacidade.");
      return;
    }

    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/plates/" + code + "/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destination, email })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setStatus("error");
      setMessage(data.error ?? "Não foi possível concluir a configuração.");
      return;
    }

    setStatus("ok");
    setMessage("Enviamos um link seguro para confirmar este e-mail e concluir a ativação.");
  }

  return (
    <form className="activation-card glass form-stack" onSubmit={submit}>
      <div className="google-product-badge">
        <span className="google-star"><Star size={18} fill="currentColor" /></span>
        <div>
          <strong>Torvya Review</strong>
          <span>Google Avaliações</span>
        </div>
      </div>

      <div>
        <h2>Falta só conectar seu Google.</h2>
        <p className="muted">
          São apenas dois dados. Depois da confirmação, QR e NFC passam a abrir o
          destino configurado.
        </p>
      </div>

      <div className="field">
        <label htmlFor="google-review">Link para avaliar no Google</label>
        <input
          id="google-review"
          className="input"
          required
          autoFocus
          inputMode="url"
          autoComplete="url"
          placeholder="https://g.page/r/.../review"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          aria-describedby="google-review-help"
        />
        <span className="helper" id="google-review-help">
          Aceitamos o link de avaliação do Perfil da Empresa no Google ou um Place ID.
        </span>
      </div>

      <div className="field">
        <label htmlFor="claim-email">Seu e-mail</label>
        <div className="input-with-icon">
          <Mail size={17} aria-hidden="true" />
          <input
            id="claim-email"
            className="input"
            type="email"
            required
            autoComplete="email"
            placeholder="voce@empresa.com.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <span className="helper">
          Esse e-mail será usado para confirmar a ativação e acessar o painel. Sem senha para memorizar.
        </span>
      </div>

      <label className="consent-row">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(event) => setAccepted(event.target.checked)}
          required
        />
        <span>
          Li e concordo com os <Link href="/termos" target="_blank">Termos de uso</Link> e
          confirmo ciência do <Link href="/privacidade" target="_blank">Aviso de Privacidade</Link>.
        </span>
      </label>

      {status === "error" && <div className="error-box" role="alert">{message}</div>}
      {status === "ok" && (
        <div className="success-box" role="status">
          <CheckCircle2 size={18} />
          {message}
        </div>
      )}

      <button className="primary-button" disabled={status === "loading" || status === "ok"}>
        {status === "loading" ? "Preparando..." : "Confirmar e ativar"}
        <ArrowRight size={18} />
      </button>

      <a className="activation-help-link" href="/support">
        Não encontrou o link de avaliação? Fale com a Torvya
        <ExternalLink size={14} />
      </a>
    </form>
  );
}
