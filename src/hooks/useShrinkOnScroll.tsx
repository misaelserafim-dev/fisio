import { useEffect } from "react";

export function useShrinkOnScroll(selector: string) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;

          // Quando estiver visível => remove efeito
          if (entry.isIntersecting) {
            el.classList.remove("hidden-element");
          } else {
            // Quando estiver saindo pela parte superior => aplica efeito
            if (entry.boundingClientRect.top < 0) {
              el.classList.add("hidden-element");
            }
          }
        });
      },
      {
        threshold: 0.4,
        rootMargin: "-5% 0px -10% 0px", 
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector]);
}