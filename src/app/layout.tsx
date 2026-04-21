import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mediasata – Verkkosivut jotka toimivat",
  description:
    "Suunnittelemme ja toteutamme modernit, nopeat verkkosivut pk-yrityksille Next.js-teknologialla. Selkeä hinta, ei turhaa monimutkaisuutta.",
  keywords: "verkkosivut, Next.js, webdesign, Riihimäki, Suomi",
  authors: [{ name: "Mediasata" }],
  openGraph: {
    title: "Mediasata – Verkkosivut jotka toimivat",
    description:
      "Suunnittelemme ja toteutamme modernit verkkosivut pk-yrityksille.",
    url: "https://mediasata.fi",
    siteName: "Mediasata",
    locale: "fi_FI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,700&family=DM+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
