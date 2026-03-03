"use client";
import "./TagList.scss";
import { FC, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const TagList: FC<{
  categories: any;
  category?: any;
  allTag: string;
  setLoading?: (v: boolean) => void;
}> = ({ categories, category, allTag, setLoading }) => {
  const path = usePathname();
  const [selected, setSelected] = useState(category || "todos");
  const sliced = (input: string) => {
    const sliced = input.indexOf("/", input.indexOf("/") + 1);
    return sliced === -1 ? input : input.slice(0, sliced);
  };

  return (
    <div className="tagList__tagContainer">
      {categories?.length > 0 && (
        <>
          <Link
            onClick={() => {
              setSelected("todos");
              setLoading && setLoading(true);
            }}
            className={`tagList__tag ${selected == "todos" && "tagList__tag--selected"}`}
            href={sliced(path)}
          >
            <span className="tagList__tagTitle">{allTag}</span>
          </Link>
          {categories?.map((item: any, i: number) => (
            <Link
              onClick={() => {
                setSelected(item?.slug);
                setLoading && setLoading(true);
              }}
              key={i}
              className={`tagList__tag ${selected == item?.slug && "tagList__tag--selected"}`}
              href={`${sliced(path)}/${item?.slug}`}
            >
              <span className="tagList__tagTitle" dangerouslySetInnerHTML={{ __html: item?.name }} />
            </Link>
          ))}
        </>
      )}
    </div>
  );
};
export default TagList;
