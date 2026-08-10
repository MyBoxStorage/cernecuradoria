import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./ui.css";

type Variant = "primary" | "secondary" | "ghost" | "bronze";
type Size = "sm" | "md" | "lg";

type ButtonStyleProps = {
  variant?: Variant;
  size?: Size;
  onDark?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyleProps;

function buttonClassName({
  variant = "primary",
  size = "md",
  onDark = false,
  className = "",
}: Omit<ButtonStyleProps, "children">) {
  return [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    onDark ? "on-dark" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  variant = "primary",
  size = "md",
  onDark = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClassName({ variant, size, onDark, className })}
      type={props.type ?? "button"}
      {...props}
    >
      {children}
    </button>
  );
}

type ButtonLinkProps = ButtonStyleProps & {
  href: string;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  onDark = false,
  className = "",
  children,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={buttonClassName({ variant, size, onDark, className })}
    >
      {children}
    </Link>
  );
}
