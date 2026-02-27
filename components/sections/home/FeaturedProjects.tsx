'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import FadeIn from '@/components/animations/FadeIn';
import { TextReveal } from '@/components/animations/ScrollReveal';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { featuredProjects } from '@/lib/content';

interface FeaturedProjectsProps {
  locale: string;
  t: {
    eyebrow: string;
    headline: string;
    viewAll: string;
    statusSelling: string;
    statusConstruction: string;
    statusDelivered: string;
  };
}

const summaryByLocale = {
  es: {
    selling: 'Ubicación premium seleccionada estratégicamente. Optimizado para Airbnb y renta corta de alta demanda.',
    construction: 'En construcción. Micro-apartamentos premium alineados con el boom de Airbnb en Asunción.',
    'pre-construction': 'En pre-construcción. Oportunidad de entrada a precio de lanzamiento con máximo potencial de apreciación.',
    delivered: 'Proyecto entregado y completamente comercializado. Disponible en mercado de reventa.',
    upcoming: 'Próximamente. Ubicación de vanguardia seleccionada para máximo retorno.',
  },
  en: {
    selling: 'Prime location strategically selected. Optimized for Airbnb and high-demand short-stay rentals.',
    construction: 'Under construction. Premium studio apartments aligned with Asunción\'s Airbnb boom.',
    'pre-construction': 'Pre-construction phase. Early-entry pricing with maximum appreciation potential.',
    delivered: 'Delivered and fully sold out. Available in the resale market.',
    upcoming: 'Coming soon. Future-ready location selected for maximum returns.',
  },
  de: {
    selling: 'Erstklassige, strategisch gewählte Lage. Optimiert für Airbnb und Kurzzeitmiete mit hoher Nachfrage.',
    construction: 'Im Bau. Premium-Studios abgestimmt auf Asuncións Airbnb-Boom.',
    'pre-construction': 'Vorverkaufsphase. Einstiegspreis mit maximalem Wertsteigerungspotenzial.',
    delivered: 'Übergeben und vollständig vermarktet. Im Wiederverkaufsmarkt verfügbar.',
    upcoming: 'Demnächst. Zukunftsorientierte Lage für maximale Rendite.',
  },
  pt: {
    selling: 'Localização premium estrategicamente selecionada. Otimizado para Airbnb e aluguel de curta duração.',
    construction: 'Em construção. Apartamentos estúdio premium alinhados com o boom do Airbnb em Assunção.',
    'pre-construction': 'Fase de pré-construção. Preço de entrada com máximo potencial de valorização.',
    delivered: 'Entregue e completamente comercializado. Disponível no mercado de revenda.',
    upcoming: 'Em breve. Localização de vanguarda selecionada para o máximo retorno.',
  },
} as const;

const statusMap: Record<string, string> = {
  selling: 'statusSelling',
  construction: 'statusConstruction',
  delivered: 'statusDelivered',
};

const statusDotColor: Record<string, string> = {
  selling: 'bg-gold',
  construction: 'bg-amber-500',
  delivered: 'bg-emerald-500',
};

export default function FeaturedProjects({ locale, t }: FeaturedProjectsProps) {
  const getStatusLabel = (status: string) => {
    const key = statusMap[status] as keyof typeof t;
    return t[key] || status;
  };

  return (
    <section className="section-py bg-cream-50">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <FadeIn>
              <Eyebrow withLine className="mb-6">
                {t.eyebrow}
              </Eyebrow>
            </FadeIn>
            <TextReveal
              text={t.headline}
              as="h2"
              className="font-display text-display font-light text-charcoal"
            />
          </div>
          <FadeIn delay={0.2} direction="left">
            <Link
              href={`/${locale}/projects`}
              className="group flex items-center gap-3 font-body text-xs uppercase tracking-widest text-slate hover:text-gold transition-colors duration-300 whitespace-nowrap"
            >
              {t.viewAll}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {featuredProjects[0] && (
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={featuredProjects[0]} locale={locale} getStatusLabel={getStatusLabel} large />
            </motion.div>
          )}

          <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6">
            {featuredProjects.slice(1).map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: (i + 1) * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1"
              >
                <ProjectCard project={project} locale={locale} getStatusLabel={getStatusLabel} />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProjectCard({
  project,
  locale,
  getStatusLabel,
  large = false,
}: {
  project: (typeof featuredProjects)[number];
  locale: string;
  getStatusLabel: (status: string) => string;
  large?: boolean;
}) {
  const localizedLocale = (['es', 'en', 'de', 'pt'].includes(locale) ? locale : 'es') as 'es' | 'en' | 'de' | 'pt';

  return (
    <Link href={`/${locale}/projects/${project.slug}`} className="card-project group block h-full">
      <div
        className={`img-zoom-wrapper relative overflow-hidden bg-stone ${
          large ? 'aspect-[4/3] md:aspect-[3/4]' : 'aspect-[16/9]'
        }`}
      >
        <Image
          src={project.coverImage}
          alt={project.name}
          fill
          sizes={large ? '(max-width: 1024px) 100vw, 58vw' : '(max-width: 1024px) 100vw, 42vw'}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <span className={`h-1.5 w-1.5 rounded-full ${statusDotColor[project.status]}`} />
            <span className="font-body text-2xs text-white/70 uppercase tracking-widest">
              {getStatusLabel(project.status)}
            </span>
          </div>

          <h3 className={`font-display font-light text-white mb-1 ${large ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
            {project.name}
          </h3>

          <p className="font-body text-sm text-white/60 mb-4">{project.location}</p>

          {large && (
            <p className="font-body text-sm text-white/50 mb-6 hidden md:block">
              {summaryByLocale[localizedLocale][project.status]}
            </p>
          )}

          <div className="flex items-center gap-4">
            <span className="font-body text-xs text-white/50">{project.floors} pisos</span>
            <span className="h-px w-4 bg-white/20" />
            <span className="font-body text-xs text-white/50">{project.neighborhood}</span>
          </div>
        </div>

        <div className="absolute top-5 right-5 h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-1 group-hover:translate-y-0">
          <ArrowRight className="h-4 w-4 text-white" />
        </div>
      </div>
    </Link>
  );
}
