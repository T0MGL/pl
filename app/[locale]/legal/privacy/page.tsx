import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import Container from '@/components/ui/Container';

type Locale = 'es' | 'en' | 'de';

export const metadata: Metadata = {
  title: 'Privacy Policy — Park Lofts Paraguay',
  description: 'Privacy policy and data handling statement of Park Lofts Paraguay.',
  robots: { index: false },
};

const copyByLocale = {
  es: {
    title: 'Política de Privacidad',
    updated: 'Última actualización: febrero 2026',
    sections: [
      ['1. Información que recopilamos', 'Recopilamos información que usted comparte voluntariamente a través de formularios de contacto del sitio.'],
      ['2. Uso de la información', 'Usamos los datos para responder consultas y brindar información comercial sobre proyectos y servicios.'],
      ['3. Protección de datos', 'La información se trata de forma confidencial y no se comparte con terceros sin base legal o consentimiento.'],
      ['4. Contacto', 'Para consultas sobre privacidad utilice el formulario oficial del sitio.'],
    ],
  },
  en: {
    title: 'Privacy Policy',
    updated: 'Last update: February 2026',
    sections: [
      ['1. Information we collect', 'We collect information that you voluntarily submit through website contact forms.'],
      ['2. Use of information', 'We use your data to respond to inquiries and provide information about projects and services.'],
      ['3. Data protection', 'Information is handled confidentially and is not shared with third parties without legal basis or consent.'],
      ['4. Contact', 'For privacy-related requests, please use the official website contact form.'],
    ],
  },
  de: {
    title: 'Datenschutzerklärung',
    updated: 'Letzte Aktualisierung: Februar 2026',
    sections: [
      ['1. Erhobene Informationen', 'Wir erfassen Informationen, die Sie freiwillig über Kontaktformulare auf der Website übermitteln.'],
      ['2. Verwendung der Informationen', 'Die Daten werden genutzt, um Anfragen zu beantworten und Informationen über Projekte und Dienstleistungen bereitzustellen.'],
      ['3. Datenschutz', 'Informationen werden vertraulich behandelt und ohne Rechtsgrundlage oder Einwilligung nicht an Dritte weitergegeben.'],
      ['4. Kontakt', 'Für Datenschutzanfragen nutzen Sie bitte das offizielle Kontaktformular der Website.'],
    ],
  },
} as const;

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  const locale = (['es', 'en', 'de'].includes(params.locale) ? params.locale : 'es') as Locale;
  setRequestLocale(locale);
  const copy = copyByLocale[locale];

  return (
    <section className="pt-36 pb-24">
      <Container narrow>
        <h1 className="font-display text-5xl font-light text-charcoal mb-4">{copy.title}</h1>
        <p className="eyebrow text-slate mb-12">{copy.updated}</p>

        <div className="prose prose-sm max-w-none font-body text-charcoal-600 space-y-6">
          {copy.sections.map(([title, body]) => (
            <div key={title}>
              <h2 className="font-display text-2xl font-light text-charcoal mt-10">{title}</h2>
              <p className="leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
