import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import Container from '@/components/ui/Container';

type Locale = 'es' | 'en' | 'de';

export const metadata: Metadata = {
  title: 'Terms and Conditions — Park Lofts Paraguay',
  description: 'Terms and conditions for use of the Park Lofts Paraguay website.',
  robots: { index: false },
};

const copyByLocale = {
  es: {
    title: 'Términos y Condiciones',
    updated: 'Última actualización: febrero 2026',
    sections: [
      ['1. Uso del sitio', 'El contenido del sitio es informativo y puede actualizarse sin previo aviso.'],
      ['2. Propiedad intelectual', 'La reproducción total o parcial de contenidos requiere autorización escrita.'],
      ['3. Limitación de responsabilidad', 'No garantizamos ausencia absoluta de errores, aunque mantenemos actualización continua.'],
      ['4. Consultas', 'Para consultas legales o comerciales utilice el formulario oficial de contacto.'],
    ],
  },
  en: {
    title: 'Terms and Conditions',
    updated: 'Last update: February 2026',
    sections: [
      ['1. Website use', 'Website content is informational and may be updated without prior notice.'],
      ['2. Intellectual property', 'Full or partial reproduction of content requires written authorization.'],
      ['3. Limitation of liability', 'We do not guarantee absolute absence of errors, while we continuously maintain and update the site.'],
      ['4. Inquiries', 'For legal or commercial inquiries, please use the official contact form.'],
    ],
  },
  de: {
    title: 'Nutzungsbedingungen',
    updated: 'Letzte Aktualisierung: Februar 2026',
    sections: [
      ['1. Nutzung der Website', 'Die Inhalte sind informativ und können ohne vorherige Ankündigung aktualisiert werden.'],
      ['2. Geistiges Eigentum', 'Die vollständige oder teilweise Vervielfältigung von Inhalten erfordert eine schriftliche Genehmigung.'],
      ['3. Haftungsbeschränkung', 'Wir garantieren keine absolute Fehlerfreiheit, pflegen und aktualisieren die Website jedoch fortlaufend.'],
      ['4. Anfragen', 'Für rechtliche oder kommerzielle Anfragen verwenden Sie bitte das offizielle Kontaktformular.'],
    ],
  },
} as const;

export default function TermsPage({ params }: { params: { locale: string } }) {
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
