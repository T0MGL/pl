'use client';

import { animate, motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import FadeIn from '@/components/animations/FadeIn';
import { TextReveal } from '@/components/animations/ScrollReveal';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';

interface StatsSectionProps {
  t: {
    eyebrow: string;
    headline: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    stat4Value: string;
    stat4Label: string;
  };
}

// Animated number component
function AnimatedStat({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Extract number from value (e.g., "$18.5M" -> 18.5)
    const prefix = value.match(/^[^0-9]*/)?.[0] || '';
    const suffix = value.match(/[^0-9.,]*$/)?.[0] || '';
    const rawNumeric = value.replace(/[^0-9.,]/g, '').replace(',', '.');
    const hasDecimal = /[.,]\d/.test(rawNumeric);
    const num = parseFloat(rawNumeric);

    if (isNaN(num)) {
      setTimeout(() => setDisplayValue(value), delay * 1000);
      return;
    }

    const controls = animate(0, num, {
      duration: 2,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        const formatted = v.toLocaleString('es-PY', {
          minimumFractionDigits: hasDecimal ? 1 : 0,
          maximumFractionDigits: hasDecimal ? 1 : 0,
        });
        setDisplayValue(`${prefix}${formatted}${suffix}`);
      },
    });

    return controls.stop;
  }, [isInView, value, delay]);

  return (
    <div ref={ref} className="text-center md:text-left">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-display text-6xl md:text-7xl font-light text-charcoal block mb-2">
          {displayValue || value}
        </span>
        <span className="font-body text-xs uppercase tracking-widest text-slate block">
          {label}
        </span>
      </motion.div>
    </div>
  );
}

export default function StatsSection({ t }: StatsSectionProps) {
  const stats = [
    { value: t.stat1Value, label: t.stat1Label, delay: 0 },
    { value: t.stat2Value, label: t.stat2Label, delay: 0.1 },
    { value: t.stat3Value, label: t.stat3Label, delay: 0.2 },
    { value: t.stat4Value, label: t.stat4Label, delay: 0.3 },
  ];

  return (
    <section className="section-py bg-cream relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-cream-200 hidden xl:block" aria-hidden />

      <Container className="relative z-10">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <FadeIn>
            <Eyebrow withLine className="mb-6">
              {t.eyebrow}
            </Eyebrow>
          </FadeIn>
          <TextReveal
            text={t.headline}
            as="h2"
            className="font-display text-display font-light text-charcoal max-w-lg"
          />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="relative">
              {i > 0 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -left-4 lg:-left-6 top-0 bottom-0 w-px bg-stone origin-top hidden md:block"
                />
              )}
              <AnimatedStat value={stat.value} label={stat.label} delay={stat.delay} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
