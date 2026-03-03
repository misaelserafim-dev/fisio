import { useEffect, useRef, useCallback } from "react";

const useVideoControl = (siblingClass: string) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const checkActiveClass = useCallback(() => {
    const sibling = document.querySelector(`.${siblingClass}`);
    if (sibling && videoRef.current) {
      if (sibling.classList.contains("active")) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [siblingClass]);

  useEffect(() => {
    const sibling = document.querySelector(`.${siblingClass}`);
    if (sibling) {
      const observer = new MutationObserver(checkActiveClass);
      observer.observe(sibling, {
        attributes: true,
        attributeFilter: ["class"]
      });

      checkActiveClass();

      return () => {
        observer.disconnect();
      };
    }
  }, [siblingClass, checkActiveClass]);

  return videoRef;
};

export default useVideoControl;
