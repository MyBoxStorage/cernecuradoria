"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import "./ui.css";

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar" aria-label="Principal">
      <Link href="/" className="navbar__brand" onClick={() => setOpen(false)}>
        <span className="navbar__cerne">CERNE</span>
        <span className="navbar__curadoria">Curadoria</span>
      </Link>

      <div className="navbar__links">
        {NAV_LINKS.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar__link${active ? " navbar__link--active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        className="navbar__toggle"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <svg width="22" height="16" viewBox="0 0 22 16" aria-hidden="true">
          {open ? (
            <path
              d="M2 2 L20 14 M20 2 L2 14"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          ) : (
            <path
              d="M1 1 H21 M1 8 H21 M1 15 H21"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
          )}
        </svg>
      </button>

      <div
        id="mobile-nav"
        className={`navbar__menu${open ? " navbar__menu--open" : ""}`}
      >
        {NAV_LINKS.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar__link${active ? " navbar__link--active" : ""}`}
              aria-current={active ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
