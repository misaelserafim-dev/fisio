import { FC } from "react";

type PaginationDotProps = {
  page: any;
  titleCurrent: string;
  titleLabel: string;
  pageCurrent: any;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & React.ComponentProps<"button">;

const PaginationDot: FC<PaginationDotProps> = ({ page, pageCurrent, titleCurrent, titleLabel, onClick }) => {
  return (
    <button
      title={`${page === pageCurrent ? titleCurrent : `${titleLabel} ${page}`}`}
      className={`pagination__dot ${page === pageCurrent && "active"}`}
      onClick={(e) => onClick?.(e)}
    >
      <span className="pagination__titleDot">{page}</span>
    </button>
  );
};

export default PaginationDot;
