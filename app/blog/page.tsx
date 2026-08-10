import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/SectionLabel";
import { absoluteUrl } from "@/lib/constants";
import { formatPostDate, getAllPosts } from "@/lib/posts";
import "@/styles/blog.css";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notas e reflexões sobre curadoria de espólios, inventário e herança — o que fazer com o que fica, pela perspectiva da Cerne Curadoria no Rio de Janeiro.",
  alternates: {
    canonical: absoluteUrl("/blog"),
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="blog-page">
      <div className="blog-page__inner">
        <SectionLabel>Blog</SectionLabel>
        <h1 className="blog-page__title">
          Notas sobre curadoria, herança e o que fazer com o que fica.
        </h1>

        {posts.length === 0 ? (
          <p className="blog-empty">
            Em breve, este espaço vai reunir reflexões sobre curadoria de
            espólios, o processo de inventário e as decisões que toda família
            enfrenta ao lidar com os bens de quem se foi. Por enquanto, para
            saber mais sobre como a Cerne funciona, veja{" "}
            <Link href="/como-funciona">como funciona o processo</Link> ou{" "}
            <Link href="/contato">fale diretamente comigo</Link>.
          </p>
        ) : (
          <ul className="blog-list">
            {posts.map((post) => (
              <li className="blog-list__item" key={post.slug}>
                <time className="blog-list__date" dateTime={post.date}>
                  {formatPostDate(post.date)}
                </time>
                <h2 className="blog-list__title">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="blog-list__excerpt">{post.description}</p>
                <Link href={`/blog/${post.slug}`} className="blog-list__more">
                  Ler mais →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
