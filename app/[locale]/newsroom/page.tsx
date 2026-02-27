import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import FadeIn from '@/components/animations/FadeIn';
import { TextReveal } from '@/components/animations/ScrollReveal';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { newsroomArticles, type NewsContent } from '@/lib/content';

type Locale = 'es' | 'en' | 'de';

export const metadata: Metadata = {
  title: 'Newsroom — Park Lofts Paraguay',
  description: 'News and updates from Park Lofts Paraguay.',
};

const copyByLocale = {
  es: {
    eyebrow: 'Newsroom',
    headline: 'Noticias y actualizaciones\ndel portafolio Park Lofts',
    readMore: 'Leer más',
    read: 'Leer',
    min: 'min',
  },
  en: {
    eyebrow: 'Newsroom',
    headline: 'News and updates\nfrom the Park Lofts portfolio',
    readMore: 'Read more',
    read: 'Read',
    min: 'min',
  },
  de: {
    eyebrow: 'Newsroom',
    headline: 'Neuigkeiten und Updates\naus dem Park-Lofts-Portfolio',
    readMore: 'Weiterlesen',
    read: 'Lesen',
    min: 'Min',
  },
} as const;

const articleTranslations = {
  'palada-inicial-residencias-del-sol': {
    en: {
      title: 'Residencias del Sol groundbreaking: the start of a landmark project',
      excerpt: 'The groundbreaking ceremony brought together the team, partners and investors to officially launch one of Park Lofts most representative projects.',
    },
    de: {
      title: 'Spatenstich für Residencias del Sol: der Beginn eines wegweisenden Projekts',
      excerpt: 'Die Zeremonie brachte Team, Partner und Investoren zusammen, um eines der bedeutendsten Projekte von Park Lofts offiziell zu starten.',
    },
  },
  'progreso-park-lofts-airport': {
    en: { title: 'Park Lofts Airport enters its final development phase', excerpt: 'The project officially transitions to its closing stage, with focus on operational readiness and coordinating unit delivery to investors.' },
    de: { title: 'Park Lofts Airport tritt in die finale Entwicklungsphase ein', excerpt: 'Das Projekt wechselt offiziell in die Abschlussphase mit Fokus auf operativer Vorbereitung und Koordination der Übergabe an Investoren.' },
  },
  'progreso-park-lofts-recoleta': {
    en: { title: 'Construction update: Park Lofts Recoleta', excerpt: 'New execution milestones in one of the key active projects in our portfolio.' },
    de: { title: 'Baufortschritt: Park Lofts Recoleta', excerpt: 'Neue Meilensteine bei einem der wichtigsten aktiven Projekte im Portfolio.' },
  },
  'ubicacion-premium-park-lofts-tower': {
    en: { title: 'Premium location: Park Lofts Tower', excerpt: 'Why Asuncion corporate axis remains a strategic location for real estate investment.' },
    de: { title: 'Premium-Lage: Park Lofts Tower', excerpt: 'Warum die Corporate-Achse von Asuncion ein strategischer Investmentstandort bleibt.' },
  },
  'modelo-de-inversion-park-lofts': {
    en: { title: 'Park Lofts investment model: short-stay income and capital value', excerpt: "A practical overview of our product and investment approach for today's investor." },
    de: { title: 'Investmentmodell von Park Lofts: Kurzzeitmiete und Kapitalwert', excerpt: 'Ein praxisnaher Überblick über Produkt- und Investmentansatz für heutige Investoren.' },
  },
  'track-record-y-proyectos-vendidos': {
    en: { title: 'Track record and sold projects: a foundation for consistent growth', excerpt: 'How Park Lofts historical performance supports the current portfolio expansion.' },
    de: { title: 'Track Record und verkaufte Projekte: Basis für konstantes Wachstum', excerpt: 'Wie die historische Performance von Park Lofts die aktuelle Expansion unterstützt.' },
  },
  'actualizacion-obra-recoleta-febrero-2026': {
    en: { title: 'Construction update: Park Lofts Recoleta targets record delivery in July 2026', excerpt: 'According to the current schedule, construction firm Concremaq expects Park Lofts Recoleta to be completed by early July 2026 — a record speed for Paraguay.' },
    de: { title: 'Baufortschritt: Park Lofts Recoleta — Rekordfertigstellung im Juli 2026', excerpt: 'Dem aktuellen Zeitplan zufolge rechnet das Bauunternehmen Concremaq mit der Fertigstellung von Park Lofts Recoleta Anfang Juli 2026 — Rekordgeschwindigkeit für Paraguay.' },
  },
  'park-lofts-tower-redefining-luxury-urban-living': {
    en: { title: 'Asuncion Times: "Park Lofts Tower redefines luxury urban living in Asuncion"', excerpt: 'Paraguay\'s leading English-language outlet published an in-depth feature on Park Lofts Tower, highlighting climate-responsive design, German construction standards and hospitality-grade amenities.' },
    de: { title: 'Asuncion Times: "Park Lofts Tower definiert urbanes Luxuswohnen in Asuncion neu"', excerpt: 'Paraguays führendes englischsprachiges Medium veröffentlichte ein umfassendes Porträt über Park Lofts Tower — klimaresponsive Architektur, deutsche Baustandards und Hospitality-Amenities.' },
  },
  'forbes-park-lofts-nuevo-hito-real-estate': {
    en: { title: 'Forbes Paraguay: "Park Lofts sets a new milestone in local real estate with a US$ 10 million project"', excerpt: 'Forbes Paraguay published a feature on the Park Lofts Tower launch, highlighting the US$ 10 million investment, over 230 units sold in under a year, and the brand\'s first integrated hotel.' },
    de: { title: 'Forbes Paraguay: "Park Lofts setzt neuen Meilenstein im lokalen Immobilienmarkt mit US$ 10 Mio. Projekt"', excerpt: 'Forbes Paraguay berichtete über den Launch von Park Lofts Tower — US$ 10 Mio. Investition, über 230 verkaufte Einheiten in weniger als einem Jahr und das erste integrierte Hotel der Marke.' },
  },
  'proyecta-inversion-europea-real-estate-paraguay': {
    en: { title: 'Proyecta: "European investment and innovative vision to transform real estate in Paraguay"', excerpt: 'The architecture and construction trade publication covered Park Lofts\' business model: temporary rental focus with 85%+ occupancy and double-digit projected returns.' },
    de: { title: 'Proyecta: "Europäische Investition und innovative Vision für die Transformation des Immobilienmarkts in Paraguay"', excerpt: 'Die Fachzeitschrift für Architektur und Bauwesen berichtete über das Geschäftsmodell von Park Lofts: Kurzzeitmietfokus mit über 85% Auslastung und zweistelligen Renditeprognosen.' },
  },
  'the-nomad-tax-real-estate-investment-paraguay': {
    en: { title: 'The Nomad Tax: Park Lofts Tower as a real estate investment case study in Paraguay', excerpt: 'The international expat and investor platform featured Park Lofts Tower as an investment ecosystem — not just a building — in its Paraguay real estate guide.' },
    de: { title: 'The Nomad Tax: Park Lofts Tower als Fallstudie für Immobilieninvestment in Paraguay', excerpt: 'Die internationale Expat- und Investorenplattform stellte Park Lofts Tower als Investment-Ökosystem vor — nicht nur ein Gebäude — in ihrem Paraguay-Immobilienguide.' },
  },
  'have-your-adventure-airbnb-studios-asuncion': {
    en: { title: 'Have Your ADVENTURE: "Affordable investment in Paraguay — Airbnb Studios in Asuncion"', excerpt: 'The international travel and investment blog published a detailed analysis of the Park Lofts Recoleta model, with rental projections and return comparisons.' },
    de: { title: 'Have Your ADVENTURE: "Erschwingliche Investition in Paraguay — Airbnb-Studios in Asuncion"', excerpt: 'Der internationale Reise- und Investmentblog veröffentlichte eine detaillierte Analyse des Park Lofts Recoleta Modells mit Mietprognosen und Renditeanalysen.' },
  },
  'infonegocios-park-lofts-recoleta-inversion': {
    en: { title: 'Infonegocios: "Park Lofts rises in Recoleta with a US$ 3 million investment — high-yield minimalism"', excerpt: 'Infonegocios Paraguay covered Park Lofts Recoleta: a 10-story building with 89 studios in Asuncion\'s most sought-after neighbourhood, backed by US$ 3 million in investment and premium rooftop amenities.' },
    de: { title: 'Infonegocios: \"Park Lofts entsteht in Recoleta mit US$ 3 Mio. Investition — hochrentables Minimalismus-Konzept\"', excerpt: 'Infonegocios Paraguay berichtete über Park Lofts Recoleta: ein 10-stöckiges Gebäude mit 89 Studios im gefragtesten Viertel Asuncions, mit US$ 3 Mio. Investition und Premium-Rooftop-Amenities.' },
  },
} as const;

const categoryByLocale = {
  es: { Proyectos: 'Proyectos', Mercado: 'Mercado', Empresa: 'Empresa', Noticias: 'Noticias' },
  en: { Proyectos: 'Projects', Mercado: 'Market', Empresa: 'Company', Noticias: 'News' },
  de: { Proyectos: 'Projekte', Mercado: 'Markt', Empresa: 'Unternehmen', Noticias: 'News' },
} as const;

const categoryColors: Record<string, string> = {
  Proyectos: 'text-gold border-gold',
  Mercado: 'text-slate border-slate',
  Empresa: 'text-charcoal border-charcoal',
  Noticias: 'text-gold border-gold',
};

function formatDate(dateStr: string, locale: Locale) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(locale === 'es' ? 'es-PY' : locale === 'de' ? 'de-DE' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function localizeArticle(article: (typeof newsroomArticles)[number], locale: Locale) {
  if (locale === 'es') return article;
  const translated = articleTranslations[article.slug as keyof typeof articleTranslations]?.[locale];
  if (!translated) return article;
  return { ...article, ...translated };
}

export default function NewsroomPage({ params }: { params: { locale: string } }) {
  const locale = (['es', 'en', 'de'].includes(params.locale) ? params.locale : 'es') as Locale;
  const copy = copyByLocale[locale];

  const articles = newsroomArticles.map((article) => localizeArticle(article, locale));
  const featured = articles.find((article) => article.featured);
  const rest = articles.filter((article) => !article.featured);

  return (
    <>
      <section className="pt-36 pb-16 bg-cream">
        <Container>
          <FadeIn>
            <Eyebrow withLine className="mb-8">{copy.eyebrow}</Eyebrow>
          </FadeIn>
          <TextReveal text={copy.headline} as="h1" className="font-display text-hero font-light text-charcoal" delay={0.1} />
        </Container>
      </section>

      {featured && (
        <section className="pb-16 bg-cream">
          <Container>
            <Link href={`/${params.locale}/newsroom/${featured.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-stone overflow-hidden hover:border-gold transition-colors duration-400">
                <div className="lg:col-span-7 img-zoom-wrapper relative aspect-[16/9] lg:aspect-auto overflow-hidden bg-stone">
                  <Image src={featured.image} alt={featured.title} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
                </div>
                <div className="lg:col-span-5 flex flex-col justify-center p-10 lg:p-14 bg-white">
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`badge border ${categoryColors[featured.category] || 'text-slate border-slate'}`}>
                      {categoryByLocale[locale][featured.category]}
                    </span>
                    {(featured as NewsContent).source && (
                      <span className="badge border border-gold/40 text-gold bg-gold/5">
                        {(featured as NewsContent).source}
                      </span>
                    )}
                    <span className="font-body text-xs text-slate">{featured.readingTime} {copy.min}</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal mb-4 group-hover:text-gold transition-colors duration-300 leading-snug">{featured.title}</h2>
                  <p className="font-body text-sm text-slate leading-relaxed mb-8">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs text-slate">{formatDate(featured.publishedAt, locale)}</span>
                    <span className="font-body text-xs uppercase tracking-widest text-gold group-hover:underline">{copy.readMore} →</span>
                  </div>
                </div>
              </div>
            </Link>
          </Container>
        </section>
      )}

      <section className="section-py bg-cream-100">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((article, i) => (
              <FadeIn key={article.id} delay={i * 0.08}>
                <Link href={`/${params.locale}/newsroom/${article.slug}`} className="card-project group block bg-white">
                  <div
                    className={`${(article as NewsContent).imageFit === 'contain' ? '' : 'img-zoom-wrapper'} relative aspect-[16/9] overflow-hidden`}
                    style={{ backgroundColor: (article as NewsContent).imageBg ?? undefined }}
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={(article as NewsContent).imageFit === 'contain' ? 'object-contain p-8' : 'object-cover'}
                    />
                  </div>
                  <div className="p-7">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className={`badge border ${categoryColors[article.category] || 'text-slate border-slate'}`}>
                        {categoryByLocale[locale][article.category]}
                      </span>
                      {(article as NewsContent).source && (
                        <span className="badge border border-gold/40 text-gold bg-gold/5">
                          {(article as NewsContent).source}
                        </span>
                      )}
                      <span className="font-body text-xs text-slate">{article.readingTime} {copy.min}</span>
                    </div>
                    <h3 className="font-display text-xl font-light text-charcoal mb-3 group-hover:text-gold transition-colors duration-300 leading-snug">{article.title}</h3>
                    <p className="font-body text-sm text-slate leading-relaxed mb-5 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between border-t border-stone pt-4">
                      <span className="font-body text-xs text-slate">{formatDate(article.publishedAt, locale)}</span>
                      <span className="font-body text-xs text-gold uppercase tracking-widest">{copy.read} →</span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
