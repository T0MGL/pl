import { Instagram, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { brandAssets } from '@/lib/brand';
import type { Locale } from '@/lib/i18n/config';

interface FooterProps {
  locale: Locale;
  t: {
    description: string;
    projects: string;
    company: string;
    investors: string;
    legal: string;
    privacy: string;
    terms: string;
    cookies: string;
    rights: string;
    tagline: string;
  };
}

export default function Footer({ locale, t }: FooterProps) {
  const year = new Date().getFullYear();
  const copy = ({
    es: {
      viewAll: 'Ver todos',
      about: 'Nosotros',
      team: 'Equipo',
      philosophy: 'Filosofía',
      newsroom: 'Newsroom',
      investorRelations: 'Relaciones con inversores',
      annualReports: 'Informes anuales',
      documentation: 'Documentación',
      investorContact: 'Contacto inversores',
    },
    en: {
      viewAll: 'View all',
      about: 'About',
      team: 'Team',
      philosophy: 'Philosophy',
      newsroom: 'Newsroom',
      investorRelations: 'Investor relations',
      annualReports: 'Annual reports',
      documentation: 'Documentation',
      investorContact: 'Investor contact',
    },
    de: {
      viewAll: 'Alle ansehen',
      about: 'Über uns',
      team: 'Team',
      philosophy: 'Philosophie',
      newsroom: 'Newsroom',
      investorRelations: 'Investor Relations',
      annualReports: 'Jahresberichte',
      documentation: 'Dokumentation',
      investorContact: 'Investorenkontakt',
    },
    pt: {
      viewAll: 'Ver todos',
      about: 'Sobre nós',
      team: 'Equipe',
      philosophy: 'Filosofia',
      newsroom: 'Newsroom',
      investorRelations: 'Relações com investidores',
      annualReports: 'Relatórios anuais',
      documentation: 'Documentação',
      investorContact: 'Contato investidores',
    },
  } as const)[locale];

  const navColumns = [
    {
      label: t.projects,
      links: [
        { label: 'Park Lofts Tower', href: `/${locale}/projects/park-lofts-tower` },
        { label: 'Park Lofts Recoleta', href: `/${locale}/projects/park-lofts-recoleta` },
        { label: 'Park Lofts Airport', href: `/${locale}/projects/park-lofts-airport` },
        { label: copy.viewAll, href: `/${locale}/projects` },
      ],
    },
    {
      label: t.company,
      links: [
        { label: copy.about, href: `/${locale}/about` },
        { label: copy.team, href: `/${locale}/about#team` },
        { label: copy.philosophy, href: `/${locale}/about#philosophy` },
        { label: copy.newsroom, href: `/${locale}/newsroom` },
      ],
    },
    {
      label: t.investors,
      links: [
        { label: copy.investorRelations, href: `/${locale}/investor-relations` },
        { label: copy.annualReports, href: `/${locale}/investor-relations#reports` },
        { label: copy.documentation, href: `/${locale}/investor-relations#documents` },
        { label: copy.investorContact, href: `/${locale}/contact?type=investor` },
      ],
    },
  ];

  return (
    <footer className="bg-charcoal text-white">
      {/* Main footer */}
      <div className="container-site pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="mb-6">
              <Image
                src={brandAssets.logoWhite}
                alt="Park Lofts Paraguay"
                width={220}
                height={54}
                className="h-auto w-[180px]"
              />
            </div>

            <p className="font-body text-sm text-charcoal-300 leading-relaxed mb-8 max-w-xs">
              {t.description}
            </p>

            {/* Social */}
            <div className="flex items-center gap-4">
              {[
                { Icon: Instagram, href: 'https://www.instagram.com/parklofts/', label: 'Instagram' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/company/parklofts', label: 'LinkedIn' },
                { Icon: Twitter, href: 'https://twitter.com/parkloftspar', label: 'Twitter / X' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center border border-charcoal-600 text-charcoal-300 hover:border-gold hover:text-gold transition-colors duration-300 rounded-full"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.label}>
              <h3 className="font-body text-2xs font-medium uppercase tracking-superwide text-charcoal-300 mb-5">
                {col.label}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-charcoal-200 hover:text-gold transition-colors duration-300 link-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div className="mt-16 mb-8 border-t border-charcoal-700 pt-8">
          <p className="font-display text-3xl md:text-4xl font-light text-charcoal-400 italic">
            &ldquo;{t.tagline}&rdquo;
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-charcoal-700">
        <div className="container-site py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-charcoal-400">
            &copy; {year} Park Lofts Paraguay S.A. {t.rights}
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: t.privacy, href: `/${locale}/legal/privacy` },
              { label: t.terms, href: `/${locale}/legal/terms` },
              { label: t.cookies, href: `/${locale}/legal/cookies` },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-xs text-charcoal-400 hover:text-charcoal-200 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
