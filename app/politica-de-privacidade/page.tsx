import type { Metadata } from "next";
import "@/styles/legal.css";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  robots: { index: false, follow: true },
};

const SECTIONS = [
  {
    title: "1. Quem somos",
    body: "A Cerne Curadoria, [a preencher após a formalização do CNPJ], é responsável pelo tratamento dos dados pessoais coletados neste site.",
  },
  {
    title: "2. Quais dados coletamos",
    body: "Quando você preenche o formulário de contato, coletamos: nome, telefone/WhatsApp, bairro do imóvel, e as respostas sobre o momento do processo e o perfil do acervo. Também usamos cookies de análise (Google Analytics e Vercel Analytics) para entender como o site é usado, só depois do seu consentimento no banner de cookies.",
  },
  {
    title: "3. Para que usamos esses dados",
    body: "Usamos os dados do formulário exclusivamente para entrar em contato e conduzir a avaliação inicial do seu caso. Usamos os dados de navegação (cookies) para melhorar o site. Não vendemos nem compartilhamos seus dados com terceiros para fins de marketing.",
  },
  {
    title: "4. Com quem compartilhamos",
    body: "Os dados do formulário passam pelo Resend, serviço técnico responsável por entregar o e-mail até nós — ele não usa esses dados para nenhum outro fim. Os dados de navegação passam pelo Google Analytics e pela Vercel Analytics, sob as políticas de privacidade dessas empresas.",
  },
  {
    title: "5. Por quanto tempo guardamos",
    body: "Guardamos os dados do formulário pelo tempo necessário para conduzir a avaliação e, se você se tornar cliente, pelo prazo exigido para a prestação do serviço. Você pode pedir a exclusão a qualquer momento (ver item 7).",
  },
  {
    title: "6. Cookies",
    body: "Usamos cookies essenciais (para lembrar sua escolha no banner de consentimento) e cookies de análise (só após seu aceite). Você pode recusar os cookies de análise sem prejuízo ao uso do site.",
  },
  {
    title: "7. Seus direitos",
    body: "Conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode a qualquer momento solicitar acesso, correção ou exclusão dos seus dados, e revogar seu consentimento. Para isso, entre em contato pelo WhatsApp [placeholder] ou pelo e-mail [a preencher].",
  },
  {
    title: "8. Contato",
    body: "Dúvidas sobre esta política podem ser enviadas para [e-mail a preencher após ativação].",
  },
] as const;

export default function PoliticaDePrivacidadePage() {
  return (
    <article className="legal-page">
      <div className="legal-page__inner">
        <h1 className="legal-page__title">Política de Privacidade</h1>
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
