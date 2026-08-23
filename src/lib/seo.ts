export const SITE = {
  name: 'streakme',
  title: 'streakme — build consistency together',
  description:
    'streakme is the social streak platform for anything you want to stay consistent at. track your streak, post your progress daily, and grow with people on the same journey.',
  url: 'https://streakme.app',
  ogImage: '/og-image.svg',
  twitterHandle: '@streakme',
  themeColor: '#287bff',
};

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'streakme',
  url: SITE.url,
  logo: `${SITE.url}/favicon.svg`,
  sameAs: [
    'https://x.com/streakme',
    'https://instagram.com/streakme',
    'https://github.com/streakme',
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
  name: 'streakme',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Web, iOS, Android',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '2140',
  },
};
