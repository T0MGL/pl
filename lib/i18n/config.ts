export const locales = ['es', 'en', 'de', 'pt'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';

export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  de: 'Deutsch',
  pt: 'Português',
};

export const localeFlags: Record<Locale, string> = {
  es: '🇵🇾',
  en: '🇬🇧',
  de: '🇩🇪',
  pt: '🇧🇷',
};
