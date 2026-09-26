import { NextResponse } from "next/server";
import { pairPhysicalEndpoints, isValidEndpointCode, normalizeEndpointCode, type EndpointKind } from "../../../lib/pairing";

const COOKIE = "torvya_pair_first";
const KINDS = new Set(["qr", "nfc"]);

type SavedEndpoint = { kind: EndpointKind; code: string };

function parseSaved(value?: string): SavedEndpoint | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as SavedEndpoint;
    if (!KINDS.has(parsed.kind) || !isValidEndpointCode(parsed.code)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const kind = url.searchParams.get("kind") as EndpointKind | null;
  const code = normalizeEndpointCode(url.searchParams.get("code") ?? "");

  if (!kind || !KINDS.has(kind) || !isValidEndpointCode(code)) {
    return NextResponse.redirect(new URL("/support?reason=invalid-pair-code", url));
  }

  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookieValue = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(COOKIE + "="))
    ?.slice(COOKIE.length + 1);

  const first = parseSaved(cookieValue ? decodeURIComponent(cookieValue) : undefined);
  const current: SavedEndpoint = { kind, code };

  if (!first || first.kind === current.kind) {
    const response = NextResponse.redirect(
      new URL("/pair/wait?kind=" + current.kind + "&code=" + encodeURIComponent(current.code), url)
    );

    response.cookies.set(COOKIE, JSON.stringify(current), {
      httpOnly: true,
      sameSite: "lax",
      secure: url.protocol === "https:",
      path: "/",
      maxAge: 15 * 60
    });

    return response;
  }

  try {
    const result = await pairPhysicalEndpoints(first, current);
    const response = NextResponse.redirect(
      new URL(
        result.alreadyActivated
          ? "/pair/success?code=" + encodeURIComponent(result.canonicalCode)
          : "/activate/google/" + encodeURIComponent(result.canonicalCode) + "?paired=1",
        url
      )
    );
    response.cookies.delete(COOKIE);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Não foi possível concluir o pareamento.";
    const response = NextResponse.redirect(
      new URL("/pair/error?message=" + encodeURIComponent(message), url)
    );
    response.cookies.delete(COOKIE);
    return response;
  }
}
