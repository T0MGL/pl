'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

interface HeroSectionProps {
  locale: string;
  t: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    cta: string;
    ctaSecondary: string;
    scrollLabel: string;
    metaLocation: string;
    metaProjects: string;
    metaSince: string;
  };
}

export default function HeroSection({ locale, t }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const lines = t.headline.split('\n');

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] max-h-[1100px] overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY, scale: 1.1 }}
      >
        <Image
          src="https://pub-70473ebb629c4efb93b99bf2e83117da.r2.dev/assets/parkloftsrecoletbackground.jpg"
          alt="Park Lofts Paraguay — Premium Real Estate"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Deep gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-radial-gradient" style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)'
        }} />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28"
        style={{ y: contentY, opacity }}
      >
        <div className="container-site">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-6 md:mb-8"
          >
            <span className="block h-px w-8 bg-gold" />
            <span className="eyebrow text-gold-light">{t.eyebrow}</span>
          </motion.div>

          {/* Headline — animated line by line */}
          <h1 className="font-display text-hero font-light text-white mb-6 md:mb-8">
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.15em] -mb-[0.15em]">
                <motion.span
                  className="block"
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.5 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-sm md:text-base text-white/70 max-w-lg mb-10 md:mb-12 leading-relaxed"
          >
            {t.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Link
              href={`/${locale}/projects`}
              className="btn-primary !py-4 !px-8 group"
            >
              <span>{t.cta}</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href={`/${locale}/about`}
              className="btn font-body text-xs uppercase tracking-widest text-white/80 hover:text-white border border-white/30 hover:border-white px-8 py-4 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-400"
            >
              {t.ctaSecondary}
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="eyebrow text-white/50 !text-2xs">{t.scrollLabel}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4 text-white/50" />
        </motion.div>
      </motion.div>

      {/* Bottom metadata bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10">
        <div className="container-site py-4 flex items-center justify-between">
          <span className="font-body text-2xs text-white/40 uppercase tracking-widest">
            {t.metaLocation}
          </span>
          <span className="font-body text-2xs text-white/40 uppercase tracking-widest">
            {t.metaProjects}
          </span>
          <span className="font-body text-2xs text-white/40 uppercase tracking-widest hidden md:block">
            {t.metaSince}
          </span>
        </div>
      </div>
    </section>
  );
}
