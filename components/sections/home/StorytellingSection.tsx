'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import FadeIn from '@/components/animations/FadeIn';
import { TextReveal } from '@/components/animations/ScrollReveal';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';

interface StorytellingSectionProps {
  t: {
    eyebrow: string;
    headline: string;
    body: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    imageAlt: string;
    floatingLabel: string;
  };
}

const stats = [
  { valueKey: 'stat1Value', labelKey: 'stat1Label' },
  { valueKey: 'stat2Value', labelKey: 'stat2Label' },
  { valueKey: 'stat3Value', labelKey: 'stat3Label' },
] as const;

export default function StorytellingSection({ t }: StorytellingSectionProps) {
  return (
    <section className="bg-cream overflow-hidden">
      {/* Text: two-column editorial layout */}
      <Container className="section-py">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end">
          {/* Left: eyebrow + headline */}
          <div className="lg:col-span-7">
            <FadeIn delay={0}>
              <Eyebrow withLine className="mb-8">
                {t.eyebrow}
              </Eyebrow>
            </FadeIn>
            <TextReveal
              text={t.headline}
              as="h2"
              className="font-display text-display font-light text-charcoal"
              delay={0.1}
            />
          </div>

          {/* Right: body + stats */}
          <div className="lg:col-span-5">
            <FadeIn delay={0.2}>
              <p className="font-body text-base text-slate leading-relaxed mb-12">
                {t.body}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-stone">
                {stats.map(({ valueKey, labelKey }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="font-display text-3xl md:text-4xl font-light text-charcoal block mb-1">
                      {t[valueKey]}
                    </span>
                    <span className="font-body text-xs text-slate uppercase tracking-widest">
                      {t[labelKey]}
                    </span>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>

      {/* Full-width panoramic image — natural aspect ratio, no black bars */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full bg-charcoal overflow-hidden"
        style={{ aspectRatio: '2408 / 890' }}
      >
        <Image
          src="https://pub-70473ebb629c4efb93b99bf2e83117da.r2.dev/assets/allprojects.png"
          alt={t.imageAlt}
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
        {/* Subtle top fade — connects cream section to the dark image */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-cream to-transparent pointer-events-none" />
      </motion.div>
    </section>
  );
}
