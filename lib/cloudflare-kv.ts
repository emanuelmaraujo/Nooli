type RedirectState = "unclaimed" | "active" | "suspended" | "retired";

type RedirectRecord = {
  state: RedirectState;
  url?: string;
  productType?: string;
  version?: number;
};

export async function putRedirectRecord(publicCode: string, record: RedirectRecord) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const namespaceId = process.env.CLOUDFLARE_KV_NAMESPACE_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !namespaceId || !token) {
    throw new Error("Cloudflare KV não configurado.");
  }

  const key = encodeURIComponent("r:" + publicCode);
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${namespaceId}/values/${key}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(record),
      cache: "no-store"
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error("Falha ao sincronizar KV: " + text.slice(0, 300));
  }
}
