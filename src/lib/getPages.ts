import getMapId from "./getMapId";
import clearUrl from "@/utils/clearUrl";

const getPages = async ({ link, ...params }: { link: string[]; [key: string]: any }) => {
  const { clean, haveLang, url } = clearUrl(link);
  try {
    const pages = await getMapId({ type: "page", locale: haveLang, ...params });
    const page =
      pages.find((p: any) => new URL(p.link).href === url.href) ||
      pages.find((p: any) => {
        const pageUrl = new URL(p.link);
        return pageUrl.pathname.includes("category") && pageUrl.pathname.includes(clean?.[haveLang ? 1 : 0]);
      });
    return page || null;
  } catch (error) {
    console.error("Error fetching pages:", error);
    return null;
  }
};

export default getPages;
