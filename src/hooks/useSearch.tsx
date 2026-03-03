"use client";
import {
  useState,
  useCallback,
  ChangeEvent,
  KeyboardEvent,
  useRef,
  useEffect,
} from "react";
import { usePathname, useRouter } from "next/navigation";

export function useSearch(initialSearch: string | null) {
  const router = useRouter();
  const [inputSearch, setInputSearch] = useState(initialSearch || "");
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const navigateToSearch = useCallback(
    (searchValue: string) => {
      const url = searchValue
        ? `${pathname}?search=${searchValue}`
        : `${pathname}`;

      if (initialSearch !== searchValue) {
        router.push(url, { scroll: false });
      }
    },
    [router, initialSearch]
  );

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const searchValue = e.target.value;
      setInputSearch(searchValue);

      if (searchValue.length >= 3 || !searchValue) {
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
        }
        debounceTimer.current = setTimeout(() => {
          navigateToSearch(searchValue);
        }, 150);
      }
    },
    [navigateToSearch]
  );

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        navigateToSearch(inputSearch);
      }
    },
    [inputSearch, navigateToSearch]
  );

  return { inputSearch, handleSearch, handleKeyDown };
}
