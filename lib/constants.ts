/** Controla visibilidade de links legais (Política / Termos) na navegação e no footer. */
export const SITE_LAUNCHED = false;

export const SITE_NAME = "Cerne Curadoria";

export const SITE_DESCRIPTION =
  "Curadoria e intermediação de espólios e heranças, com esvaziamento completo de imóveis, atendendo famílias na Zona Sul do Rio de Janeiro e na Barra da Tijuca.";

export const SITE_TAGLINE = "Curadoria de Espólios no Rio de Janeiro";

/** Telefone provisório — substituir pelo número definitivo antes do lançamento. */
export const WHATSAPP_PHONE = "5521973003715";

export const WHATSAPP_MESSAGE =
  "Olá, gostaria de saber mais sobre a Cerne Curadoria.";

export const AREAS_SERVED = "Zona Sul do Rio de Janeiro e Barra da Tijuca";

/**
 * Lista de bairros para Home / schema Service.
 * TODO (Pedro Henrique): confirmar se algum bairro não faz sentido atender ou se falta algum —
 * montada pela divisão geográfica padrão da Zona Sul, não por dado confirmado caso a caso.
 */
export const NEIGHBORHOODS_ZONA_SUL = [
  "Leblon",
  "Ipanema",
  "Gávea",
  "Jardim Botânico",
  "Lagoa",
  "Botafogo",
  "Flamengo",
  "Laranjeiras",
  "Urca",
  "Copacabana",
  "São Conrado",
] as const;

export const NEIGHBORHOODS_BARRA = [
  "Barra da Tijuca",
  "Recreio dos Bandeirantes",
  "Joá",
] as const;

export const FOUNDER = {
  name: "Pedro Henrique",
  jobTitle: "Fundador e Curador",
  /** Resumo para schema Person — não é copy de página. */
  description:
    "Fundador e curador da Cerne Curadoria; antes atuou no mercado financeiro com curadoria de projetos emergentes para investimento.",
  /**
   * Perfis públicos (LinkedIn etc.) — vazio até existirem.
   * Quando houver URL, adicionar só aqui; Organization e Person schema reutilizam.
   */
  sameAs: [] as readonly string[],
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/sobre", label: "Sobre" },
  { href: "/como-funciona", label: "Como Funciona" },
  { href: "/contato", label: "Contato" },
] as const;

export const PUBLIC_ROUTES = [
  "/",
  "/sobre",
  "/como-funciona",
  "/contato",
  "/blog",
] as const;

export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://cernecuradoria.com.br"
  );
}

export function getWhatsAppUrl(): string {
  const text = encodeURIComponent(WHATSAPP_MESSAGE);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
}
