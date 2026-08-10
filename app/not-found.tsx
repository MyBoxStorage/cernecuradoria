import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/constants";
import "@/styles/not-found.css";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
  alternates: {
    canonical: absoluteUrl("/"),
  },
};

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__inner">
        <p className="not-found__eyebrow">404</p>
        <h1 className="not-found__title">Esta página não existe.</h1>
        <p className="not-found__text">
          O endereço pode ter mudado, ou o link que você usou está incompleto.
        </p>
        <Link href="/" className="not-found__link">
          Voltar para a Home →
        </Link>
      </div>
    </section>
  );
}
