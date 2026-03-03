import { getTypes } from "@/config/api";
import clearUrl from "@/utils/clearUrl";
import getMapId from "./getMapId";

const getPosts = async ({ link, ...params }: { link: string[]; [key: string]: any }) => {
  const { clean, haveLang, url } = clearUrl(link);
  const slug = clean?.[clean?.length - 1] || "";
  if (!slug) return null;
  let type: any = { rest_base: "" };
  if (clean?.[haveLang ? 1 : 0] === "blog") type.rest_base = "post";
  else {
    const types = await getTypes();
    type = Object.values(types)?.find((item: any) => item.has_archive === clean?.[haveLang ? 1 : 0]) || { rest_base: "" };
  }
  try {
    const post = await getMapId({ type: type?.rest_base || "post", locale: haveLang, slug, ...params });
    return post?.[0] || null;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
};

export default getPosts;
