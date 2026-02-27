import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { locales, type Locale } from '@/lib/i18n/config';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  // Cast messages for typed access
  const t = messages as {
    nav: { projects: string; about: string; investors: string; newsroom: string; contact: string };
    footer: {
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
  };

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <SmoothScroll>
        <div className="flex min-h-screen flex-col">
          <Header locale={locale as Locale} t={t.nav} />
          <main className="flex-1 page-transition">{children}</main>
          <Footer locale={locale as Locale} t={t.footer} />
        </div>
      </SmoothScroll>
    </NextIntlClientProvider>
  );
}
