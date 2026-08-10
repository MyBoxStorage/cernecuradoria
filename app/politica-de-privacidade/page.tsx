import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  robots: { index: false, follow: false },
};

export default function PoliticaDePrivacidadePage() {
  return (
    <section className="placeholder-page">
      <h1>Política de Privacidade — em construção</h1>
      <p>Conteúdo legal será publicado antes do lançamento público.</p>
    </section>
  );
}
