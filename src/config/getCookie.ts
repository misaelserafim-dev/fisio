"use server";
import { Locale } from "@/locales/locales";
import { cookies } from "next/headers";

const getCookie = async () => {
  const localeDefault = process.env.NEXT_PUBLIC_DEFAULT_LOCALE as Locale;
  if (typeof window === "undefined") return localeDefault;
  try {
    const ck = await cookies();
    const locale = ck.get("domatech:locale")?.value as Locale;
    return locale || localeDefault;
  } catch (error) {
    return localeDefault;
  }
};
export default getCookie;
