"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import "@/components/ui/ui.css";

export const COOKIE_CONSENT_NAME = "cerne_cookie_consent";
export const COOKIE_CONSENT_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

type ConsentValue = "accepted" | "declined";

function readConsent(): ConsentValue | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_CONSENT_NAME}=`));
  if (!match) return null;
  const value = match.split("=")[1];
  if (value === "accepted" || value === "declined") return value;
  return null;
}

function writeConsent(value: ConsentValue) {
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${COOKIE_CONSENT_NAME}=${value}; Path=/; Max-Age=${COOKIE_CONSENT_MAX_AGE}; SameSite=Lax${secure}`;
  window.dispatchEvent(
    new CustomEvent("cerne-cookie-consent", { detail: value }),
  );
}

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readConsent() === null);
  }, []);

  if (!visible) return null;

  function handle(value: ConsentValue) {
    writeConsent(value);
    setVisible(false);
  }

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Consentimento de cookies">
      <p className="cookie-banner__text">
        Usamos cookies para medir audiência do site, apenas com o seu
        consentimento. Veja a{" "}
        <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
      </p>
      <div className="cookie-banner__actions">
        <Button variant="secondary" size="sm" onClick={() => handle("declined")}>
          Recusar
        </Button>
        <Button variant="primary" size="sm" onClick={() => handle("accepted")}>
          Aceitar
        </Button>
      </div>
    </div>
  );
}

export function hasAcceptedCookies(): boolean {
  return readConsent() === "accepted";
}
