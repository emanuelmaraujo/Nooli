import Link from "next/link";

export function Logo() {
  return (
    <Link className="brand" href="/" aria-label="Torvya — início">
      <span className="brand-mark">t</span>
      torvya
    </Link>
  );
}
