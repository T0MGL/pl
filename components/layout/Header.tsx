'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { brandAssets } from '@/lib/brand';
import { localeNames, type Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils';

interface HeaderProps {
  locale: Locale;
  t: {
    projects: string;
    about: string;
    investors: string;
    newsroom: string;
    contact: string;
  };
}

const navItems = [
  { key: 'projects', href: '/projects' },
  { key: 'about', href: '/about' },
  { key: 'investors', href: '/investor-relations' },
  { key: 'newsroom', href: '/newsroom' },
  { key: 'contact', href: '/contact' },
] as const;

export default function Header({ locale, t }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isHomePage = pathname === `/${locale}` || pathname === '/';
  const logoSrc = scrolled || !isHomePage ? brandAssets.logoGold : brandAssets.logoWhite;

  const localePrefix = (l: Locale) => {
    const stripped = pathname.replace(`/${locale}`, '') || '/';
    return l === 'es' ? stripped : `/${l}${stripped}`;
  };

  const ui = {
    es: {
      homeAria: 'Park Lofts Paraguay — Inicio',
      open: 'Abrir menú',
      close: 'Cerrar menú',
      mobileCta: 'Hablar con un asesor',
    },
    en: {
      homeAria: 'Park Lofts Paraguay — Home',
      open: 'Open menu',
      close: 'Close menu',
      mobileCta: 'Speak with an advisor',
    },
    de: {
      homeAria: 'Park Lofts Paraguay — Startseite',
      open: 'Menü öffnen',
      close: 'Menü schließen',
      mobileCta: 'Mit einem Berater sprechen',
    },
    pt: {
      homeAria: 'Park Lofts Paraguay — Início',
      open: 'Abrir menu',
      close: 'Fechar menu',
      mobileCta: 'Falar com um consultor',
    },
  }[locale];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-cream/95 backdrop-blur-md border-b border-stone shadow-sm py-4'
            : isHomePage
            ? 'bg-transparent py-6'
            : 'bg-cream/95 backdrop-blur-md border-b border-stone py-4'
        )}
      >
        <div className="container-site flex items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center"
            aria-label={ui.homeAria}
          >
            <Image
              src={logoSrc}
              alt="Park Lofts Paraguay"
              width={220}
              height={54}
              priority
              className={cn(
                'h-auto transition-all duration-300',
                scrolled || !isHomePage ? 'w-[60px] md:w-[72px]' : 'w-[150px] md:w-[180px]'
              )}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={cn(
                  'link-underline font-body text-xs uppercase tracking-widest transition-colors duration-300',
                  scrolled || !isHomePage ? 'text-charcoal-600 hover:text-charcoal' : 'text-white/80 hover:text-white',
                  pathname.includes(item.href) && (scrolled || !isHomePage ? 'text-charcoal font-medium' : 'text-white font-medium')
                )}
              >
                {t[item.key as keyof typeof t]}
              </Link>
            ))}
          </nav>

          {/* Right: locale switcher + CTA */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Locale switcher */}
            <div className="flex items-center gap-2">
              {(Object.keys(localeNames) as Locale[]).map((l, i) => (
                <span key={l} className="flex items-center">
                  {i > 0 && (
                    <span className={cn(
                      'mx-1 text-2xs',
                      scrolled || !isHomePage ? 'text-stone-dark' : 'text-white/30'
                    )}>
                      /
                    </span>
                  )}
                  <Link
                    href={localePrefix(l)}
                    className={cn(
                      'font-body text-2xs uppercase tracking-widest transition-colors duration-200',
                      l === locale
                        ? scrolled || !isHomePage ? 'text-gold font-medium' : 'text-gold-light font-medium'
                        : scrolled || !isHomePage ? 'text-slate hover:text-charcoal' : 'text-white/50 hover:text-white'
                    )}
                  >
                    {l}
                  </Link>
                </span>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={`/${locale}/contact`}
              className={cn(
                'btn-primary !py-3 !px-6 !text-2xs transition-all duration-300',
                !scrolled && isHomePage && 'bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white hover:text-charcoal'
              )}
            >
              {t.contact}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10"
            aria-label={mobileOpen ? ui.close : ui.open}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className={cn('h-5 w-5', scrolled || !isHomePage ? 'text-charcoal' : 'text-white')} />
            ) : (
              <Menu className={cn('h-5 w-5', scrolled || !isHomePage ? 'text-charcoal' : 'text-white')} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-cream flex flex-col"
          >
            <div className="flex-1 container-site pt-28 pb-12 flex flex-col justify-between">
              {/* Nav links */}
              <nav className="flex flex-col gap-2">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={`/${locale}${item.href}`}
                      className="block font-display text-4xl font-light text-charcoal py-3 border-b border-stone hover:text-gold transition-colors duration-300"
                    >
                      {t[item.key as keyof typeof t]}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom section */}
              <div className="mt-12">
                {/* Locale */}
                <div className="flex items-center gap-4 mb-6">
                  {(Object.keys(localeNames) as Locale[]).map((l) => (
                    <Link
                      key={l}
                      href={localePrefix(l)}
                      className={cn(
                        'font-body text-xs uppercase tracking-widest',
                        l === locale ? 'text-gold font-medium' : 'text-slate'
                      )}
                    >
                      {localeNames[l]}
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/${locale}/contact`}
                  className="btn-primary w-full text-center block"
                >
                  {ui.mobileCta}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
