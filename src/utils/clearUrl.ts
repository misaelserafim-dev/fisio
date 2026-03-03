import { locales } from "@/locales/locales";

const clearUrl = (link?: string[]) => {
  const linkString = link?.join("/") || "";
  const haveLink = `${!linkString ? "" : `${linkString}`}`;
  const haveLang = locales.includes(link?.[0] || "") ? link?.[0] : "";
  const url = new URL(`${process.env.NEXT_PUBLIC_FRONT_END}${haveLink}`);
  const clean = link || [];
  return { url, clean, haveLang };
};
export default clearUrl;
