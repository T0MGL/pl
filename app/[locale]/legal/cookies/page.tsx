import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import Container from '@/components/ui/Container';

type Locale = 'es' | 'en' | 'de';

export const metadata: Metadata = {
  title: 'Cookie Policy — Park Lofts Paraguay',
  description: 'Cookie policy for Park Lofts Paraguay website.',
  robots: { index: false },
};

const copyByLocale = {
  es: {
    title: 'Política de Cookies',
    updated: 'Última actualización: febrero 2026',
    sections: [
      ['1. Qué son las cookies', 'Las cookies son archivos pequeños que ayudan a reconocer su navegador y mejorar la navegación.'],
      ['2. Qué cookies utilizamos', 'Utilizamos cookies técnicas y analíticas para funcionamiento y mejora del sitio.'],
      ['3. Gestión de cookies', 'Puede deshabilitarlas desde su navegador, lo que podría afectar funcionalidades.'],
      ['4. Contacto', 'Para más información utilice el formulario oficial de contacto.'],
    ],
  },
  en: {
    title: 'Cookie Policy',
    updated: 'Last update: February 2026',
    sections: [
      ['1. What cookies are', 'Cookies are small files that help recognize your browser and improve browsing.'],
      ['2. What cookies we use', 'We use technical and analytics cookies for site operation and improvement.'],
      ['3. Cookie management', 'You can disable cookies in your browser, which may affect functionality.'],
      ['4. Contact', 'For additional information, use the official contact form.'],
    ],
  },
  de: {
    title: 'Cookie-Richtlinie',
    updated: 'Letzte Aktualisierung: Februar 2026',
    sections: [
      ['1. Was Cookies sind', 'Cookies sind kleine Dateien, die Ihren Browser erkennen und die Nutzung verbessern.'],
      ['2. Welche Cookies wir nutzen', 'Wir verwenden technische und analytische Cookies für Betrieb und Optimierung der Website.'],
      ['3. Cookie-Verwaltung', 'Sie können Cookies im Browser deaktivieren, was Funktionen beeinträchtigen kann.'],
      ['4. Kontakt', 'Für weitere Informationen nutzen Sie bitte das offizielle Kontaktformular.'],
    ],
  },
} as const;

export default function CookiesPage({ params }: { params: { locale: string } }) {
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
