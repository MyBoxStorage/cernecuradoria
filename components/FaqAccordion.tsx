"use client";

import { useId, useState } from "react";
import "./faq-accordion.css";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: readonly FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <div className="faq">
      {items.map((item, index) => {
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        const isOpen = openIndex === index;

        return (
          <div className="faq__item" key={item.question}>
            <h3 className="faq__heading">
              <button
                type="button"
                id={buttonId}
                className="faq__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
              >
                {item.question}
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="faq__panel"
              hidden={!isOpen}
            >
              <p className="faq__answer">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
