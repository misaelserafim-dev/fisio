"use client";
import { useEffect, MutableRefObject, useState, useRef } from "react";

type UseClickOutsideParams = {
  initialState?: boolean;
  groupClass?: string;
  callBackActive?: () => void;
  callBackInactive?: () => void;
  ignoreClasses?: string | string[]; // Accepts a single class or an array of classes
};

const useClickOutside = (
  params?: UseClickOutsideParams // Make params optional
): [boolean, (val: boolean | ((prev: boolean) => boolean)) => void, MutableRefObject<HTMLDivElement | null>] => {
  const { initialState = false, groupClass, callBackActive, callBackInactive, ignoreClasses } = params || {};

  const [active, setActive] = useState(initialState);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isLastItem = (element: HTMLElement): boolean => {
      const items = document.querySelectorAll(groupClass || "");
      if (items.length === 0) return false;
      const lastItem = items[items.length - 1];
      return lastItem === element;
    };

    const handleClickOutside = (event: MouseEvent): void => {
      if (groupClass && !isLastItem(ref.current as HTMLElement)) return;

      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (ignoreClasses) {
          const classesToIgnore = Array.isArray(ignoreClasses) ? ignoreClasses : [ignoreClasses];
          let targetElement = event.target as HTMLElement | null;
          while (targetElement && targetElement !== document.body) {
            if (classesToIgnore.some((cls) => targetElement && targetElement.classList.contains(cls))) {
              return;
            }
            targetElement = targetElement.parentElement;
          }
        }
        setTimeout(() => setActive(false), 150);
        return;
      }
      setActive(true);
    };

    if (active) {
      document.addEventListener("mousedown", handleClickOutside);
      callBackActive && callBackActive();
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    } else {
      callBackInactive && callBackInactive();
    }
  }, [ref, active, groupClass, callBackActive, callBackInactive, ignoreClasses]);

  return [active, setActive, ref];
};

export default useClickOutside;
