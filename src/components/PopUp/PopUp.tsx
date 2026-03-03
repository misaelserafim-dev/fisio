"use client";
import "./PopUp.scss";
import { FC } from "react";
import TextDefault from "../TextDefault/TextDefault";
import ImgDefault from "../ImgDefault/ImgDefault";
import ButtonDefault from "../Buttons/ButtonDefault/ButtonDefault";

interface PopUpProps {
  data: { title: string; description: string };
  active: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PopUp: FC<PopUpProps> = ({ data, active = false, onClick }) => {
  if (!data) return;

  return (
    <div className={`popUp ${active && "popUp--active"}`}>
      <button className="popUp__overlay" onClick={(e) => onClick?.(e)} />

      <div className="popUp__container">
        <div className="popUp__header">
          <div className="popUp__titleContainer">
            <TextDefault className="popUp__title">{data?.title}</TextDefault>
          </div>
        </div>

        <div className="popUp__body">
          <figure className="popUp__iconContainer">
            <ImgDefault className="popUp__icon" src="/icons/check.svg" alt="popUp Check" />
          </figure>
          <div className="popUp__descriptionContainer">
            <TextDefault className="popUp__description">{data?.description}</TextDefault>
          </div>
          <ButtonDefault variant="primary" children="Fechar" onClick={(e) => onClick?.(e)} />
        </div>
      </div>
    </div>
  );
};

export default PopUp;
