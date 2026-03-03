import "./SearchItem.scss";
import { FC } from "react";
import useHighlightText from "@/hooks/useHighlightText";
import ImgDefault from "@/components/ImgDefault/ImgDefault";
import LinkDefault from "@/components/LinkDefault/LinkDefault";

interface SearchItemProps {
  item: any;
  textSearch?: string;
  tabIndex?: number;
}

const SearchItem: FC<SearchItemProps> = ({ item, textSearch, tabIndex }) => {
  return (
    <LinkDefault className="searchItem" href={item?.link} title={item?.title} {...{ tabIndex }}>
      {!!item?.image && (
        <figure className="searchItem__imgContainer">
          <ImgDefault className="searchItem__img" src={item?.image?.url} alt={item?.image?.alt} />
        </figure>
      )}
      <div className="searchItem__contentContainer">
        <div className="searchItem__textContainer">
          <span className="searchItem__label">{item?.label}</span>
          <h3 className="searchItem__title">{useHighlightText(item?.title, textSearch ?? "")}</h3>
        </div>
        <figure className="searchItem__iconContainer">
          <img className="searchItem__icon" src={`/icons/chevron-right.svg`} alt={`Ícone de flecha para a direita`} />
        </figure>
      </div>
    </LinkDefault>
  );
};

export default SearchItem;
