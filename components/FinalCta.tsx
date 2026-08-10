import { ButtonLink } from "@/components/ui/Button";
import "./final-cta.css";

export function FinalCta() {
  return (
    <section className="final-cta">
      <div className="final-cta__inner">
        <p className="final-cta__text">
          Uma avaliação inicial não tem custo nem compromisso. É uma conversa
          para entender a situação da família e explicar como o processo
          funciona.
        </p>
        <ButtonLink href="/contato" size="lg" onDark>
          Solicitar avaliação gratuita
        </ButtonLink>
      </div>
    </section>
  );
}
