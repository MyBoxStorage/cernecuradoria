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
  getSiteUrl,
} from "@/lib/constants";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import "@/styles/globals.css";

const fraunces = localFont({
  src: [
    {
      path: "../public/fonts/Fraunces-Variable.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../public/fonts/Fraunces-Italic-Variable.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

const switzer = localFont({
  src: [
    {
      path: "../public/fonts/Switzer-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Switzer-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Switzer-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Switzer-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
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
