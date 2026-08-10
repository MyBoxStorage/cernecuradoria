"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_NAME,
  hasAcceptedCookies,
} from "@/components/CookieConsentBanner";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!gaId) return;

    function sync() {
      setEnabled(hasAcceptedCookies());
    }

    sync();

    function onConsent(event: Event) {
      const detail = (event as CustomEvent<string>).detail;
      setEnabled(detail === "accepted");
    }

    window.addEventListener("cerne-cookie-consent", onConsent);
    return () => window.removeEventListener("cerne-cookie-consent", onConsent);
  }, [gaId]);

  if (!gaId || !enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
          /* consent cookie: ${COOKIE_CONSENT_NAME} */
        `}
      </Script>
    </>
  );
}
