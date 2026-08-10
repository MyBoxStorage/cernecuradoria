import type { ReactNode } from "react";
import "./ui.css";

type Tone = "neutral" | "bronze" | "dark";

type BadgeProps = {
  tone?: Tone;
  children: ReactNode;
};

export function Badge({ tone = "neutral", children }: BadgeProps) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}
