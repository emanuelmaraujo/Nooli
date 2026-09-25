import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"),
  title: {
    default: "Nooli — um toque. um destino.",
    template: "%s · Nooli"
  },
  description:
    "Placas inteligentes com QR Code e NFC. Configure uma vez, altere o destino quando quiser.",
  applicationName: "Nooli",
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: "#070A0F",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
