export const acceptanceCookies = {
  pt: {
    title: "Aceitar termos de uso do site",
    label: "Aceitar"
  },
  en: {
    title: "Accept website terms of use",
    label: "To accept"
  },
  es: {
    title: "Aceptar condiciones de uso del sitio web",
    label: "Aceptar"
  }
} as const;

export type AcceptanceCookies = typeof acceptanceCookies;
