"use client";
import { Locale } from "@/locales/locales";
import { usePathname } from "next/navigation";

const DEFAULT_LOCALE = (process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "pt") as Locale;
const OTHER_LOCALES = (process.env.NEXT_PUBLIC_OTHER_LOCALES || "").split(",") as Locale[];

export default function useLocale(): Locale {
  const pathname = usePathname() || "";
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  if (OTHER_LOCALES.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }
  return DEFAULT_LOCALE;
}
