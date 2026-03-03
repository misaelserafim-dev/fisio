import { Locale } from "@/locales/locales";
import { getMap } from "../config/api";
import { cache } from "react";

type Order = "ASC" | "DESC";
type OrderBy = "title" | "date" | "modified" | "name" | "modified" | "rand" | "menu_order";

interface GetMapIdParams {
  type: string; // Obrigatório
  id?: number[]; // Opcional
  orderby?: OrderBy; // Opcional, com tipos predefinidos
  order?: Order; // Opcional, com tipos predefinidos
  per_page?: number; // Opcional
  slug?: string; // opcional
  taxonomy?: string; //opcional
  term_slug?: string; //opcional
  taxonomy_meta?: boolean; //opcional
  raw?: boolean;
  page?: number;
  locale?: Locale;
  _fields?: string; // opcional, para filtrar campos retornados
  categories?: string; // opcional, para filtrar por categorias
  [key: string]: any; // Permite outros parâmetros adicionais
}

const getMapId = cache(async (params: GetMapIdParams) => {
  const queryKey = ["key", { ...params }];
  const result = await getMap({ key: "key", queryKey });
  return result;
});

export default getMapId;
