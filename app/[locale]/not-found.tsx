'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function NotFound() {
  const locale = useLocale() as 'es' | 'en' | 'de';
  const copy = {
    es: { title: 'Página no encontrada', body: 'La página que busca no existe o ha sido movida.', cta: 'Volver al inicio' },
    en: { title: 'Page not found', body: 'The page you are looking for does not exist or has been moved.', cta: 'Back to home' },
    de: { title: 'Seite nicht gefunden', body: 'Die gesuchte Seite existiert nicht oder wurde verschoben.', cta: 'Zur Startseite' },
  }[locale || 'es'];

  return (
    <section className="flex min-h-screen items-center justify-center bg-cream">
      <div className="text-center px-6">
        <span className="font-display text-[12rem] font-light text-stone-dark leading-none block">404</span>
        <h1 className="font-display text-4xl font-light text-charcoal mb-4">{copy.title}</h1>
        <p className="font-body text-base text-slate mb-10 max-w-sm mx-auto">{copy.body}</p>
        <Link href={`/${locale || 'es'}`} className="btn-primary">{copy.cta}</Link>
      </div>
    </section>
  );
}
