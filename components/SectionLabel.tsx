import type { ReactNode } from "react";
import "./section-label.css";

type SectionLabelProps = {
  children: ReactNode;
};

/** Assinatura visual do site: linha bronze curta + rótulo em versalete. */
export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="section-label">
      <span className="section-label__rule" aria-hidden="true" />
      <p className="section-label__text">{children}</p>
    </div>
  );
}
