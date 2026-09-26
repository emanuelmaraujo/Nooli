"use client";

import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"sent"|"error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/auth/magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      setStatus("error");
      setMessage(data.error ?? "Não foi possível enviar o acesso.");
      return;
    }

    setStatus("sent");
  }

  return (
    <form className="form-stack" onSubmit={submit}>
      <div className="field">
        <label htmlFor="email">Seu e-mail</label>
        <input
          className="input"
          id="email"
          type="email"
          required
          autoComplete="email"
          placeholder="voce@empresa.com.br"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {status === "sent" && <div className="success-box">Link enviado. Confira sua caixa de entrada.</div>}
      {status === "error" && <div className="error-box">{message}</div>}

      <button className="primary-button" disabled={status === "loading"}>
        <Mail size={18} />
        {status === "loading" ? "Enviando..." : "Enviar link de acesso"}
        <ArrowRight size={18} />
      </button>
      <span className="helper">Sem senha para memorizar. O link expira e só funciona para o e-mail informado.</span>
    </form>
  );
}
