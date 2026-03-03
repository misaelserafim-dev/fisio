import { useState, useEffect, useRef, useCallback } from "react";

export function useRenderedCount(data: any[]) {
  const [isLoading, setIsLoading] = useState(true);
  const renderedCount = useRef(0);

  const incrementRenderedCount = useCallback(() => {
    renderedCount.current += 1;
    if (renderedCount.current === data.length) {
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    renderedCount.current = 0;
  }, [data]);

  return { isLoading, incrementRenderedCount };
}
