import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <section className="placeholder-page">
      <h1>Blog — em construção</h1>
      <p>Nenhum artigo publicado ainda.</p>
    </section>
  );
}
