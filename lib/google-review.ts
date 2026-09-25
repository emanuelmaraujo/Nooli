import { normalizeDestinationUrl } from "./urls";

const PLACE_ID_RE = /^ChI[A-Za-z0-9_-]{10,}$/;

export function normalizeGoogleReviewDestination(input: string) {
  const value = input.trim();

  if (PLACE_ID_RE.test(value)) {
    return "https://search.google.com/local/writereview?placeid=" + encodeURIComponent(value);
  }

  const url = normalizeDestinationUrl(value);
  const host = new URL(url).hostname.toLowerCase();

  const allowed =
    host === "g.page" ||
    host.endsWith(".g.page") ||
    host === "google.com" ||
    host.endsWith(".google.com") ||
    host === "goo.gl" ||
    host.endsWith(".goo.gl");

  if (!allowed) {
    throw new Error("Use um link de avaliação do Google ou um Place ID válido.");
  }

  return url;
}
