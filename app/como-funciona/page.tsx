import type { Metadata } from "next";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FinalCta } from "@/components/FinalCta";
import { SectionLabel } from "@/components/SectionLabel";
import {
  FAQ_ITEMS,
  PROCESS_INTRO,
  PROCESS_STEPS,
} from "@/lib/como-funciona-content";
import { breadcrumbListSchema, faqPageSchema } from "@/lib/schema";
import "@/styles/como-funciona.css";

export const metadata: Metadata = {
  title: {
    absolute: "Como Funciona — Cerne Curadoria",
  },
  description:
    "Da avaliação inicial ao leilão especializado: veja como funciona, passo a passo, o processo de curadoria e esvaziamento de imóveis da Cerne Curadoria.",
};

export default function ComoFuncionaPage() {
  const schemas = [
    faqPageSchema(FAQ_ITEMS),
    breadcrumbListSchema([
      { name: "Home", path: "/" },
      { name: "Como Funciona", path: "/como-funciona" },
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

      <section className="cf-page">
        <div className="cf-page__inner">
          <h1 className="cf-page__title">Como Funciona</h1>
          <p className="cf-page__intro">{PROCESS_INTRO}</p>

          <ol className="cf-timeline">
            {PROCESS_STEPS.map((step) => (
              <li className="cf-step" key={step.number}>
                <div className="cf-step__rail">
                  <span className="cf-step__number" aria-hidden="true">
                    {step.number}
                  </span>
                  <span className="cf-step__line" aria-hidden="true" />
                </div>
                <div className="cf-step__body">
                  <h3 className="cf-step__title">
                    <span className="cf-step__sr-number">{step.number}. </span>
                    {step.title}
                  </h3>
                  <p className="cf-step__text">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cf-faq" aria-label="Perguntas frequentes">
        <div className="cf-faq__inner">
          <SectionLabel>Perguntas frequentes</SectionLabel>
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      <FinalCta />
    </>
  );
}
