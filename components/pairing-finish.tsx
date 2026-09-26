"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";

export function PairingFinish({ code, secondMedium }: { code: string; secondMedium: "qr" | "nfc" }) {
  const [state, setState] = useState<"loading"|"ok"|"error">("loading");
  const [message, setMessage] = useState("Conectando QR Code e NFC...");

  useEffect(() => {
    let cancelled = false;

    async function finish() {
      const response = await fetch("/api/pairing/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
      });
      const data = await response.json().catch(() => ({}));
      if (cancelled) return;

      if (!response.ok) {
        setState("error");
        setMessage(data.error ?? "Não foi possível conectar os dois meios.");
        return;
      }

      setState("ok");
      setMessage("QR Code e NFC conectados. Enviamos a confirmação para o seu e-mail.");
    }

    finish();
    return () => { cancelled = true; };
  }, [code]);

  return (
    <section className="activation-card glass pairing-finish" aria-live="polite">
      <div className={"pairing-result " + state}>
        {state === "loading" && <Loader2 className="spin" size={32} />}
        {state === "ok" && <CheckCircle2 size={32} />}
        {state === "error" && <ShieldCheck size={32} />}
      </div>
      <div className="eyebrow">{secondMedium === "nfc" ? "nfc reconhecido" : "qr code reconhecido"}</div>
      <h2>{state === "ok" ? "Sua placa está conectada." : state === "error" ? "Não conseguimos concluir." : "Só um instante."}</h2>
      <p className="muted">{message}</p>
      {state === "error" && <a className="secondary-button" href="/support">Falar com o suporte</a>}
    </section>
  );
}
