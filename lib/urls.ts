export function normalizeDestinationUrl(input: string) {
  const value = input.trim();
  const withProtocol = /^https?:\/\//i.test(value) ? value : "https://" + value;
  const url = new URL(withProtocol);
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Somente URLs HTTP/HTTPS são permitidas.");
  }
  return url.toString();
}
