"use client";

import { useEffect, useState } from "react";

export const useIsSafari = (): boolean => {
  const [isSafari, setIsSafari] = useState<boolean>(false);

  useEffect(() => {
    const ua: string = window.navigator.userAgent;

    const isSafariBrowser: boolean =
      /Safari/.test(ua) &&
      !/Chrome/.test(ua) &&
      !/Chromium/.test(ua) &&
      !/Android/.test(ua);

    setIsSafari(isSafariBrowser);
  }, []);

  return isSafari;
};