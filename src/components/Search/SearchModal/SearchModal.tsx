import "./SearchModal.scss";
import { forwardRef, useState, ChangeEvent, useMemo } from "react";
import SearchInput from "../SearchInput/SearchInput";
import SearchItem from "../SearchItem/SearchItem";

interface SearchModalProps {
  active: boolean;
  search?: any[];
}

const SearchModal = forwardRef<HTMLDivElement, SearchModalProps>(({ active, search = [] }, ref) => {
  const [textSearch, setTextSearch] = useState<string>("");
  const filteredItems = useMemo(() => {
    if (!search) return [];
    return search.filter((item) => item.title.toLowerCase().includes(textSearch.toLowerCase()));
  }, [search, textSearch]);

  const interactiveElementTabIndex = active ? 0 : -1;

  return (
    <div ref={ref} className={`searchModal ${active && "searchModal--active"}`}>
      <SearchInput
        placeholder="Busque por produtos ou conteúdos..."
        value={textSearch}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTextSearch(e.target.value)}
        tabIndex={interactiveElementTabIndex}
      />
      <div className="searchModal__itemsContainer">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <SearchItem key={index} tabIndex={interactiveElementTabIndex} {...{ item, textSearch }} />
          ))
        ) : (
          <div className="searchModal__emptyContainer">
            <p className="searchModal__emptyText">
              {textSearch ? "Nenhum resultado encontrado para sua busca." : "Digite algo para pesquisar."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

export default SearchModal;
