export function getFullLocale(locale: string): string {
  switch (locale) {
    case "en":
      return "en-US";
    case "pt":
      return "pt-BR";
    // Adicione outros casos conforme necessário
    default:
      return "pt-BR"; // Valor padrão
  }
}
