import {
  FOUNDER,
  SITE_DESCRIPTION,
  SITE_NAME,
  WHATSAPP_PHONE,
  getSiteUrl,
} from "./constants";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: getSiteUrl(),
    areaServed: [
      {
        "@type": "City",
        name: "Rio de Janeiro",
      },
    ],
    // Telefone provisório — atualizar quando o número definitivo estiver confirmado
    telephone: `+${WHATSAPP_PHONE}`,
    founder: {
      "@type": "Person",
      name: FOUNDER.name,
      jobTitle: FOUNDER.jobTitle,
    },
    // Preencher depois com Instagram e LinkedIn reais
    sameAs: [] as string[],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: getSiteUrl(),
  };
}
