"use client";
import "./InputSearch.scss";
import { FC, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type PropsInputSearch = {
  category: string | undefined;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputSearch: FC<PropsInputSearch> = ({ category, ...props }) => {
  const router = useRouter();
  const params = useSearchParams();
  const search = params.get("search");
  const [inputSearch, setInputSearch] = useState(search || "");

  const push = (seacher = inputSearch) => {
    router.push(
      seacher ? `/blog${category ? `/${category}?` : "?"}search=${seacher}` : `/blog${category ? `/${category}` : ""}`,
      { scroll: false }
    );
  };

  const handleSearch = (e: any) => {
    setInputSearch((prev) => {
      if (prev.length < 3 && !search) return e.target.value;
      setTimeout(() => {
        push(e.target.value);
      }, 150);
      return e.target.value;
    });
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      push();
    }
  };

  return (
    <div className="inputSearch">
      <input className="inputSearch__input" onChange={handleSearch} value={inputSearch} onKeyDown={handleKeyDown} {...props} />
    </div>
  );
};

export default InputSearch;
