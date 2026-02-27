import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import ContactCTA from '@/components/sections/home/ContactCTA';
import FeaturedProjects from '@/components/sections/home/FeaturedProjects';
import HeroSection from '@/components/sections/home/HeroSection';
import InvestorTrustSection from '@/components/sections/home/InvestorTrustSection';
import PhilosophySection from '@/components/sections/home/PhilosophySection';
import StatsSection from '@/components/sections/home/StatsSection';
import StorytellingSection from '@/components/sections/home/StorytellingSection';
import { brandAssets } from '@/lib/brand';

interface HomePageProps {
  params: { locale: string };
}

const SITE_URL = 'https://www.parkloftsparaguay.com';

const metaByLocale: Record<string, { title: string; description: string; keywords: string[] }> = {
  es: {
    title: 'Park Lofts Paraguay — Apartamentos de Lujo e Inversión Inmobiliaria en Asunción',
    description:
      'Desarrolladora inmobiliaria premium en Paraguay. Apartamentos de lujo en Asunción con estándares alemanes para inversión en renta corta y residencial. Desde USD 40.000.',
    keywords: [
      'apartamentos de lujo asuncion',
      'inversión inmobiliaria paraguay',
      'desarrolladora inmobiliaria asuncion',
      'renta corta asuncion airbnb',
      'park lofts tower asuncion',
      'comprar apartamento asuncion',
      'inmobiliaria alemana paraguay',
      'departamentos recoleta asuncion',
    ],
  },
  en: {
    title: 'Park Lofts Paraguay — Luxury Apartments & Real Estate Investment in Asuncion',
    description:
      'Paraguay\'s fastest-growing premium real estate developer. Luxury apartments in Asuncion built to German standards for short-stay rental investment and residential use.',
    keywords: [
      'luxury apartments asuncion paraguay',
      'real estate investment paraguay',
      'buy apartment asuncion',
      'short stay rental investment paraguay',
      'park lofts paraguay',
      'asuncion property developer',
      'invest in paraguay',
      'german quality real estate paraguay',
    ],
  },
  de: {
    title: 'Park Lofts Paraguay — Luxuswohnungen & Immobilieninvestment in Asunción',
    description:
      'Das am schnellsten wachsende Premium-Immobilienunternehmen Paraguays. Luxuswohnungen in Asunción nach deutschen Standards für Kurzzeitvermietung und Wohnnutzung.',
    keywords: [
      'Luxuswohnungen Asuncion Paraguay',
      'Immobilieninvestment Paraguay',
      'Wohnung kaufen Asuncion',
      'Kurzzeitmiete Investment Paraguay',
      'Park Lofts Paraguay',
      'deutsche Qualität Immobilien Paraguay',
    ],
  },
  pt: {
    title: 'Park Lofts Paraguay — Apartamentos de Luxo e Investimento Imobiliário em Assunção',
    description:
      'A incorporadora imobiliária premium de maior crescimento do Paraguai. Apartamentos de luxo em Assunção com padrões alemães para investimento em aluguel de curta duração.',
    keywords: [
      'apartamentos de luxo assunção paraguai',
      'investimento imobiliário paraguai',
      'comprar apartamento assunção',
      'aluguel curta duração assunção',
      'park lofts paraguai',
      'incorporadora alemã paraguai',
    ],
  },
};

export async function generateMetadata({ params: { locale } }: HomePageProps): Promise<Metadata> {
  const meta = metaByLocale[locale] ?? metaByLocale.es;
  const canonical = locale === 'es' ? SITE_URL : `${SITE_URL}/${locale}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Park Lofts Paraguay — Desarrolladora Inmobiliaria de Lujo en Asunción',
        },
      ],
    },
    alternates: {
      canonical,
      languages: {
        es: SITE_URL,
        en: `${SITE_URL}/en`,
        de: `${SITE_URL}/de`,
        pt: `${SITE_URL}/pt`,
        'x-default': SITE_URL,
      },
    },
  };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  setRequestLocale(locale);
  const tHero = await getTranslations({ locale, namespace: 'home.hero' });
  const tStorytelling = await getTranslations({ locale, namespace: 'home.storytelling' });
  const tProjects = await getTranslations({ locale, namespace: 'home.projects' });
  const tPhilosophy = await getTranslations({ locale, namespace: 'home.philosophy' });
  const tStats = await getTranslations({ locale, namespace: 'home.stats' });
  const tInvestors = await getTranslations({ locale, namespace: 'home.investors' });
  const tContact = await getTranslations({ locale, namespace: 'home.contact' });

  return (
    <>
      {/* LocalBusiness schema — enhances local SEO and Google Business Panel */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['RealEstateAgent', 'LocalBusiness'],
            '@id': `${SITE_URL}/#localbusiness`,
            name: 'Park Lofts Paraguay',
            description:
              locale === 'de'
                ? 'Das am schnellsten wachsende Premium-Immobilienunternehmen Paraguays. Luxuswohnungen in Asunción nach deutschen Standards.'
                : locale === 'en'
                  ? "Paraguay's fastest-growing premium real estate developer. Luxury apartments in Asuncion built to German standards."
                  : locale === 'pt'
                    ? 'A incorporadora imobiliária premium de maior crescimento do Paraguai. Apartamentos de luxo em Assunção com padrões alemães.'
                    : 'Desarrolladora inmobiliaria premium en Paraguay. Apartamentos de lujo en Asunción con estándares alemanes para inversión en renta corta y residencial.',
            url: SITE_URL,
            logo: brandAssets.logoGold,
            image: `${SITE_URL}/og-image.jpg`,
            priceRange: 'USD 40.000 – 250.000',
            currenciesAccepted: 'USD, PYG',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Asunción',
              addressRegion: 'Capital',
              addressCountry: 'PY',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: -25.2867,
              longitude: -57.6470,
            },
            telephone: '+595-981-587-588',
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '18:00',
              },
            ],
            foundingDate: '2024',
            numberOfEmployees: { '@type': 'QuantitativeValue', value: 15 },
            parentOrganization: { '@id': `${SITE_URL}/#organization` },
          }),
        }}
      />

      {/* FAQPage schema — enables rich result FAQ expandables directly in Google search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity:
              locale === 'en'
                ? [
                    {
                      '@type': 'Question',
                      name: 'Why invest in real estate in Paraguay?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: "Paraguay is the #1 fastest-growing tourist destination (UN Tourism Q1 2025) and #1 fastest-growing city for remote work (Nomad List 2025). With low entry prices and high Airbnb occupancy rates in Asuncion, it's one of Latin America's best real estate investment opportunities.",
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'What is the minimum investment for a Park Lofts apartment?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Park Lofts studio apartments start from approximately USD 40,000. Our units are designed for short-stay rental (Airbnb/Booking.com) with high rental yields in Asuncion.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'What rental returns can I expect from a Park Lofts apartment?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Our apartments are optimized for short-stay rental platforms like Airbnb and Booking.com in Asuncion. Returns depend on unit size, location and occupancy; our team provides detailed financial projections for each active project.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Is Park Lofts Paraguay a reliable developer?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: "Park Lofts has delivered multiple sold-out projects in Asuncion — Park Lofts Airport, Residencias del Sol, and The Lofts Los Arboles — all delivered on time and to standard. We are AHK Mercosur members (German-Paraguayan Chamber of Commerce) and maintain a transparent investor relations program.",
                      },
                    },
                  ]
                : locale === 'de'
                  ? [
                      {
                        '@type': 'Question',
                        name: 'Warum in Immobilien in Paraguay investieren?',
                        acceptedAnswer: {
                          '@type': 'Answer',
                          text: 'Paraguay ist das #1-Reiseziel mit dem stärksten Wachstum (UN Tourism Q1 2025) und die #1-Stadt für Remote-Arbeit weltweit (Nomad List 2025). Mit niedrigen Einstiegspreisen und hoher Airbnb-Auslastung in Asunción bietet Paraguay eine der besten Immobilienmöglichkeiten Lateinamerikas.',
                        },
                      },
                      {
                        '@type': 'Question',
                        name: 'Was ist das Mindestinvestment für eine Park Lofts Wohnung?',
                        acceptedAnswer: {
                          '@type': 'Answer',
                          text: 'Park Lofts Studio-Apartments starten bei ca. USD 40.000. Die Einheiten sind auf Kurzzeitvermietung (Airbnb/Booking.com) mit hohen Mietrenditen in Asunción ausgelegt.',
                        },
                      },
                      {
                        '@type': 'Question',
                        name: 'Welche Mietrenditen sind mit Park Lofts Wohnungen zu erwarten?',
                        acceptedAnswer: {
                          '@type': 'Answer',
                          text: 'Unsere Apartments sind für Buchungsplattformen wie Airbnb und Booking.com in Asunción optimiert. Die Renditen hängen von Einheitsgröße, Lage und Auslastung ab. Unser Team stellt detaillierte Finanzprognosen für jedes aktive Projekt bereit.',
                        },
                      },
                    ]
                  : [
                      {
                        '@type': 'Question',
                        name: '¿Por qué invertir en bienes raíces en Paraguay?',
                        acceptedAnswer: {
                          '@type': 'Answer',
                          text: 'Paraguay es el #1 destino de mayor crecimiento turístico internacional (UN Tourism Q1 2025) y la #1 ciudad de mayor crecimiento para trabajo remoto en el mundo (Nomad List 2025). Con precios de entrada bajos y alta ocupación en Airbnb en Asunción, es una de las mejores oportunidades de inversión inmobiliaria en Latinoamérica.',
                        },
                      },
                      {
                        '@type': 'Question',
                        name: '¿Cuál es la inversión mínima para un apartamento Park Lofts?',
                        acceptedAnswer: {
                          '@type': 'Answer',
                          text: 'Los estudios Park Lofts parten desde aproximadamente USD 40.000. Nuestras unidades están diseñadas para renta corta (Airbnb/Booking.com) con altos rendimientos de alquiler en Asunción.',
                        },
                      },
                      {
                        '@type': 'Question',
                        name: '¿Qué rendimiento de alquiler puedo esperar de un apartamento Park Lofts?',
                        acceptedAnswer: {
                          '@type': 'Answer',
                          text: 'Nuestros apartamentos están optimizados para plataformas de renta corta como Airbnb y Booking.com en Asunción. Los retornos dependen del tamaño de la unidad, la ubicación y la ocupación. Nuestro equipo proporciona proyecciones financieras detalladas para cada proyecto activo.',
                        },
                      },
                      {
                        '@type': 'Question',
                        name: '¿Es Park Lofts Paraguay una desarrolladora confiable?',
                        acceptedAnswer: {
                          '@type': 'Answer',
                          text: 'Park Lofts ha entregado múltiples proyectos agotados en Asunción — Park Lofts Airport, Residencias del Sol y The Lofts Los Árboles — todos entregados en plazo y estándar. Somos miembros de AHK Mercosur (Cámara de Comercio Paraguayo-Alemana) y mantenemos un programa de relaciones con inversores transparente.',
                        },
                      },
                    ],
          }),
        }}
      />

      <HeroSection
        locale={locale}
        t={{
          eyebrow: tHero('eyebrow'),
          headline: tHero('headline'),
          subheadline: tHero('subheadline'),
          cta: tHero('cta'),
          ctaSecondary: tHero('ctaSecondary'),
          scrollLabel: tHero('scrollLabel'),
          metaLocation: tHero('metaLocation'),
          metaProjects: tHero('metaProjects'),
          metaSince: tHero('metaSince'),
        }}
      />

      <StorytellingSection
        t={{
          eyebrow: tStorytelling('eyebrow'),
          headline: tStorytelling('headline'),
          body: tStorytelling('body'),
          stat1Value: tStorytelling('stat1Value'),
          stat1Label: tStorytelling('stat1Label'),
          stat2Value: tStorytelling('stat2Value'),
          stat2Label: tStorytelling('stat2Label'),
          stat3Value: tStorytelling('stat3Value'),
          stat3Label: tStorytelling('stat3Label'),
          imageAlt: tStorytelling('imageAlt'),
          floatingLabel: tStorytelling('floatingLabel'),
        }}
      />

      <FeaturedProjects
        locale={locale}
        t={{
          eyebrow: tProjects('eyebrow'),
          headline: tProjects('headline'),
          viewAll: tProjects('viewAll'),
          statusSelling: tProjects('statusSelling'),
          statusConstruction: tProjects('statusConstruction'),
          statusDelivered: tProjects('statusDelivered'),
        }}
      />

      <PhilosophySection
        t={{
          eyebrow: tPhilosophy('eyebrow'),
          headline: tPhilosophy('headline'),
          pillar1Title: tPhilosophy('pillar1Title'),
          pillar1Body: tPhilosophy('pillar1Body'),
          pillar2Title: tPhilosophy('pillar2Title'),
          pillar2Body: tPhilosophy('pillar2Body'),
          pillar3Title: tPhilosophy('pillar3Title'),
          pillar3Body: tPhilosophy('pillar3Body'),
        }}
      />

      <StatsSection
        t={{
          eyebrow: tStats('eyebrow'),
          headline: tStats('headline'),
          stat1Value: tStats('stat1Value'),
          stat1Label: tStats('stat1Label'),
          stat2Value: tStats('stat2Value'),
          stat2Label: tStats('stat2Label'),
          stat3Value: tStats('stat3Value'),
          stat3Label: tStats('stat3Label'),
          stat4Value: tStats('stat4Value'),
          stat4Label: tStats('stat4Label'),
        }}
      />

      <InvestorTrustSection
        locale={locale}
        t={{
          eyebrow: tInvestors('eyebrow'),
          headline: tInvestors('headline'),
          body: tInvestors('body'),
          cta: tInvestors('cta'),
          trustItem1: tInvestors('trustItem1'),
          trustItem2: tInvestors('trustItem2'),
          trustItem3: tInvestors('trustItem3'),
          trustItem4: tInvestors('trustItem4'),
          metricLabel: tInvestors('metricLabel'),
          platformsTitle: tInvestors('platformsTitle'),
          brokerageTitle: tInvestors('brokerageTitle'),
          badgeTitle: tInvestors('badgeTitle'),
          badgeBody: tInvestors('badgeBody'),
        }}
      />

      <ContactCTA
        locale={locale}
        t={{
          eyebrow: tContact('eyebrow'),
          headline: tContact('headline'),
          body: tContact('body'),
          cta: tContact('cta'),
          ctaSecondary: tContact('ctaSecondary'),
        }}
      />
    </>
  );
}
