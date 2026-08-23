import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Hero, LogoCloud, Features, HowItWorks, Community, Testimonials, CTA } from './sections';
import { SITE, organizationJsonLd, siteNavigationJsonLd, softwareAppJsonLd } from '@/lib/seo';

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>{SITE.title}</title>
        <meta name="description" content={SITE.description} />
        <link rel="canonical" href={SITE.url} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE.url} />
        <meta property="og:title" content={SITE.title} />
        <meta property="og:description" content={SITE.description} />
        <meta property="og:image" content={`${SITE.url}${SITE.ogImage}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={SITE.twitterHandle} />
        <meta name="twitter:title" content={SITE.title} />
        <meta name="twitter:description" content={SITE.description} />
        <meta name="twitter:image" content={`${SITE.url}${SITE.ogImage}`} />

        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(siteNavigationJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(softwareAppJsonLd)}</script>
      </Helmet>

      <Navbar />
      <main className='mb-24'>
        <Hero />
        <LogoCloud />
        <Features />
        <HowItWorks />
        <Community />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
