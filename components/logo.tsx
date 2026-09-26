import Link from "next/link";

export function Logo() {
  return (
    <Link className="brand" href="/" aria-label="Torvya — início">
      <span className="brand-mark" aria-hidden="true">t</span>
      <span>torvya</span>
    </Link>
  );
}
