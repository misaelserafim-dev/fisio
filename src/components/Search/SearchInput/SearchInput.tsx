import "./SearchInput.scss";
import { FC, ComponentProps } from "react";

type SearchInputProps = ComponentProps<"input"> & {
  data?: any;
};

const SearchInput: FC<SearchInputProps> = ({ data, ...props }) => {
  return (
    <div className="searchInput">
      <input className="searchInput__input" {...props} />
      <figure className="searchInput__iconContainer">
        <img className="searchInput__icon" src={"/icons/magnifying.svg"} alt={"Ícone de busca"} />
      </figure>
    </div>
  );
};

export default SearchInput;
