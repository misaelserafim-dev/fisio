"use client";
import { Locale } from "@/locales/locales";
import { createContext } from "react";

type GeneralData = {
  accessibilityBanner: any;
  acceptanceCookies: any;
};

type PageData = {
  [key: string]: any;
};

interface PageDataContextType {
  general?: GeneralData;
  pageData: PageData;
  locale: Locale;
}
export const PageDataContext = createContext<PageDataContextType | null>(null);

export function PageDataProvider({ general, pageData, locale, children }: PageDataContextType & { children: React.ReactNode }) {
  return <PageDataContext.Provider value={{ general, pageData, locale }}>{children}</PageDataContext.Provider>;
}
