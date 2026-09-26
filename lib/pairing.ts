import { createSupabaseAdminClient } from "./supabase/admin";
import { putRedirectRecord } from "./cloudflare-kv";

export type EndpointKind = "qr" | "nfc";

export function normalizeEndpointCode(input: string) {
  return input.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function isValidEndpointCode(code: string) {
  return /^[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6,16}$/.test(code);
}

export async function pairPhysicalEndpoints(
  first: { kind: EndpointKind; code: string },
  second: { kind: EndpointKind; code: string }
) {
  if (first.kind === second.kind) {
    throw new Error("Leia um QR Code e uma tag NFC para formar o par.");
  }

  const qr = first.kind === "qr" ? first : second;
  const nfc = first.kind === "nfc" ? first : second;
  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    throw new Error("Ambiente ainda não conectado ao Supabase.");
  }

  const { data: endpoints, error } = await supabase
    .from("plate_endpoints")
    .select("id,public_code,kind,plate_id,status")
    .in("public_code", [qr.code, nfc.code]);

  if (error) throw new Error("Não foi possível validar os códigos físicos.");

  const qrEndpoint = endpoints?.find((endpoint) => endpoint.public_code === qr.code && endpoint.kind === "qr");
  const nfcEndpoint = endpoints?.find((endpoint) => endpoint.public_code === nfc.code && endpoint.kind === "nfc");

  if (!qrEndpoint || !nfcEndpoint) {
    throw new Error("Um dos códigos não pertence ao estoque Torvya.");
  }

  if (!qrEndpoint.plate_id) {
    throw new Error("O QR Code ainda não está associado a uma placa de produção.");
  }

  if (nfcEndpoint.plate_id && nfcEndpoint.plate_id !== qrEndpoint.plate_id) {
    throw new Error("Esta tag NFC já está vinculada a outra placa.");
  }

  const { data: plate, error: plateError } = await supabase
    .from("plates")
    .select("id,public_code,product_type,status,destination_url")
    .eq("id", qrEndpoint.plate_id)
    .single();

  if (plateError || !plate) {
    throw new Error("Placa não encontrada.");
  }

  if (!nfcEndpoint.plate_id) {
    const { error: updateError } = await supabase
      .from("plate_endpoints")
      .update({
        plate_id: plate.id,
        status: "paired",
        paired_at: new Date().toISOString()
      })
      .eq("id", nfcEndpoint.id)
      .is("plate_id", null);

    if (updateError) {
      throw new Error("Não foi possível vincular a tag NFC.");
    }
  }

  await supabase
    .from("plate_endpoints")
    .update({
      status: "paired",
      paired_at: new Date().toISOString()
    })
    .eq("id", qrEndpoint.id);

  const redirectState = plate.status === "activated" && plate.destination_url ? "active" : "unclaimed";
  const record = {
    state: redirectState as "active" | "unclaimed",
    url: plate.destination_url ?? undefined,
    productType: plate.product_type,
    canonicalCode: plate.public_code,
    version: 2
  };

  await Promise.all([
    putRedirectRecord(qr.code, record),
    putRedirectRecord(nfc.code, record)
  ]);

  return {
    plateId: plate.id,
    canonicalCode: plate.public_code,
    alreadyActivated: redirectState === "active"
  };
}
