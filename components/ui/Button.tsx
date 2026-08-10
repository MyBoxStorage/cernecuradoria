import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./ui.css";

type Variant = "primary" | "secondary" | "ghost" | "bronze";
type Size = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  onDark?: boolean;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  onDark = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    onDark ? "on-dark" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} type={props.type ?? "button"} {...props}>
      {children}
    </button>
  );
}
