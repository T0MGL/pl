'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Expand, Loader2 } from 'lucide-react';
import { useState } from 'react';

import FadeIn from '@/components/animations/FadeIn';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import type { VirtualTour } from '@/lib/content';

type TourKey = VirtualTour['key'];

type Locale = 'es' | 'en' | 'de';

const labelsByLocale: Record<Locale, Record<string, { eyebrow: string; headline: string; tabLabels: Record<TourKey, string> }>> = {
  es: {
    default: {
      eyebrow: 'Recorrido virtual',
      headline: 'Explorá el proyecto\ndesde donde estés',
      tabLabels: {
        amenities: 'Amenities',
        studio: 'Estudio',
        penthouse: 'Penthouse',
      },
    },
  },
  en: {
    default: {
      eyebrow: 'Virtual Tour',
      headline: 'Explore the project\nfrom anywhere',
      tabLabels: {
        amenities: 'Amenities',
        studio: 'Studio',
        penthouse: 'Penthouse',
      },
    },
  },
  de: {
    default: {
      eyebrow: 'Virtuelle Tour',
      headline: 'Das Projekt\nentdecken',
      tabLabels: {
        amenities: 'Ausstattung',
        studio: 'Studio',
        penthouse: 'Penthouse',
      },
    },
  },
};

interface VirtualTourSectionProps {
  tours: VirtualTour[];
  locale: string;
}

export default function VirtualTourSection({ tours, locale }: VirtualTourSectionProps) {
  const lang = (['es', 'en', 'de'].includes(locale) ? locale : 'es') as Locale;
  const copy = labelsByLocale[lang].default;

  const [activeKey, setActiveKey] = useState<TourKey>(tours[0].key);
  const [isLoading, setIsLoading] = useState(true);

  const activeTour = tours.find((t) => t.key === activeKey)!;

  function handleTabChange(key: TourKey) {
    if (key === activeKey) return;
    setIsLoading(true);
    setActiveKey(key);
  }

  return (
    <section className="section-py bg-charcoal">
      <Container>
        {/* Header */}
        <div className="mb-10">
          <FadeIn>
            <Eyebrow withLine className="mb-6 text-gold">
              {copy.eyebrow}
            </Eyebrow>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-display font-light text-white whitespace-pre-line">
              {copy.headline}
            </h2>
          </FadeIn>
        </div>

        {/* Tab selector */}
        <FadeIn delay={0.15}>
          <div className="flex items-center gap-1 mb-8 border-b border-white/10">
            {tours.map((tour) => {
              const isActive = tour.key === activeKey;
              return (
                <button
                  key={tour.key}
                  onClick={() => handleTabChange(tour.key)}
                  className="relative pb-4 px-6 font-body text-xs uppercase tracking-widest transition-colors duration-300"
                  style={{ color: isActive ? '#C4A96B' : 'rgba(255,255,255,0.45)' }}
                >
                  {copy.tabLabels[tour.key]}
                  {isActive && (
                    <motion.span
                      layoutId="tour-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-px bg-gold"
                      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Iframe wrapper */}
        <FadeIn delay={0.2}>
          <div className="relative w-full overflow-hidden border border-white/10" style={{ aspectRatio: '16/9' }}>
            {/* Loading overlay */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  key="loader"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 z-10 flex items-center justify-center bg-charcoal"
                >
                  <Loader2 className="h-7 w-7 text-gold animate-spin" />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.iframe
                key={activeKey}
                src={activeTour.url}
                title={`Park Lofts Tower — ${copy.tabLabels[activeKey]}`}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; gyroscope; xr-spatial-tracking; fullscreen"
                allowFullScreen
                onLoad={() => setIsLoading(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>

            {/* Fullscreen hint */}
            <div className="pointer-events-none absolute bottom-4 right-4 z-20 flex items-center gap-1.5 rounded-sm bg-black/50 px-3 py-1.5 backdrop-blur-sm">
              <Expand className="h-3 w-3 text-white/60" />
              <span className="font-body text-[10px] uppercase tracking-widest text-white/60">
                {lang === 'es' ? 'Pantalla completa' : lang === 'de' ? 'Vollbild' : 'Full screen'}
              </span>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
