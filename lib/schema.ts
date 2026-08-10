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
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${WHATSAPP_PHONE}`,
      contactType: "customer service",
      areaServed: "BR",
      availableLanguage: "Portuguese",
    },
    founder: {
      "@type": "Person",
      name: FOUNDER.name,
      jobTitle: FOUNDER.jobTitle,
    },
    // Preencher depois com Instagram e LinkedIn reais (ver FOUNDER.sameAs / redes da empresa)
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

export function faqPageSchema(
  items: readonly { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbListSchema(
  crumbs: readonly { name: string; path: string }[],
) {
  const base = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${base}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: FOUNDER.name,
    jobTitle: FOUNDER.jobTitle,
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
    description: FOUNDER.description,
    sameAs: [...FOUNDER.sameAs],
  };
}
