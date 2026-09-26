import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Logo } from "../../../../components/logo";
import { GoogleActivationWizard } from "../../../../components/google-activation-wizard";
import { PairingFinish } from "../../../../components/pairing-finish";
import { createSupabaseAdminClient } from "../../../../lib/supabase/admin";

type PageProps = { params: Promise<{ code: string }> };

export const metadata = { title: "Primeiro acesso — Torvya Review" };

export default async function GoogleActivatePage({ params }: PageProps) {
  const { code } = await params;
  const normalized = code.toUpperCase().replace(/[^A-Z0-9]/g, "");

  if (normalized.length < 6 || normalized.length > 16) notFound();

  const admin = createSupabaseAdminClient();
  let medium: "qr" | "nfc" | null = null;
  let shouldFinishPairing = false;

  if (admin) {
    const { data: media } = await admin
      .from("media_tokens")
      .select("id,medium,plate_id")
      .eq("code", normalized)
      .maybeSingle();

    if (media) {
      medium = media.medium as "qr" | "nfc";
      const cookieStore = await cookies();
      const pairingId = cookieStore.get("torvya_pairing_session")?.value;

      if (pairingId && !media.plate_id) {
        const { data: session } = await admin
          .from("pairing_sessions")
          .select("id,state,expires_at,first_media:media_tokens!pairing_sessions_first_media_id_fkey(medium)")
          .eq("id", pairingId)
          .maybeSingle();

        const first = Array.isArray(session?.first_media) ? session?.first_media[0] : session?.first_media;
        shouldFinishPairing = Boolean(
          session &&
          session.state === "pending" &&
          new Date(session.expires_at) > new Date() &&
          first?.medium &&
          first.medium !== medium
        );
      }
    }
  }

  return (
    <main className="activation-shell first-access-shell">
      <div className="activation-container">
        <Logo />
        <div className="activation-grid" style={{ marginTop: 40 }}>
          <section className="activation-side google-activation-side">
            <div>
              <div className="eyebrow">primeiro acesso · torvya review</div>
              <h1>Dois meios. Uma única experiência.</h1>
              <p>
                QR Code e NFC têm links próprios. No primeiro acesso você conecta os dois
                e define o destino de avaliação do Google.
              </p>
            </div>

            <div>
              <div className="activation-code">{normalized}</div>
              <div className="step-list">
                <div className="step-item active"><span>1</span> informe e-mail + link do Google</div>
                <div className="step-item"><span>2</span> leia o outro meio da placa</div>
                <div className="step-item"><span>3</span> confirme pelo e-mail</div>
              </div>
            </div>
          </section>

          {shouldFinishPairing && medium ? (
            <PairingFinish code={normalized} secondMedium={medium} />
          ) : (
            <GoogleActivationWizard code={normalized} medium={medium} />
          )}
        </div>
      </div>
    </main>
  );
}
