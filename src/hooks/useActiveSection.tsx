import { useEffect, useMemo } from "react";

type VisibilityType = "isElementInitialVisible" | "isElementHalfVisible" | "isElementFullyVisible" | "isElementPercentVisible";

/**
 * Watch one or more selectors and toggle the given class when they become visible.
 * @param selectors  A CSS selector (e.g. ".myClass") or an array of selectors (e.g. [".foo", "div.bar"])
 * @param visibility Which visibility check to use
 * @param activeClass The class name to add/remove
 * @param runOnce    If true, will add the class only the first time each element becomes visible
 */

export function useActiveSection(
  selectors: string | string[],
  visibility: VisibilityType,
  activeClass: string,
  runOnce = false,
  percent: number = 0
) {
  const selectorString = useMemo(() => {
    return Array.isArray(selectors) ? selectors.join(",") : selectors;
  }, [selectors]);

  useEffect(() => {
    const elements = Array.from<HTMLElement>(document.querySelectorAll(selectorString));

    const handleScroll = () => {
      for (let i = elements.length - 1; i >= 0; i--) {
        const el = elements[i];
        const isVisible = checkVisibility(el, visibility, percent);

        if (isVisible) {
          el.classList.add(activeClass);
          if (runOnce) {
            elements.splice(i, 1);
          }
        } else if (!runOnce) {
          el.classList.remove(activeClass);
        }
      }
    };

    handleScroll();
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [selectorString, visibility, activeClass, runOnce]);
}

// helper: dispatch to the right visibility test
function checkVisibility(element: HTMLElement, visibility: VisibilityType, percent?: number): boolean {
  switch (visibility) {
    case "isElementInitialVisible":
      return isElementInitialVisible(element);
    case "isElementHalfVisible":
      return isElementHalfVisible(element);
    case "isElementFullyVisible":
      return isElementFullyVisible(element);
    case "isElementPercentVisible":
      return isElementPercentVisible(element, percent);
    default:
      return false;
  }
}

function isElementFullyVisible(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const h = window.innerHeight;
  const w = window.innerWidth;
  const vert = rect.top >= 0 && rect.bottom <= h && rect.height <= h;
  const horz = rect.left >= 0 && rect.right <= w && rect.width <= w;
  return vert && horz;
}

function isElementHalfVisible(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const h = window.innerHeight;
  const w = window.innerWidth;
  const vert = rect.top + rect.height / 2 >= 0 && rect.bottom - rect.height / 2 <= h;
  const horz = rect.left + rect.width / 2 >= 0 && rect.right - rect.width / 2 <= w;
  return vert && horz;
}

/**
 * Returns true if at least `percent` of the element’s height
 * is visible within the viewport.
 * @param el The target HTMLElement
 * @param percent Number between 0 and 100
 */
export function isElementPercentVisible(el: HTMLElement, percent: number = 1): boolean {
  const rect = el.getBoundingClientRect();
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  // Compute the visible vertical length
  const visibleHeight = Math.max(0, Math.min(rect.bottom, viewHeight) - Math.max(rect.top, 0));
  // Required visible height threshold
  const required = (rect.height * percent) / 100;
  return visibleHeight >= required;
}

function isElementInitialVisible(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const h = window.innerHeight;
  const w = window.innerWidth;
  const vert =
    (rect.top >= 0 && rect.bottom <= h) || (rect.top <= 0 && rect.bottom >= 0) || (rect.top <= h && rect.bottom >= h);
  const horz =
    (rect.left >= 0 && rect.right <= w) || (rect.left <= 0 && rect.right >= 0) || (rect.left <= w && rect.right >= w);
  return vert && horz;
}
