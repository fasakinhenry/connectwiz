export const SITE = {
  name: 'connectwiz',
  title: 'connectwiz — meet the right people, not just more people',
  description:
    'connectwiz is an AI-powered networking copilot. describe who you want to meet in plain language, get matched with real reasons why, and turn strangers into your next collaborator, mentor, or friend.',
  url: 'https://connectwiz.app',
  ogImage: '/og-image.svg',
  twitterHandle: '@connectwiz',
  themeColor: '#287bff',
};

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'connectwiz',
  url: SITE.url,
  logo: `${SITE.url}/favicon.svg`,
  sameAs: [
    'https://x.com/connectwiz',
    'https://instagram.com/connectwiz',
    'https://github.com/connectwiz',
  ],
};

export const siteNavigationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE.url}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'connectwiz',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1280',
  },
};
