import { Metadata } from "next";
import { getCategory } from "@/config/api";
import getCookie from "../config/getCookie";
import clearUrl from "@/utils/clearUrl";

interface MetaDataProps {
  data: any;
  page?: string[];
}
const baseUrl = process.env.NEXT_PUBLIC_FRONT_END as string;
const defaultLang = process.env.NEXT_PUBLIC_DEFAULT_LOCALE as string;

const getMetaData = async ({ data, page }: MetaDataProps): Promise<Metadata> => {
  const locale = await getCookie();
  const seo = data?.acf?.seo;
  const isCategory = new URL(data?.link).pathname.includes("category");
  let category: string = "";

  if (isCategory) {
    const { clean, haveLang, url } = clearUrl(page);
    const result = await getCategory(clean?.[haveLang ? 2 : 1]);
    category = result?.name || "";
  }

  const title = `${isCategory ? `${category} | ${seo?.title}` : seo?.title}` || "Domatech";
  const description = seo?.description || "";

  const languages = data?.acf?.languages;
  const repeater = languages?.repeater || [];

  const response = {
    title,
    description,
    metadataBase: new URL(baseUrl),
    icons: {
      icon: [
        { media: "(prefers-color-scheme: dark)", url: "/icon.png", href: "/icon.png" },
        { media: "(prefers-color-scheme: light)", url: "/icon.png", href: "/icon.png" }
      ]
    },
    openGraph: { images: [{ url: "/icon.png", width: 180, height: 180, alt: "Domatech" }] },
    other: { "google-site-verification": process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "" }
  };

  if (!languages?.languages_check) return response;

  const alternates: { languages: Record<string, string> } = { languages: {} };

  repeater.forEach((item: any) => {
    if (!item.languageSet) return console.warn("languageSetUndefined", item);

    const lang = item.languageSet;
    const urlKey = `url_${lang}` as const;
    const slug = item[urlKey]?.trim();
    const isCurrent = lang === locale;
    const isDefault = lang === defaultLang;
    const prefix = !isCurrent && !isDefault ? `/${lang}` : "";
    const finalUrl = slug ? `${baseUrl}${prefix}/${slug}` : `${baseUrl}${prefix}`;

    alternates.languages[lang] = finalUrl;
  });

  return { ...response, alternates };
};

export default getMetaData;
