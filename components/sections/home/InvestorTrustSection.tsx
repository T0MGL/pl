'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight, Building2, Landmark } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import FadeIn from '@/components/animations/FadeIn';
import { TextReveal } from '@/components/animations/ScrollReveal';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { partnerAssets } from '@/lib/partners';

interface InvestorTrustSectionProps {
  locale: string;
  t: {
    eyebrow: string;
    headline: string;
    body: string;
    cta: string;
    trustItem1: string;
    trustItem2: string;
    trustItem3: string;
    trustItem4: string;
    metricLabel: string;
    platformsTitle: string;
    brokerageTitle: string;
    badgeTitle: string;
    badgeBody: string;
  };
}

export default function InvestorTrustSection({ locale, t }: InvestorTrustSectionProps) {
  const trustItems = [t.trustItem1, t.trustItem2, t.trustItem3, t.trustItem4];

  return (
    <section className="section-py bg-cream-100 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Left image */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="img-zoom-wrapper relative aspect-[4/3] overflow-hidden"
              >
                <Image
                  src="https://pub-70473ebb629c4efb93b99bf2e83117da.r2.dev/projects/tower/parkloftstowerlobby.jpeg"
                  alt="Park Lofts Tower — Lobby"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-charcoal/20" />
              </motion.div>

              {/* Floating trust metric */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -right-6 -bottom-6 bg-white border border-stone p-6 shadow-lg max-w-[200px] hidden md:block"
              >
                <span className="font-display text-4xl font-light text-gold block mb-1">USD 18.5M</span>
                <span className="font-body text-xs text-slate uppercase tracking-widest">
                  {t.metricLabel}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Right content */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <FadeIn>
              <Eyebrow withLine className="mb-8">
                {t.eyebrow}
              </Eyebrow>
            </FadeIn>

            <TextReveal
              text={t.headline}
              as="h2"
              className="font-display text-display font-light text-charcoal mb-8"
              delay={0.1}
            />

            <FadeIn delay={0.2}>
              <p className="font-body text-base text-slate leading-relaxed mb-10">
                {t.body}
              </p>
            </FadeIn>

            {/* Trust items */}
            <div className="space-y-4 mb-12">
              {trustItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-4"
                >
                  <div className="h-5 w-5 rounded-full bg-gold/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-gold" />
                  </div>
                  <span className="font-body text-sm text-charcoal-600">{item}</span>
                </motion.div>
              ))}
            </div>

            <FadeIn delay={0.45}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-stone bg-white p-5">
                  <span className="eyebrow text-slate mb-4 flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 text-gold" />
                    {t.platformsTitle}
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {[partnerAssets.booking, partnerAssets.airbnb].map((logo) => (
                      <a key={logo.name} href={logo.href} target="_blank" rel="noopener noreferrer" className="h-20 bg-white px-4 flex items-center justify-center border border-stone/70 hover:border-gold transition-colors duration-300">
                        <Image
                          src={logo.src}
                          alt={logo.name}
                          width={180}
                          height={56}
                          className="w-auto max-h-12 object-contain"
                        />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="border border-stone bg-white p-5">
                  <span className="eyebrow text-slate mb-4 flex items-center gap-2">
                    <Landmark className="h-3.5 w-3.5 text-gold" />
                    {t.brokerageTitle}
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {[partnerAssets.century21, partnerAssets.concremaq, partnerAssets.bbcf, partnerAssets.itau].map((logo) => (
                      <a key={logo.name} href={logo.href} target="_blank" rel="noopener noreferrer" className="h-20 bg-white px-4 flex items-center justify-center border border-stone/70 hover:border-gold transition-colors duration-300">
                        <Image
                          src={logo.src}
                          alt={logo.name}
                          width={150}
                          height={48}
                          className="w-auto max-h-10 object-contain"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.48}>
              <div className="border border-stone bg-cream p-4 mb-10 flex items-center gap-4">
                <Image
                  src={partnerAssets.ahkBadge.src}
                  alt={partnerAssets.ahkBadge.name}
                  width={108}
                  height={108}
                  className="w-20 h-20 object-contain shrink-0"
                />
                <div>
                  <span className="font-body text-xs uppercase tracking-widest text-charcoal block mb-1">
                    {t.badgeTitle}
                  </span>
                  <p className="font-body text-xs text-slate leading-relaxed">
                    {t.badgeBody}
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <Link
                href={`/${locale}/investor-relations`}
                className="group inline-flex items-center gap-3 btn-primary"
              >
                {t.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
