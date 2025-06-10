import 'server-only';
import type { Locale } from '@/app/i18n-config';

const dictionaries = {
  en: () => import('@/app/dictionaries/en.json').then((module) => module.default),
  es: () => import('@/app/dictionaries/es.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  if (locale in dictionaries) {
    return dictionaries[locale]();
  }
  // Fallback to default locale if the requested locale is not found
  return dictionaries[i18n.defaultLocale]();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

// Helper for i18n.defaultLocale if not directly available
import { i18n } from '@/app/i18n-config';
