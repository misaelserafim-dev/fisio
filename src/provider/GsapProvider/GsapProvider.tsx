// components/GsapProvider.tsx
"use client";
import gsap from "gsap";
import { FC, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { CustomEase, ScrollSmoother, ScrollTrigger } from "gsap/all";

const GsapProvider: FC<{ children: ReactNode }> = ({ children }) => {
  gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, CustomEase);
  return <>{children}</>;
};

export default GsapProvider;
