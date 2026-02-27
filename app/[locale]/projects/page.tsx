'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import FadeIn from '@/components/animations/FadeIn';
import { TextReveal } from '@/components/animations/ScrollReveal';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { projects } from '@/lib/content';
import { partnerAssets } from '@/lib/partners';

const filters = ['all', 'residential', 'commercial', 'mixed'] as const;
type Filter = (typeof filters)[number];

type Locale = 'es' | 'en' | 'de';

const copyByLocale = {
  en: {
    eyebrow: 'Portfolio',
    headline: 'Projects that combine\ndesign, location\nand investment vision',
    body: 'We develop urban assets in Asuncion focused on build quality, efficient operation, and long-term capital value.',
    status: {
      selling: 'For sale',
      'pre-construction': 'Pre-construction',
      construction: 'Under construction',
      delivered: 'Delivered',
      upcoming: 'Coming soon',
    },
    filters: {
      all: 'All',
      residential: 'Residential',
      commercial: 'Commercial',
      mixed: 'Mixed use',
    },
    floors: 'floors',
    cardSummary: {
      selling: 'Active investment opportunity in a high-demand urban corridor.',
      'pre-construction': 'Reserve your unit now — before construction begins.',
      construction: 'Project in execution with strategic location and premium positioning.',
      delivered: 'Delivered project with availability in resale market.',
      upcoming: 'Project announced for upcoming development phases.',
    },
    trustTitle: 'Commercial channels and market network',
    trustBody:
      'Project visibility is reinforced through booking platforms, brokerage networks and institutional backing.',
  },
  de: {
    eyebrow: 'Portfolio',
    headline: 'Projekte mit\nDesign, Lage\nund Investmentfokus',
    body: 'Wir entwickeln urbane Assets in Asuncion mit Fokus auf Bauqualität, effiziente Nutzung und langfristigen Kapitalwert.',
    status: {
      selling: 'Zu verkaufen',
      'pre-construction': 'Vorverkauf',
      construction: 'Im Bau',
      delivered: 'Übergeben',
      upcoming: 'Demnächst',
    },
    filters: {
      all: 'Alle',
      residential: 'Wohnen',
      commercial: 'Gewerbe',
      mixed: 'Mischnutzung',
    },
    floors: 'Etagen',
    cardSummary: {
      selling: 'Aktive Investmentchance in einem nachgefragten Stadtkorridor.',
      'pre-construction': 'Jetzt Einheit reservieren — vor Baubeginn.',
      construction: 'Projekt in Umsetzung mit strategischer Lage und Premium-Positionierung.',
      delivered: 'Übergebenes Projekt mit Verfügbarkeit im Wiederverkauf.',
      upcoming: 'Projekt für kommende Entwicklungsphasen angekündigt.',
    },
    trustTitle: 'Vermarktungskanäle und Marktnetzwerk',
    trustBody:
      'Die Projektreichweite wird durch Buchungsplattformen, Maklernetzwerke und institutionelle Unterstützung gestärkt.',
  },
  es: {
    eyebrow: 'Portafolio',
    headline: 'Proyectos que combinan\ndiseño, ubicación\ny visión de inversión',
    body: 'Desarrollamos activos urbanos en Asunción con foco en calidad constructiva, operación eficiente y valor patrimonial de largo plazo.',
    status: {
      selling: 'En venta',
      'pre-construction': 'Pre-construcción',
      construction: 'En construcción',
      delivered: 'Entregado',
      upcoming: 'Próximamente',
    },
    filters: {
      all: 'Todos',
      residential: 'Residencial',
      commercial: 'Comercial',
      mixed: 'Uso mixto',
    },
    floors: 'pisos',
    cardSummary: {
      selling: 'Oportunidad activa para inversión en un corredor urbano de alta demanda.',
      'pre-construction': 'Reservá tu unidad ahora — antes de que comience la construcción.',
      construction: 'Proyecto en ejecución con ubicación estratégica y posicionamiento premium.',
      delivered: 'Proyecto entregado con disponibilidad en mercado de reventa.',
      upcoming: 'Proyecto anunciado para próximas etapas de desarrollo.',
    },
    trustTitle: 'Canales comerciales y red de mercado',
    trustBody:
      'El alcance comercial de cada proyecto se refuerza con plataformas de reserva, red de brokers y respaldo institucional.',
  },
} as const;

export default function ProjectsPage({ params }: { params: { locale: string } }) {
  const locale = (['es', 'en', 'de'].includes(params.locale) ? params.locale : 'es') as Locale;
  const copy = copyByLocale[locale];

  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const filtered = projects.filter((project) => activeFilter === 'all' || project.type === activeFilter);

  return (
    <>
      <section className="pt-36 pb-16 bg-cream">
        <Container>
          <FadeIn>
            <Eyebrow withLine className="mb-8">
              {copy.eyebrow}
            </Eyebrow>
          </FadeIn>
          <TextReveal
            text={copy.headline}
            as="h1"
            className="font-display text-hero font-light text-charcoal mb-8 max-w-3xl"
            delay={0.1}
          />
          <FadeIn delay={0.3}>
            <p className="font-body text-base text-slate max-w-lg leading-relaxed">{copy.body}</p>
          </FadeIn>
        </Container>
      </section>

      <div className="sticky top-[72px] z-30 bg-cream/95 backdrop-blur-md border-b border-stone">
        <Container>
          <div className="flex items-center gap-1 py-4 overflow-x-auto scrollbar-none">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`font-body text-xs uppercase tracking-widest px-5 py-2.5 transition-all duration-300 whitespace-nowrap rounded-sm ${
                  activeFilter === filter
                    ? 'bg-charcoal text-white'
                    : 'text-slate hover:text-charcoal hover:bg-stone-light'
                }`}
              >
                {copy.filters[filter]}
              </button>
            ))}
          </div>
        </Container>
      </div>

      <section className="section-py">
        <Container>
          <FadeIn>
            <div className="border border-stone bg-cream-50 p-6 md:p-8 mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div className="lg:col-span-1">
                  <span className="eyebrow text-slate block mb-2">{copy.trustTitle}</span>
                  <p className="font-body text-sm text-slate leading-relaxed">{copy.trustBody}</p>
                </div>
                <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-6 gap-3">
                  {[
                    partnerAssets.booking,
                    partnerAssets.airbnb,
                    partnerAssets.century21,
                    partnerAssets.concremaq,
                    partnerAssets.bbcf,
                    partnerAssets.ahkBadge,
                  ].map((logo) => (
                    <div key={logo.name} className="h-14 bg-white border border-stone/80 px-3 flex items-center justify-center">
                      <Image src={logo.src} alt={logo.name} width={110} height={36} className="w-auto max-h-8 object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={`/${params.locale}/projects/${project.slug}`} className="card-project group block">
                    <div className="img-zoom-wrapper relative aspect-[4/3] overflow-hidden bg-stone">
                      <Image
                        src={project.coverImage}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
                        <ArrowUpRight className="h-4 w-4 text-charcoal" />
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          project.status === 'selling'
                            ? 'bg-gold'
                            : project.status === 'pre-construction'
                            ? 'bg-violet-400'
                            : project.status === 'construction'
                            ? 'bg-amber-500'
                            : project.status === 'delivered'
                            ? 'bg-emerald-500'
                            : 'bg-slate-400'
                        }`} />
                        <span className="eyebrow text-slate">{copy.status[project.status]}</span>
                      </div>
                      <h3 className="font-display text-2xl font-light text-charcoal mb-1 group-hover:text-gold transition-colors duration-300">
                        {project.name}
                      </h3>
                      <p className="font-body text-sm text-slate mb-4">{project.location}</p>
                      <p className="font-body text-sm text-slate-400 mb-6 line-clamp-2">
                        {copy.cardSummary[project.status]}
                      </p>
                      <div className="flex items-center justify-between text-xs font-body text-slate border-t border-stone pt-4">
                        <span>{project.floors} {copy.floors}</span>
                        <span>{project.neighborhood}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>
    </>
  );
}
