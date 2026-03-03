"use client";
import "./Accordion.scss";
import { FC } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import TextDefault from "@/components/TextDefault/TextDefault";

interface AccordionProps {
  data: any;
}

const Accordion: FC<AccordionProps> = ({ data }) => {
  const [active, setActive, ref] = useClickOutside();

  return (
    <div className={`accordion ${active && "accordion--active"}`} ref={ref}>
      <div className="accordion__container" onClick={() => setActive((prev) => !prev)}>
        <div className="accordion__titleContainer">
          <TextDefault className="accordion__title">Título</TextDefault>
        </div>
        <span className={`accordion__icon ${active && "accordion__icon--active"}`} />
      </div>
      <div className={`accordion__descriptionContainer ${active && "accordion__descriptionContainer--active"}`}>
        <TextDefault className="accordion__description">texto</TextDefault>
      </div>
    </div>
  );
};

export default Accordion;
