import type { ReactNode } from "react";
import "./ui.css";

type CardProps = {
  eyebrow?: string;
  title?: string;
  accent?: boolean;
  children: ReactNode;
};

export function Card({ eyebrow, title, accent = false, children }: CardProps) {
  return (
    <div className={`card${accent ? " card--accent" : ""}`}>
      {eyebrow ? <div className="card__eyebrow">{eyebrow}</div> : null}
      {title ? <div className="card__title">{title}</div> : null}
      <div className="card__body">{children}</div>
    </div>
  );
}
