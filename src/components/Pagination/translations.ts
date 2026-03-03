export const paginationTranslations = {
  pt: {
    label: "Página",
    current: "Página atual",
    init: "Página inicial",
    prev: "Página anterior",
    next: "Proxima página",
    end: "Ultima página"
  },
  en: {
    label: "Page",
    current: "Current page",
    init: "First page",
    prev: "Previous page",
    next: "Next page",
    end: "Last page"
  },
  es: {
    label: "Pagina",
    current: "Pagina actual",
    init: "Primera pagina",
    prev: "Pagina anterior",
    next: "Siguiente pagina",
    end: "Última pagina"
  }
} as const;

export type PaginationTranslation = typeof paginationTranslations;
