import type { Metadata } from "next";
import { ContactFlow } from "@/components/ContactFlow";
import { absoluteUrl, getWhatsAppUrl } from "@/lib/constants";
import { breadcrumbListSchema } from "@/lib/schema";
import "@/styles/contato.css";

export const metadata: Metadata = {
  title: {
    absolute: "Contato — Cerne Curadoria",
  },
  description:
    "Solicite uma avaliação gratuita e sem compromisso para o acervo da sua casa. Atendemos com discrição na Zona Sul do Rio de Janeiro e na Barra da Tijuca.",
  alternates: {
    canonical: absoluteUrl("/contato"),
  },
};

export default function ContatoPage() {
  const schema = breadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Contato", path: "/contato" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="contact-hero">
        <div className="contact-hero__inner">
          <p className="contact-hero__eyebrow">Contato</p>
          <h1 className="contact-hero__title">Uma conversa sem compromisso.</h1>
          <p className="contact-hero__lead">
            Preencha em menos de um minuto. Uso essas respostas só para entender
            a situação antes da nossa conversa — não existe resposta errada
            aqui.
          </p>
          <a
            className="contact-hero__whatsapp"
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Prefere falar direto? Fale pelo WhatsApp →
          </a>
        </div>
      </section>

      <ContactFlow />
    </>
  );
}
