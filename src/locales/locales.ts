export const locales = (process.env.NEXT_PUBLIC_OTHER_LOCALES as string)
  .split(",")
  .concat(process.env.NEXT_PUBLIC_DEFAULT_LOCALE as string);

const defaultLang = process.env.NEXT_PUBLIC_DEFAULT_LOCALE as string;

export type Locale = (typeof locales)[number];

export function Locale(locale?: string): Locale {
  return locales.includes(locale as Locale) ? (locale as Locale) : defaultLang;
}
