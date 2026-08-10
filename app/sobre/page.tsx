import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
};

export default function SobrePage() {
  return (
    <section className="placeholder-page">
      <h1>Sobre — em construção</h1>
      <p>Conteúdo desta página virá nos próximos sprints.</p>
    </section>
  );
}
