import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import { SiteFooter, SiteHeader, WhatsAppFab } from "@/components/SiteChrome";
import { absoluteUrl, ISTANBUL_DISTRICTS, siteConfig } from "@/lib/site";
import "./globals.css";

const display = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "EKOL HAIR PROTEZ | Bahçelievler Protez Saç & Bakım",
    template: "%s | EKOL HAIR PROTEZ",
  },
  description:
    "Bahçelievler protez saç, Bağcılar ve Güngören protez saç bakımı. Doğal görünümlü uygulamalar, before-after sonuçları.",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.tagline,
  },
  robots: { index: true, follow: true },
  other: {
    "geo.region": siteConfig.geo.region,
    "geo.placename": "Bahçelievler, İstanbul",
    "geo.position": `${siteConfig.geo.lat};${siteConfig.geo.lng}`,
    ICBM: `${siteConfig.geo.lat}, ${siteConfig.geo.lng}`,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HairSalon",
        name: siteConfig.name,
        url: absoluteUrl("/"),
        telephone: siteConfig.phone,
        email: siteConfig.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bahçelievler",
          addressRegion: "İstanbul",
          addressCountry: "TR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: siteConfig.geo.lat,
          longitude: siteConfig.geo.lng,
        },
        areaServed: ISTANBUL_DISTRICTS.map((d) => ({
          "@type": "AdministrativeArea",
          name: `${d}, İstanbul`,
        })),
      },
    ],
  };

  return (
    <html lang="tr">
      <body className={`${display.variable} ${body.variable}`}>
        <style>{`:root{--display:var(--font-display),Impact,sans-serif;--body:var(--font-body),system-ui,sans-serif}`}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <WhatsAppFab />
      </body>
    </html>
  );
}
