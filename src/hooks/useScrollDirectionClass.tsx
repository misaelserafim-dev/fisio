"use client";

import { useScroll } from "@use-gesture/react";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo } from "react";

const isClient = typeof window !== "undefined";

const useScrollDirectionClass = (): string => {
  const [direction, setDirection] = useState<number>(0);
  const [isTop, setIsTop] = useState<boolean>(false);
  const path = usePathname();

  useScroll(
    (state) => {
      const [, scrollDirY] = state.direction;
      const [, offY] = state.offset;

      if (offY > 40) {
        setDirection(scrollDirY);
      }
      setIsTop(offY < 150);
    },
    { target: isClient ? window : undefined }
  );

  // Reinicia a direção ao mudar de rota (opcional)
  useEffect(() => {
    setDirection(0);
  }, [path]);

  // Calcula o status com base nos estados de direção e se está no topo
  const scrollStatus = useMemo(() => {
    if (isTop) return "top";
    if (direction > 0) return "down";
    if (direction < 0) return "up";
    return "";
  }, [isTop, direction]);

  return scrollStatus;
};

export default useScrollDirectionClass;
