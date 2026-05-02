import type { Metadata } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const outfit = Outfit({
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
  subsets: ["latin"],
});

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ffure – Sala per eventi & conferenze",
  description:
    "Ffure è una sala elegante e versatile per eventi privati, compleanni, battesimi, feste a tema e conferenze.",
  openGraph: {
    title: "Ffure – Sala per eventi & conferenze",
    description:
      "Compleanni, feste a tema, conferenze aziendali. Curiamo ogni dettaglio per rendere il tuo evento indimenticabile.",
    url: siteUrl,
    siteName: "Ffure",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Ffure – Sala per eventi" }],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ffure – Sala per eventi & conferenze",
    description:
      "Compleanni, feste a tema, conferenze aziendali. Curiamo ogni dettaglio per rendere il tuo evento indimenticabile.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${bebasNeue.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#1C1917]">
        {children}
      </body>
    </html>
  );
}
