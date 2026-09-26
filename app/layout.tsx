import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"),
  title: {
    default: "Torvya — conecte o mundo físico ao digital",
    template: "%s · Torvya"
  },
  description:
    "Torvya conecta placas físicas a experiências digitais com QR Code e NFC, ativação simples e destinos gerenciáveis.",
  applicationName: "Torvya",
  keywords: [
    "QR Code",
    "NFC",
    "Google Avaliações",
    "avaliações Google",
    "placa NFC",
    "Torvya"
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Torvya",
    title: "Torvya — conecte o mundo físico ao digital",
    description:
      "QR Code + NFC para levar seu cliente ao destino certo com menos atrito."
  },
  twitter: {
    card: "summary_large_image",
    title: "Torvya — conecte o mundo físico ao digital",
    description:
      "QR Code + NFC para levar seu cliente ao destino certo com menos atrito."
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F7FB" },
    { media: "(prefers-color-scheme: dark)", color: "#07070A" }
  ],
  colorScheme: "light dark"
};

const themeScript = `
(() => {
  try {
    const saved = localStorage.getItem("torvya-theme");
    const theme = saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {}
})();
`;

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${manrope.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
