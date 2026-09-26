"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, ExternalLink, Nfc, QrCode, ShieldCheck, Star } from "lucide-react";

type Medium = "qr" | "nfc" | null;

export function GoogleActivationWizard({ code, medium }: { code: string; medium?: Medium }) {
  const [destination, setDestination] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"pairing"|"ok"|"error">("idle");
  const [message, setMessage] = useState("");
  const [expectedMedium, setExpectedMedium] = useState<"qr"|"nfc"|null>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
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
      setMessage(data.error ?? "Não foi possível iniciar a configuração.");
      return;
    }

    if (data.pairingRequired) {
      setExpectedMedium(data.expectedMedium);
      setStatus("pairing");
      return;
    }

    setStatus("ok");
    setMessage("Enviamos um link de confirmação para o seu e-mail.");
  }

  if (status === "pairing") {
    const waitingForNfc = expectedMedium === "nfc";
    return (
      <section className="activation-card glass pairing-wait" aria-live="polite">
        <div className="pairing-visual">
          <div className="pairing-icon">
            {waitingForNfc ? <Nfc size={34} /> : <QrCode size={34} />}
          </div>
          <span>1 de 2 conectado</span>
        </div>
        <div>
          <div className="eyebrow">conectar a placa</div>
          <h2>{waitingForNfc ? "Agora aproxime o celular do NFC." : "Agora leia o QR Code."}</h2>
          <p className="muted">
            Use este mesmo celular. Ao abrir o segundo link, a Torvya reconhece a sessão
            e conecta QR + NFC automaticamente à mesma placa.
          </p>
        </div>
        <div className="pairing-security">
          <ShieldCheck size={18} />
          <span>A sessão expira em 30 minutos e só aceita o meio complementar.</span>
        </div>
      </section>
    );
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
        <h2>Configure sua placa em poucos segundos.</h2>
        <p className="muted">
          Precisamos somente do seu e-mail e do link de avaliação do Google.
        </p>
      </div>

      {medium && (
        <div className="medium-detected">
          {medium === "qr" ? <QrCode size={18} /> : <Nfc size={18} />}
          <span>{medium === "qr" ? "QR Code reconhecido" : "NFC reconhecido"}</span>
        </div>
      )}

      <div className="field">
        <label htmlFor="claim-email">Seu e-mail</label>
        <input
          id="claim-email"
          className="input"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          autoFocus
          placeholder="voce@empresa.com.br"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="claim-email-help"
        />
        <span className="helper" id="claim-email-help">
          Usaremos esse e-mail para confirmar a ativação e liberar seu painel sem senha.
        </span>
      </div>

      <div className="field">
        <label htmlFor="google-review">Link para avaliar no Google</label>
        <input
          id="google-review"
          className="input"
          type="url"
          inputMode="url"
          required
          placeholder="https://g.page/r/.../review"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          aria-describedby="google-review-help"
        />
        <span className="helper" id="google-review-help">
          Aceitamos links do Perfil da Empresa no Google e links oficiais de avaliação.
        </span>
      </div>

      {status === "error" && <div className="error-box" role="alert">{message}</div>}
      {status === "ok" && (
        <div className="success-box" role="status">
          <CheckCircle2 size={18} />
          {message}
        </div>
      )}

      <button className="primary-button" disabled={status === "loading" || status === "ok"}>
        {status === "loading" ? "Preparando..." : "Continuar"}
        <ArrowRight size={18} />
      </button>

      <a className="activation-help-link" href="/support">
        Não encontrou seu link do Google? Fale com a Torvya
        <ExternalLink size={14} />
      </a>
    </form>
  );
}
