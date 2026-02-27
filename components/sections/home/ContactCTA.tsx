'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { TextReveal } from '@/components/animations/ScrollReveal';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';

interface ContactCTAProps {
  locale: string;
  t: {
    eyebrow: string;
    headline: string;
    body: string;
    cta: string;
    ctaSecondary: string;
  };
}

export default function ContactCTA({ locale, t }: ContactCTAProps) {
  const locationLabel = locale === 'es' ? 'Asunción, Paraguay' : 'Asuncion, Paraguay';

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://pub-70473ebb629c4efb93b99bf2e83117da.r2.dev/projects/tower/parkloftstowercafe.jpeg"
          alt=""
          fill
          aria-hidden
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/80" />
        {/* Grain */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Gold accent vertical */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold to-transparent hidden lg:block" />

      <Container className="relative z-10 py-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Eyebrow withLine light className="mb-8">
              {t.eyebrow}
            </Eyebrow>
          </motion.div>

          <TextReveal
            text={t.headline}
            as="h2"
            className="font-display text-display font-light text-white mb-8"
            delay={0.1}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-base text-white/60 leading-relaxed mb-12 max-w-lg"
          >
            {t.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Link
              href={`/${locale}/contact`}
              className="group btn-gold flex items-center gap-3"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href={`/${locale}/projects`}
              className="btn border border-white/30 text-white hover:bg-white/10 transition-all duration-300 !text-xs"
            >
              {t.ctaSecondary}
            </Link>
          </motion.div>
        </div>

        {/* Decorative element — coordinates */}
        <div className="absolute bottom-8 right-8 hidden lg:block">
          <span className="font-mono text-2xs text-white/20 uppercase tracking-widest block">
            25°17&apos;08&quot;S 57°38&apos;03&quot;W
          </span>
          <span className="font-mono text-2xs text-white/20 uppercase tracking-widest block mt-1">
            {locationLabel}
          </span>
        </div>
      </Container>
    </section>
  );
}
