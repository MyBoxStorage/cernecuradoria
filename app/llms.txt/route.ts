import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, SITE_DESCRIPTION } from "@/lib/constants";

export function GET() {
  const posts = getAllPosts();

  const postLines =
    posts.length === 0
      ? ""
      : "\n" +
        posts
          .map(
            (post) =>
              `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.description}`,
          )
          .join("\n");

  const body = `# Cerne Curadoria

> ${SITE_DESCRIPTION}

## Empresa
- [Sobre](${absoluteUrl("/sobre")}): Quem fundou a Cerne Curadoria e por quê.
- [Como Funciona](${absoluteUrl("/como-funciona")}): O processo completo, do primeiro contato à entrega do imóvel.

## Contato
- [Contato](${absoluteUrl("/contato")}): Formulário de avaliação gratuita e WhatsApp.

## Blog
- [Blog](${absoluteUrl("/blog")}): Notas sobre curadoria, herança e o que fazer com o que fica.${postLines}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
    },
  });
}
