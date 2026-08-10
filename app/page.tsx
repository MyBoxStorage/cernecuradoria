import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/FinalCta";
import { SectionLabel } from "@/components/SectionLabel";
import { ButtonLink } from "@/components/ui/Button";
import {
  NEIGHBORHOODS_BARRA,
  NEIGHBORHOODS_ZONA_SUL,
  absoluteUrl,
} from "@/lib/constants";
import { serviceSchema } from "@/lib/schema";
import "@/styles/home.css";

export const metadata: Metadata = {
  title: {
    absolute:
      "Cerne Curadoria — Curadoria de Espólios na Zona Sul do Rio de Janeiro",
  },
  description:
    "Esvaziamento completo de imóveis em inventário, mudança ou divórcio. Curadoria de espólios com discrição, na Zona Sul do Rio de Janeiro e Barra da Tijuca.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
};

const STEPS = [
  {
    number: "01",
    title: "Avaliação",
    description: "Vídeo e fotos da casa, sem compromisso.",
  },
  {
    number: "02",
    title: "Visita",
    description: "Curadoria presencial e explicação de todo o processo.",
  },
  {
    number: "03",
    title: "Leilão especializado",
    description: "Cada peça avaliada e destinada com cuidado.",
  },
  {
    number: "04",
    title: "Entrega",
    description: "Imóvel esvaziado, com clareza do início ao fim.",
  },
] as const;

export default function HomePage() {
  const schema = serviceSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* 1. Hero */}
      <section className="home-hero">
        <div className="home-hero__inner">
          <p className="home-hero__eyebrow">Curadoria de espólios</p>
          <h1 className="home-hero__title">
            O mesmo cuidado de uma curadoria de arte, agora para a casa inteira.
          </h1>
          <p className="home-hero__subtitle">
            A Cerne Curadoria realiza o esvaziamento completo de imóveis em
            processos de inventário, mudança ou divórcio, com curadoria e leilão
            especializado — na Zona Sul do Rio de Janeiro e na Barra da Tijuca.
          </p>
          <div className="home-hero__cta">
            <ButtonLink href="/contato" size="lg">
              Solicitar avaliação gratuita
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 2. Como funciona (resumo) */}
      <section className="home-section" aria-labelledby="como-funciona-title">
        <div className="home-section__inner">
          <SectionLabel>Como funciona</SectionLabel>
          <h2 id="como-funciona-title" className="home-section__title">
            Da avaliação à entrega, com clareza em cada etapa.
          </h2>
          <ol className="home-steps">
            {STEPS.map((step) => (
              <li key={step.number}>
                <span className="home-steps__number">{step.number}</span>
                <h3 className="home-steps__title">{step.title}</h3>
                <p className="home-steps__desc">{step.description}</p>
              </li>
            ))}
          </ol>
          <Link href="/como-funciona" className="home-text-link">
            Ver o processo completo →
          </Link>
        </div>
      </section>

      {/* 3. Áreas de atendimento */}
      <section className="home-section home-section--tight" aria-labelledby="areas-title">
        <div className="home-section__inner">
          <SectionLabel>Onde atuamos</SectionLabel>
          <h2 id="areas-title" className="home-section__title">
            Zona Sul do Rio de Janeiro e Barra da Tijuca.
          </h2>
          {/*
            TODO (Pedro Henrique): se algum bairro dessa lista não fizer sentido
            atender ou se faltar algum, é só remover/adicionar — a lista foi
            montada com base na divisão geográfica padrão da Zona Sul do Rio,
            não em dado confirmado caso a caso.
          */}
          <div className="home-areas">
            <div>
              <h3 className="home-areas__heading">Zona Sul</h3>
              <ul className="home-areas__list">
                {NEIGHBORHOODS_ZONA_SUL.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="home-areas__heading">Barra da Tijuca</h3>
              <ul className="home-areas__list">
                {NEIGHBORHOODS_BARRA.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Origem e confiança */}
      <section className="home-section home-section--tight">
        <div className="home-section__inner">
          <SectionLabel>Origem</SectionLabel>
          <blockquote className="origem-quote">
            O mesmo cuidado que avalia uma pintura acadêmica hoje se estende ao
            restante da casa.
          </blockquote>
          <p className="home-origin__support">
            A Cerne nasce da experiência de curadoria de arte e antiguidades de
            uma galeria carioca com décadas de atuação no Rio de Janeiro.
          </p>
          <Link href="/sobre" className="home-text-link">
            Conhecer a história →
          </Link>
        </div>
      </section>

      {/* 5. CTA final */}
      <FinalCta />
    </>
  );
}
