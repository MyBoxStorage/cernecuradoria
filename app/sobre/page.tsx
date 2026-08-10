import type { Metadata } from "next";
import { FinalCta } from "@/components/FinalCta";
import { FOUNDER, absoluteUrl } from "@/lib/constants";
import { breadcrumbListSchema, personSchema } from "@/lib/schema";
import "@/styles/sobre.css";

export const metadata: Metadata = {
  title: {
    absolute: "Sobre — Cerne Curadoria",
  },
  description:
    "Conheça a origem da Cerne Curadoria: uma nova frente de trabalho nascida da curadoria de arte e antiguidades, fundada por Pedro Henrique.",
  alternates: {
    canonical: absoluteUrl("/sobre"),
  },
};

export default function SobrePage() {
  const schemas = [
    personSchema(),
    breadcrumbListSchema([
      { name: "Home", path: "/" },
      { name: "Sobre", path: "/sobre" },
    ]),
  ];

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="sobre-hero">
        <div className="sobre-hero__inner">
          <p className="sobre-hero__eyebrow">Sobre</p>
          <h1 className="sobre-hero__title">Uma curadoria que nasce de outra.</h1>
          <p className="sobre-hero__lead">
            A Cerne Curadoria existe porque uma curadoria mais antiga encontrou
            um limite: a de obras de arte e antiguidades. Esta página conta como
            essa lacuna virou uma nova frente de trabalho — e quem cuida dela
            hoje.
          </p>
        </div>
      </section>

      <section className="sobre-founder" aria-labelledby="fundador-nome">
        <div className="sobre-founder__inner">
          {/*
            TODO: substituir por foto real do Pedro Henrique antes do lançamento.
            Tratamento sugerido na foto final (não implementar filtro agora):
            preto e branco ou dessaturada, para conversar com o resto do site
            tipográfico sem cor “solta”.
          */}
          <div
            className="sobre-founder__photo"
            role="img"
            aria-label={`Foto de ${FOUNDER.name} (em breve)`}
          />

          <div>
            <h2 id="fundador-nome" className="sobre-founder__name">
              {FOUNDER.name}
            </h2>
            <p className="sobre-founder__role">{FOUNDER.jobTitle}</p>
            <p className="sobre-founder__bio">
              Sou Pedro Henrique, fundador e curador da Cerne Curadoria. Antes de
              atuar neste universo, passei alguns anos no mercado financeiro, com
              curadoria de projetos emergentes para investimento — um trabalho de
              avaliar, selecionar e decidir com cuidado o que faz sentido levar
              adiante. É o mesmo princípio que aplico hoje, só que diante do
              acervo de uma casa inteira, não de uma carteira de projetos.
            </p>
          </div>
        </div>
      </section>

      <section className="sobre-prose" aria-label="Origem">
        <div className="sobre-prose__inner">
          <p>
            A Cerne nasce de uma percepção do meu pai, Alexandre Teixeira de
            Souza, sócio da Cabral Antiguidades — antiquário carioca dedicado à
            Pintura Acadêmica Brasileira desde o final dos anos 90. Ao longo de
            anos avaliando acervos de arte, ele notou que boa parte das famílias
            com quem trabalhava ainda precisava de alguém para cuidar do restante
            da casa — um espaço que a curadoria de antiguidades tradicionalmente
            não alcança. Em vez de continuar indicando esse trabalho a terceiros,
            ele me chamou para explorar essa frente por conta própria, com
            orientação direta dele. Ele segue presente nas decisões da Cerne e,
            sempre que faz sentido, participa pessoalmente de visitas.
          </p>
        </div>
      </section>

      <section className="sobre-prose sobre-prose--closing" aria-label="Fechamento">
        <div className="sobre-prose__inner">
          <p>
            É esse olhar — herdado, e agora meu — que guio em cada avaliação:
            cuidado com o que tem valor, discrição com quem está vivendo um
            momento difícil, e organização para que tudo aconteça sem urgência
            desnecessária.
          </p>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
