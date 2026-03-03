import "./ButtonHamburguer.scss";
import { FC, ButtonHTMLAttributes } from "react";

type ButtonHamburguerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  open: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const ButtonHamburguer: FC<ButtonHamburguerProps> = ({ open, onClick, ...props }) => {
  return (
    <button
      className={`buttonHamburguer ${open && "active"}`}
      title={open ? "Fechar menu" : "Abrir menu"}
      onClick={(e) => onClick(e)}
      {...props}
    >
      <div className={`buttonHamburguer__lineTop ${open && "buttonHamburguer__lineTop--open"}`} />
      <div className={`buttonHamburguer__lineMiddle ${open && "buttonHamburguer__lineMiddle--open"}`} />
      <div className={`buttonHamburguer__lineBottom ${open && "buttonHamburguer__lineBottom--open"}`} />
    </button>
  );
};

export default ButtonHamburguer;
