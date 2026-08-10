import {
  FOUNDER,
  NEIGHBORHOODS_BARRA,
  NEIGHBORHOODS_ZONA_SUL,
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

export function serviceSchema() {
  const neighborhoods = [
    ...NEIGHBORHOODS_ZONA_SUL,
    ...NEIGHBORHOODS_BARRA,
  ];

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Curadoria e Esvaziamento de Espólios",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
    areaServed: [
      { "@type": "City", name: "Rio de Janeiro" },
      ...neighborhoods.map((name) => ({
        "@type": "Place",
        name,
      })),
    ],
    serviceType: "Curadoria de espólio",
  };
}
