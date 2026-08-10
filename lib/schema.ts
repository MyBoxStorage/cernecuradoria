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
  const url = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${url}/#organization`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url,
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
      availableLanguage: ["Portuguese", "pt-BR"],
    },
    founder: {
      "@type": "Person",
      "@id": `${url}/#founder`,
      name: FOUNDER.name,
      jobTitle: FOUNDER.jobTitle,
    },
    // Preencher depois com Instagram e LinkedIn reais (ver FOUNDER.sameAs / redes da empresa)
    sameAs: [] as string[],
  };
}

export function websiteSchema() {
  const url = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    name: SITE_NAME,
    url,
    inLanguage: "pt-BR",
    publisher: {
      "@id": `${url}/#organization`,
    },
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
  const url = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${url}/#founder`,
    name: FOUNDER.name,
    jobTitle: FOUNDER.jobTitle,
    worksFor: {
      "@id": `${url}/#organization`,
    },
    description: FOUNDER.description,
    sameAs: [...FOUNDER.sameAs],
    url: `${url}/sobre`,
  };
}

export function blogPostingSchema(post: {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
}) {
  const url = `${getSiteUrl()}/blog/${post.slug}`;
  const author =
    post.author === FOUNDER.name
      ? {
          "@type": "Person" as const,
          name: FOUNDER.name,
          jobTitle: FOUNDER.jobTitle,
          url: `${getSiteUrl()}/sobre`,
        }
      : {
          "@type": "Person" as const,
          name: post.author,
        };

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
  };
}
