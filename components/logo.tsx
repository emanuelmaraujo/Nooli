import Link from "next/link";

export function Logo() {
  return (
    <Link className="brand" href="/">
      <span className="brand-mark">n</span>
      nooli
    </Link>
  );
}
