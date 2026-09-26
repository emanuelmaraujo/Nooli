import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://torvya.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Torvya — transforme presença física em ação digital",
    template: "%s · Torvya"
  },
  description:
    "Torvya conecta QR Code e NFC a avaliações do Google e outras experiências digitais, com ativação simples, destinos gerenciáveis e infraestrutura preparada para evoluir.",
  applicationName: "Torvya",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Torvya",
    title: "Torvya — transforme presença física em ação digital",
    description: "QR Code e NFC conectados a avaliações do Google e experiências digitais, sem aplicativo."
  },
  twitter: {
    card: "summary_large_image",
    title: "Torvya",
    description: "Do ponto físico à próxima ação do cliente."
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F8F4" },
    { media: "(prefers-color-scheme: dark)", color: "#06080C" }
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>{children}</body>
    </html>
  );
}
