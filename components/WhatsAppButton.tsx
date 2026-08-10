import { getWhatsAppUrl } from "@/lib/constants";
import "./ui/ui.css";

export function WhatsAppButton() {
  return (
    <a
      className="whatsapp-btn"
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 9.3c.2-.45.4-.46.58-.47h.5c.16 0 .36-.06.55.42.2.49.67 1.64.73 1.76.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.24.25-.1.49.14.24.62 1.02 1.33 1.65.91.81 1.68 1.06 1.92 1.18.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.14 1.14-.2.56-1.16 1.08-1.6 1.15-.43.07-.84.1-1.44-.09-.36-.11-.82-.26-1.42-.51-2.57-1.08-4.25-3.72-4.38-3.9-.13-.18-1.05-1.4-1.05-2.67 0-1.26.66-1.88.9-2.14Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
