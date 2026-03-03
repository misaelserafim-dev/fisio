import { FC } from "react";
import ImgDefault from "../ImgDefault/ImgDefault";

type ArrowDirectionProps = {
  disabled: boolean;
  src: string;
  title: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & React.ComponentProps<"button">;

const ArrowDirection: FC<ArrowDirectionProps> = ({ disabled, src, title, onClick }) => {
  return (
    <button title={title} className={`pagination__arrow ${disabled && "disabled"}`} onClick={(e) => onClick?.(e)}>
      <ImgDefault src={src} alt={title} />
    </button>
  );
};

export default ArrowDirection;
