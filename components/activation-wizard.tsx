"use client";

import { useState } from "react";
import { ArrowRight, Instagram, Link2, MessageCircle, Star } from "lucide-react";

const choices = [
  { id: "google", label: "Avaliações Google", icon: Star },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { id: "instagram", label: "Instagram", icon: Instagram },
  { id: "url", label: "Outro link", icon: Link2 }
] as const;

export function ActivationWizard({ code }: { code: string }) {
  const [type, setType] = useState<(typeof choices)[number]["id"]>("google");
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
      body: JSON.stringify({ type, destination, businessName, email })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setStatus("error");
      setMessage(data.error ?? "Não foi possível concluir.");
      return;
    }

    setStatus("ok");
    setMessage("Quase lá. Abra o link enviado ao seu e-mail para confirmar.");
  }

  return (
    <form className="activation-card glass form-stack" onSubmit={submit}>
      <div>
        <h2>Para onde essa placa deve levar?</h2>
        <p className="muted">Você poderá mudar isso depois.</p>
      </div>

      <div className="destination-grid">
        {choices.map(({ id, label, icon: Icon }) => (
          <button type="button" key={id} className={"destination-option " + (type === id ? "active" : "")} onClick={() => setType(id)}>
            <Icon size={18} />
            <strong>{label}</strong>
          </button>
        ))}
      </div>

      <div className="field">
        <label htmlFor="destination">Link de destino</label>
        <input id="destination" className="input" required placeholder="https://..." value={destination} onChange={(e) => setDestination(e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="business">Nome do negócio</label>
        <input id="business" className="input" required placeholder="Ex.: Café Central" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="claim-email">Seu e-mail</label>
        <input id="claim-email" className="input" type="email" required placeholder="voce@empresa.com.br" value={email} onChange={(e) => setEmail(e.target.value)} />
        <span className="helper">O e-mail confirma a configuração e depois dá acesso ao painel sem senha.</span>
      </div>

      {status === "error" && <div className="error-box">{message}</div>}
      {status === "ok" && <div className="success-box">{message}</div>}

      <button className="primary-button" disabled={status === "loading" || status === "ok"}>
        {status === "loading" ? "Preparando..." : "Continuar"} <ArrowRight size={18} />
      </button>
    </form>
  );
}
