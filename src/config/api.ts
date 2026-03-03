import qs from "qs";
import getCookie from "./getCookie";
import time from "@/utils/timeRevalidate";
import { clearHeader } from "@/utils/clearHeader";
import { Locale, locales } from "@/locales/locales";

const dfLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE as string;

export const prepareFetchUrl = (baseUrl: string, options: unknown) => {
  const queryString = qs.stringify(options, {
    arrayFormat: "brackets",
    encode: false
  });
  return `${baseUrl}?${queryString}`;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWrapper(
  url: string,
  options: RequestInit = {},
  retries = 3,
  timeout = 20000,
  waitBetweenRetries = 2000,
  raw: boolean = false,
  locale?: Locale
) {
  const localeCookie = await getCookie();
  const fullLocale = locale || localeCookie;
  const baseURL =
    fullLocale !== process.env.NEXT_PUBLIC_DEFAULT_LOCALE
      ? process.env.NEXT_PUBLIC_DOMAIN + `/${fullLocale}/wp-json`
      : process.env.NEXT_PUBLIC_DOMAIN + `/wp-json`;
  let attempt = 0;
  while (attempt < retries) {
    attempt++;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(baseURL + url, {
        headers: { "Content-Type": "application/json", ...options.headers },
        signal: controller.signal,
        ...options
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (!raw) return await response.json();
      return { data: await response.json(), headers: clearHeader(response.headers) };
    } catch (error) {
      clearTimeout(timeoutId);
      if (attempt >= retries) {
        throw error;
      }
      await sleep(waitBetweenRetries);
    }
  }
  throw new Error("Unreachable code reached in fetchWrapper");
}

export async function getPage(id: number, section?: string): Promise<any> {
  let url = `/wp/V2/pages/${id}`;
  if (section) {
    url += `?_fields=acf.${section}`;
  }
  try {
    const resp = await fetchWrapper(url, {
      next: { revalidate: time * 2, tags: ["page"] }
    });
    if (section) {
      return resp.acf[section];
    }
    return resp;
  } catch (error: any) {
    console.log(`getPage error: ${error.message}`);
  }
}

export async function getPostsType({ pageParam, queryKey }: any): Promise<any> {
  const [key, params, type] = queryKey;
  try {
    const resp = await fetchWrapper(`/wp/V2/${type}?_embed&status=publish&page=${pageParam || 1}&${params || ""}`, {
      next: { revalidate: time * 2, tags: ["posts"] }
    });
    return resp;
  } catch (error: any) {
    console.log(queryKey, " getPostsType: ", error.message);
  }
}

export async function getPagesByTemplate(idOrTemplate: number | string, slug?: string): Promise<any[]> {
  let url;
  let cont = 0;
  // Verifica se o valor é um número (ID) ou string (template-name)
  if (typeof idOrTemplate === "number") {
    url = `/wp/V2/pages/${idOrTemplate}`;
  } else {
    // Utiliza o parâmetro 'template' corretamente, conforme o filtro personalizado no functions.php
    url = `/wp/V2/pages?template=${idOrTemplate}`;
  }

  try {
    const resp = await fetchWrapper(url, {
      next: { revalidate: time * 2, tags: ["pages"] }
    });

    // Se slug for passado, filtra os resultados com base no slug
    if (slug) {
      return resp.filter((page: any) => page.slug === slug);
    }
    // console.log(`Featch getPagesByTemplate ${slug} ${idOrTemplate}`);
    cont++;
    return resp;
  } catch (error: any) {
    console.log(`getPagesByTemplate url:${url} error:${error.message}`);
    return [];
  }
}

export async function sendForm(body: FormData, id: number): Promise<any> {
  const headers = {
    // Fetch automatically sets the correct headers for FormData
  };
  try {
    const resp = await fetchWrapper(`/contact-form-7/v1/contact-forms/${id}/feedback`, {
      method: "POST",
      body,
      headers
    });
    console.log(resp);
    return resp;
  } catch (error: any) {
    console.log("sendForm: ", error.message);
  }
}

export async function getPostType({ _, queryKey }: any): Promise<any> {
  const [key, search, section, type] = queryKey;
  let url = `/wp/V2/${type}/${search}?_fields=acf.${section}`;
  if (!section) url = `/wp/V2/${type}/${search}?_embed`;
  if (isNaN(search)) url = `/wp/V2/${type}?slug=${search}&_fields=acf.${section}`;
  if (isNaN(search) && !section) url = `/wp/V2/${type}/?slug=${search}&_embed`;
  try {
    const resp = await fetchWrapper(url, {
      next: { revalidate: time, tags: ["single"] }
    });
    if (isNaN(search) && !section) return resp[0];
    if (isNaN(search)) return resp[0].acf[section];
    if (!section) return resp;
    return resp.acf[section];
  } catch (error: any) {
    console.log(queryKey, " getPostType: ", error.message);
  }
}

export async function getCategories(categorie: string, hide_empty?: boolean): Promise<any> {
  try {
    const resp = await fetchWrapper(`/wp/V2/${categorie}${hide_empty ? "?hide_empty=1" : ""}`, {
      next: { revalidate: time * 2, tags: ["categories"] }
    });
    return resp;
  } catch (error: any) {
    console.log(categorie, " getCategories: ", error.message);
  }
}

export async function getSearch(): Promise<any> {
  const url = `/wp/v2/search-link`;
  try {
    const resp = await fetchWrapper(url);
    return resp;
  } catch (error: any) {
    console.log("getSearch: ", error.message);
  }
}

export async function getMap({ pageParam, queryKey }: any): Promise<any> {
  const [key, params] = queryKey;
  const { raw = false, locale, ...restParams } = params;
  const url = prepareFetchUrl(`/wp/V2/items`, restParams);
  try {
    const resp = await fetchWrapper(url, { next: { revalidate: time * 2, tags: [url] } }, 3, 20000, 2000, raw, locale);
    return resp;
  } catch (error: any) {
    console.log(queryKey, " getMap: ", error.message);
  }
}

export async function getGeneral(): Promise<any> {
  try {
    const resp = await fetchWrapper(`/acf/v3/options/option?acf_format=standard`, {
      next: { revalidate: time * 2, tags: ["layout"] }
    });
    return resp.acf;
  } catch (error: any) {
    console.log("getGeneral: ", error.message);
  }
}

export async function fetchUser(userId: number): Promise<any> {
  const url = `/wp/V2/users/${userId}`;
  try {
    const data = await fetchWrapper(url, {
      next: { revalidate: time * 2, tags: ["user", `user-${userId}`] }
    });
    return data;
  } catch (error: any) {
    console.error(`fetchUser error (userId: ${userId}):`, error.message);
    throw new Error(`Unable to fetch user data for ID ${userId}`);
  }
}

export async function generateStaticUrls(): Promise<{ page: string[] }[]> {
  const allParams: { page: string[] }[] = [];
  const typesList: any[] = await getTypes();
  const endpoints = Object.values(typesList)
    .filter((t) => !!t.icon)
    .filter((t) => t.rest_base !== "media")
    .map((t) => t.rest_base)
    .sort((a, b) => (a === "pages" ? -1 : b === "pages" ? 1 : a.localeCompare(b)));
  for (const lang of locales) {
    const langPrefix = lang === dfLocale ? "" : `/${lang}`;
    for (const type of endpoints) {
      let pageNum = 1;
      let totalPages = 1;
      while (pageNum <= totalPages) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN}${langPrefix}/wp-json/wp/v2/${type}?per_page=10&page=${pageNum}&_fields=link`
        );
        if (!res.ok) console.log(`Fetch ${type} failed: ${res.status}`);
        totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
        const items: any[] = await res.json();
        items.forEach((item) => {
          const url = new URL(item.link);
          const page = url.pathname.split("/").filter(Boolean);
          allParams.push({ page });
        });
        pageNum++;
      }
    }
  }
  return allParams;
}

export async function getTypes(type?: string): Promise<any | null> {
  const search = type ? `/${type}` : "";
  try {
    const types = await fetchWrapper(`/wp/v2/types${search}`, {
      next: { revalidate: time * 5, tags: [`types-${search}`] }
    });
    return types || null;
  } catch (error: any) {
    return null;
  }
}

export async function getCategory(slug: string): Promise<any | null> {
  if (!slug || slug === "category") return null;
  try {
    const taxResp = await fetchWrapper(`/wp/v2/taxonomies`, {
      next: { revalidate: time * 5, tags: ["taxonomies"] }
    });
    const taxonomies = Object.values(taxResp) as any[];
    for (const tax of taxonomies) {
      const restBase = tax?.rest_base;
      if (!restBase) continue;
      const termResp = await fetchWrapper(`/wp/v2/${restBase}?slug=${encodeURIComponent(slug)}`, {
        next: { revalidate: time * 5, tags: [restBase] }
      });
      if (Array.isArray(termResp) && termResp.length > 0) {
        return termResp?.[0] || null;
      }
    }
    return null;
  } catch (error: any) {
    console.log(`getCategory "${slug}" error: ${error.message}`);
    return null;
  }
}
