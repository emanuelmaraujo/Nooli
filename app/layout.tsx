import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"),
  title: {
    default: "Nooli — QR + NFC que evolui com o seu negócio",
    template: "%s · Nooli"
  },
  description:
    "Nooli conecta produtos físicos a experiências digitais com QR Code, NFC, destinos gerenciáveis e uma plataforma preparada para evoluir.",
  applicationName: "Nooli",
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
    const saved = localStorage.getItem("nooli-theme");
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
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
