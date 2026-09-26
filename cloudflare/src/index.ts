interface Env {
  REDIRECTS: KVNamespace;
  ANALYTICS?: AnalyticsEngineDataset;
  APP_BASE_URL: string;
}

type EndpointKind = "qr" | "nfc";

type RedirectRecord = {
  state: "pairing" | "unclaimed" | "active" | "suspended" | "retired";
  url?: string;
  productType?: string;
  canonicalCode?: string;
  version?: number;
};

const CODE_RE = /^[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6,16}$/;

function readEndpoint(pathname: string): { kind?: EndpointKind; code: string } | null {
  const parts = pathname.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);

  if (parts.length === 1) {
    const code = parts[0].toUpperCase();
    return CODE_RE.test(code) ? { code } : null;
  }

  if (parts.length === 2 && (parts[0] === "q" || parts[0] === "n")) {
    const code = parts[1].toUpperCase();
    if (!CODE_RE.test(code)) return null;
    return { kind: parts[0] === "q" ? "qr" : "nfc", code };
  }

  return null;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (!["GET", "HEAD"].includes(request.method)) {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const url = new URL(request.url);
    const endpoint = readEndpoint(url.pathname);

    if (!endpoint) {
      return Response.redirect(env.APP_BASE_URL + "/support", 302);
    }

    const raw = await env.REDIRECTS.get("r:" + endpoint.code);

    if (!raw) {
      if (endpoint.kind) {
        return Response.redirect(
          env.APP_BASE_URL +
            "/pair/start?kind=" +
            endpoint.kind +
            "&code=" +
            encodeURIComponent(endpoint.code),
          302
        );
      }

      return Response.redirect(env.APP_BASE_URL + "/activate/" + endpoint.code, 302);
    }

    let record: RedirectRecord;
    try {
      record = JSON.parse(raw) as RedirectRecord;
    } catch {
      return new Response("Invalid redirect record", { status: 500 });
    }

    if (env.ANALYTICS) {
      ctx.waitUntil(
        Promise.resolve(
          env.ANALYTICS.writeDataPoint({
            blobs: [
              endpoint.code,
              endpoint.kind ?? "legacy",
              record.state,
              request.headers.get("cf-ipcountry") ?? "XX"
            ],
            doubles: [1],
            indexes: [record.canonicalCode ?? endpoint.code]
          })
        )
      );
    }

    if (record.state === "pairing") {
      const kind = endpoint.kind ?? "qr";
      return Response.redirect(
        env.APP_BASE_URL +
          "/pair/start?kind=" +
          kind +
          "&code=" +
          encodeURIComponent(endpoint.code),
        302
      );
    }

    if (record.state === "unclaimed") {
      const canonical = record.canonicalCode ?? endpoint.code;
      return Response.redirect(env.APP_BASE_URL + "/activate/" + canonical, 302);
    }

    if (record.state !== "active" || !record.url) {
      return Response.redirect(
        env.APP_BASE_URL + "/support?code=" + encodeURIComponent(record.canonicalCode ?? endpoint.code),
        302
      );
    }

    return Response.redirect(record.url, 302);
  }
};
