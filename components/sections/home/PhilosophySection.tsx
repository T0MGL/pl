'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import FadeIn from '@/components/animations/FadeIn';
import { ScrollRevealContainer, ScrollRevealItem, TextReveal } from '@/components/animations/ScrollReveal';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';

interface PhilosophySectionProps {
  t: {
    eyebrow: string;
    headline: string;
    pillar1Title: string;
    pillar1Body: string;
    pillar2Title: string;
    pillar2Body: string;
    pillar3Title: string;
    pillar3Body: string;
  };
}

const pillars = [
  { titleKey: 'pillar1Title', bodyKey: 'pillar1Body', number: '01' },
  { titleKey: 'pillar2Title', bodyKey: 'pillar2Body', number: '02' },
  { titleKey: 'pillar3Title', bodyKey: 'pillar3Body', number: '03' },
] as const;

export default function PhilosophySection({ t }: PhilosophySectionProps) {
  return (
    <section className="section-py bg-charcoal text-white relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://pub-70473ebb629c4efb93b99bf2e83117da.r2.dev/projects/tower/parkloftstowerinterior2.jpg.jpg"
          alt=""
          fill
          aria-hidden
          className="object-cover opacity-10"
        />
      </div>

      {/* Gold vertical accent */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/30 to-transparent hidden xl:block" />

      <Container className="relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 lg:mb-28">
          <div>
            <FadeIn>
              <Eyebrow withLine light className="mb-8">
                {t.eyebrow}
              </Eyebrow>
            </FadeIn>
            <TextReveal
              text={t.headline}
              as="h2"
              className="font-display text-display font-light text-white"
            />
          </div>
        </div>

        {/* Pillars */}
        <ScrollRevealContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12" staggerChildren={0.15}>
          {pillars.map(({ titleKey, bodyKey, number }) => (
            <ScrollRevealItem key={number}>
              <motion.div
                className="group relative p-8 border border-white/10 hover:border-gold/50 transition-colors duration-500"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Number */}
                <span className="font-display text-6xl font-light text-white/8 absolute -top-4 right-4 select-none">
                  {number}
                </span>

                {/* Gold line */}
                <motion.div
                  className="w-8 h-px bg-gold mb-8 origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />

                <h3 className="font-display text-2xl font-light text-white mb-4 group-hover:text-gold-light transition-colors duration-300">
                  {t[titleKey]}
                </h3>

                <p className="font-body text-sm text-white/50 leading-relaxed">
                  {t[bodyKey]}
                </p>
              </motion.div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealContainer>
      </Container>
    </section>
  );
}
