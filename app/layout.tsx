import type { Metadata } from 'next';

import { cormorant, dmMono, dmSans } from '@/lib/fonts';

import './globals.css';

const SITE_URL = 'https://www.parkloftsparaguay.com';
const LOGO_URL = 'https://pub-70473ebb629c4efb93b99bf2e83117da.r2.dev/logo/park-lofts-logogold.png';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Park Lofts Paraguay — Desarrolladora Inmobiliaria de Lujo en Asunción',
    template: '%s | Park Lofts Paraguay',
  },
  description:
    'Desarrolladora inmobiliaria premium en Paraguay. Apartamentos de lujo en Asunción con estándares alemanes para inversión en renta corta y residencial. Proyectos en Recoleta, Eje Corporativo y más.',
  keywords: [
    'inmobiliaria paraguay',
    'apartamentos de lujo asuncion',
    'inversión inmobiliaria paraguay',
    'desarrolladora inmobiliaria asuncion',
    'apartamentos en venta asuncion',
    'renta corta asuncion',
    'airbnb asuncion inversión',
    'park lofts paraguay',
    'real estate paraguay',
    'luxury apartments paraguay',
    'invest in paraguay real estate',
    'asuncion property investment',
    'departamentos recoleta asuncion',
    'inmobiliaria alemania paraguay',
  ],
  authors: [{ name: 'Park Lofts Paraguay', url: SITE_URL }],
  creator: 'Park Lofts Paraguay',
  publisher: 'Park Lofts Paraguay S.A.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PY',
    alternateLocale: ['en_US', 'de_DE', 'pt_BR'],
    siteName: 'Park Lofts Paraguay',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Park Lofts Paraguay — Desarrolladora Inmobiliaria de Lujo en Asunción',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@parkloftspar',
    site: '@parkloftspar',
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'es': SITE_URL,
      'en': `${SITE_URL}/en`,
      'de': `${SITE_URL}/de`,
      'pt': `${SITE_URL}/pt`,
      'x-default': SITE_URL,
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  },
};

// Global JSON-LD: Organization + WebSite schemas
// These are in <head> — invisible to users, read by Google to understand entity relationships.
// sameAs = authoritative cross-references that reinforce domain trust (E-E-A-T signal).
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Park Lofts Paraguay',
  alternateName: ['Park Lofts', 'Park Lofts PY'],
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL,
    width: 320,
    height: 80,
  },
  description:
    'Desarrolladora inmobiliaria premium en Paraguay. Apartamentos de lujo en Asunción con estándares alemanes para inversión en renta corta y residencial.',
  foundingDate: '2024',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Asunción',
    addressRegion: 'Capital',
    addressCountry: 'PY',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+595-981-587-588',
    contactType: 'sales',
    availableLanguage: ['Spanish', 'English', 'German', 'Portuguese'],
    areaServed: 'PY',
  },
  // sameAs: cross-references to authoritative profiles Google uses to verify and trust the entity
  sameAs: [
    'https://www.instagram.com/parkloftsparaguay/',
    'https://www.linkedin.com/company/park-lofts-paraguay/',
    'https://www.facebook.com/parkloftsparaguay',
    'https://www.airbnb.com',
    'https://www.booking.com',
  ],
};

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Park Lofts Paraguay',
  url: SITE_URL,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: ['es', 'en', 'de', 'pt'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/projects?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Entity schemas — not visible to users, indexed by search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body className="bg-cream text-charcoal antialiased">{children}</body>
    </html>
  );
}
