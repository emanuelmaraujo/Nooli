interface Env {
  REDIRECTS: KVNamespace;
  ANALYTICS?: AnalyticsEngineDataset;
  APP_BASE_URL: string;
}

type RedirectRecord = {
  state: "unclaimed" | "active" | "suspended" | "retired";
  url?: string;
  productType?: string;
  version?: number;
};

const CODE_RE = /^[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6,16}$/;

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (!["GET", "HEAD"].includes(request.method)) {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const url = new URL(request.url);
    const code = url.pathname.replace(/^\/+|\/+$/g, "").toUpperCase();

    if (!CODE_RE.test(code)) {
      return Response.redirect(env.APP_BASE_URL + "/support", 302);
    }

    const raw = await env.REDIRECTS.get("r:" + code);
    if (!raw) {
      return Response.redirect(env.APP_BASE_URL + "/activate/" + code, 302);
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
            blobs: [code, record.state, request.headers.get("cf-ipcountry") ?? "XX"],
            doubles: [1],
            indexes: [code]
          })
        )
      );
    }

    if (record.state === "unclaimed") {
      return Response.redirect(env.APP_BASE_URL + "/activate/" + code, 302);
    }

    if (record.state !== "active" || !record.url) {
      return Response.redirect(env.APP_BASE_URL + "/support?code=" + encodeURIComponent(code), 302);
    }

    return Response.redirect(record.url, 302);
  }
};
