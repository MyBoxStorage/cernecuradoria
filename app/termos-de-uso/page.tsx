import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  robots: { index: false, follow: false },
};

export default function TermosDeUsoPage() {
  return (
    <section className="placeholder-page">
      <h1>Termos de Uso — em construção</h1>
      <p>Conteúdo legal será publicado antes do lançamento público.</p>
    </section>
  );
}
