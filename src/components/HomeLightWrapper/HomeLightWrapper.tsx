"use client";

import { ReactNode } from "react";
import { useIsSafari } from "@/hooks/useIsSafari";

interface HomeLightWrapperProps {
  children: ReactNode;
}

const HomeLightWrapper = ({ children }: HomeLightWrapperProps) => {
  const isSafari = useIsSafari();

  return (
    <div className={`${isSafari ? "home__safari" : "home__light" }`}>
      {children}
    </div>
  );
};

export default HomeLightWrapper;