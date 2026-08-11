import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Bots de busca/citação de IA — permitidos explicitamente (política: manter visível
      // para citação em respostas de IA). Ver GEO-ESTRATEGIA-2026-08-11.md na raiz do projeto.
      {
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Perplexity-User",
        ],
        allow: "/",
      },
      // Bots de treino de modelo — mesma política (Allow) até decisão em contrário do
      // Pedro Henrique. Não afeta citação em respostas, só uso em treinamento futuro de modelo.
      {
        userAgent: ["GPTBot", "ClaudeBot", "Google-Extended", "CCBot", "Bytespider"],
        allow: "/",
      },
    ],
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
