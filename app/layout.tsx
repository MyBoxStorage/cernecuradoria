import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Footer } from "@/components/ui/Footer";
import { NavBar } from "@/components/ui/NavBar";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  absoluteUrl,
  getSiteUrl,
} from "@/lib/constants";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import "@/styles/globals.css";

/**
 * Fraunces (display) — único preload acima da dobra (hero H1).
 * Arquivo já restrito a opsz + wght 400–600 (SOFT/WONK pinados), em woff2.
 * Itálico não entra no bundle crítico: o site não usa font-style: italic.
 */
const fraunces = localFont({
  src: [
    {
      path: "../public/fonts/Fraunces-Variable.woff2",
      weight: "400 600",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

/**
 * Switzer (corpo/UI) — sem preload; só os pesos realmente usados (400/500).
 * Semibold/Bold existem em public/fonts como woff2, mas não são carregados.
 */
const switzer = localFont({
  src: [
    {
      path: "../public/fonts/Switzer-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Switzer-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
  preload: false,
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    types: {
      "application/rss+xml": absoluteUrl("/feed.xml"),
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemas = [organizationSchema(), websiteSchema()];

  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${switzer.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemas[0]),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemas[1]),
          }}
        />
        <NavBar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieConsentBanner />
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
