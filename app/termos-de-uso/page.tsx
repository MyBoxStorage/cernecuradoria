import type { Metadata } from "next";
import "@/styles/legal.css";

export const metadata: Metadata = {
  title: "Termos de Uso",
  robots: { index: false, follow: true },
};

const SECTIONS = [
  {
    title: "1. Aceitação",
    body: "Ao usar este site, você concorda com estes termos. Se não concordar, pedimos que não utilize o site.",
  },
  {
    title: "2. Sobre o conteúdo do site",
    body: "As informações aqui, incluindo a descrição do processo de curadoria e leilão, são de caráter geral e informativo. As condições específicas de cada caso — prazos, valores, cláusulas — são definidas individualmente em contrato, após conversa direta com a Cerne Curadoria.",
  },
  {
    title: "3. Formulário de contato",
    body: "O envio do formulário não gera nenhum compromisso ou contrato entre as partes. Ele é o início de uma conversa, sujeita a avaliação e aceite mútuo antes de qualquer serviço começar.",
  },
  {
    title: "4. Propriedade intelectual",
    body: "Todo o conteúdo deste site — textos, identidade visual, tipografia — pertence à Cerne Curadoria, [a preencher após a formalização do CNPJ], e não pode ser reproduzido sem autorização.",
  },
  {
    title: "5. Limitação de responsabilidade",
    body: "Fazemos o possível para manter as informações deste site atualizadas e corretas, mas não garantimos ausência total de erros. Nenhuma informação aqui substitui a avaliação individual de cada caso.",
  },
  {
    title: "6. Alterações",
    body: "Estes termos podem ser atualizados a qualquer momento. A data no topo desta página indica a última revisão.",
  },
  {
    title: "7. Legislação aplicável",
    body: "Estes termos são regidos pelas leis brasileiras, com foro na comarca do Rio de Janeiro/RJ para resolução de eventuais conflitos.",
  },
  {
    title: "8. Contato",
    body: "Dúvidas sobre estes termos podem ser enviadas para [e-mail a preencher após ativação].",
  },
] as const;

export default function TermosDeUsoPage() {
  return (
    <article className="legal-page">
      <div className="legal-page__inner">
        <h1 className="legal-page__title">Termos de Uso</h1>
        <p className="legal-page__updated">
          Última atualização: [data do lançamento]
        </p>

        {SECTIONS.map((section) => (
          <section key={section.title} className="legal-page__section">
            <h2 className="legal-page__heading">{section.title}</h2>
            <p className="legal-page__text">{section.body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
