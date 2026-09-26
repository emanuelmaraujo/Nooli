"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, ExternalLink, Star } from "lucide-react";

export function GoogleActivationWizard({ code }: { code: string }) {
  const [destination, setDestination] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"ok"|"error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/plates/" + code + "/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        destination,
        businessName,
        email
      })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setStatus("error");
      setMessage(data.error ?? "Não foi possível concluir a configuração.");
      return;
    }

    setStatus("ok");
    setMessage("Enviamos um link de confirmação para o seu e-mail.");
  }

  return (
    <form className="activation-card glass form-stack" onSubmit={submit}>
      <div className="google-product-badge">
        <span className="google-star"><Star size={18} fill="currentColor" /></span>
        <div>
          <strong>Nooli Review</strong>
          <span>Google Avaliações</span>
        </div>
      </div>

      <div>
        <h2>Conecte sua avaliação do Google.</h2>
        <p className="muted">
          Cole o link de avaliação do seu Perfil da Empresa no Google.
          Também aceitamos o Place ID.
        </p>
      </div>

      <div className="field">
        <label htmlFor="google-review">Link de avaliação ou Place ID</label>
        <input
          id="google-review"
          className="input"
          required
          autoFocus
          placeholder="https://g.page/r/.../review"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <span className="helper">
          Depois de ativada, a placa abre esse endereço direto. Você pode trocar o destino pelo painel sem reimprimir.
        </span>
      </div>

      <div className="field">
        <label htmlFor="business">Nome do negócio</label>
        <input
          id="business"
          className="input"
          required
          placeholder="Ex.: Café Central"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="claim-email">E-mail do responsável</label>
        <input
          id="claim-email"
          className="input"
          type="email"
          required
          placeholder="voce@empresa.com.br"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="helper">
          Usamos o e-mail para confirmar a primeira configuração e liberar o painel. Não há senha para memorizar.
        </span>
      </div>

      {status === "error" && <div className="error-box">{message}</div>}
      {status === "ok" && (
        <div className="success-box">
          <CheckCircle2 size={18} />
          {message}
        </div>
      )}

      <button className="primary-button" disabled={status === "loading" || status === "ok"}>
        {status === "loading" ? "Preparando..." : "Ativar minha placa"}
        <ArrowRight size={18} />
      </button>

      <a className="activation-help-link" href="/support">
        Não encontrou seu link do Google? Fale com a Nooli
        <ExternalLink size={14} />
      </a>
    </form>
  );
}
