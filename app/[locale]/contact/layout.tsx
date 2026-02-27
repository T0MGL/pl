import type { Metadata } from 'next';

// Metadata for the contact page lives here because contact/page.tsx is a client component
// and Next.js App Router does not allow metadata exports from client components.

const SITE_URL = 'https://www.parkloftsparaguay.com';

const contactMetaByLocale: Record<string, { title: string; description: string; keywords: string[] }> = {
  es: {
    title: 'Contacto — Park Lofts Paraguay | Asesoría de Inversión Inmobiliaria',
    description:
      'Contactá al equipo de Park Lofts Paraguay para consultas de inversión, proyectos residenciales y asesoría personalizada. Respondemos en 24 horas hábiles.',
    keywords: [
      'contacto park lofts paraguay',
      'asesoría inversión inmobiliaria asuncion',
      'comprar apartamento asuncion contacto',
      'inversión paraguay contacto',
      'inmobiliaria asuncion telefono',
    ],
  },
  en: {
    title: 'Contact — Park Lofts Paraguay | Real Estate Investment Advisory',
    description:
      'Contact the Park Lofts Paraguay team for investment inquiries, residential projects and personalized advisory. We respond within 24 business hours.',
    keywords: [
      'contact park lofts paraguay',
      'real estate investment advisory asuncion',
      'buy apartment asuncion contact',
      'paraguay investment contact',
      'asuncion property developer contact',
    ],
  },
  de: {
    title: 'Kontakt — Park Lofts Paraguay | Immobilieninvestment Beratung',
    description:
      'Kontaktieren Sie das Park Lofts Paraguay Team für Investment-Anfragen, Wohnprojekte und persönliche Beratung. Wir antworten innerhalb von 24 Werktunden.',
    keywords: [
      'Kontakt Park Lofts Paraguay',
      'Immobilieninvestment Beratung Asuncion',
      'Wohnung kaufen Asuncion Kontakt',
      'Paraguay Immobilien Kontakt',
    ],
  },
  pt: {
    title: 'Contato — Park Lofts Paraguay | Assessoria de Investimento Imobiliário',
    description:
      'Entre em contato com a equipe da Park Lofts Paraguay para consultas de investimento, projetos residenciais e assessoria personalizada.',
    keywords: [
      'contato park lofts paraguai',
      'assessoria investimento imobiliário assunção',
      'comprar apartamento assunção contato',
      'paraguai investimento contato',
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale in contactMetaByLocale ? params.locale : 'es';
  const meta = contactMetaByLocale[locale];
  const canonical = locale === 'es' ? `${SITE_URL}/contact` : `${SITE_URL}/${locale}/contact`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
    },
    alternates: {
      canonical,
      languages: {
        es: `${SITE_URL}/contact`,
        en: `${SITE_URL}/en/contact`,
        de: `${SITE_URL}/de/contact`,
        pt: `${SITE_URL}/pt/contact`,
        'x-default': `${SITE_URL}/contact`,
      },
    },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
