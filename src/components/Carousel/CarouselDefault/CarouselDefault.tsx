"use client";
import "./CarouselDefault.scss";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./components/CarouselDotButton";
import { PrevButton, NextButton, usePrevNextButtons } from "./components/CarouselArrowButtons";
import AutoScroll, { AutoScrollOptionsType } from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";

type PropType = {
  options?: EmblaOptionsType;
  plugins?: React.ReactNode;
  activeSlide?: boolean;
  autoScroll?: boolean;
  autoScrollOptions?: AutoScrollOptionsType;
  children: React.ReactNode;
};

const CarouselDefault: React.FC<PropType> = ({ options, activeSlide, autoScroll, children, autoScrollOptions }) => {
  const plugins = [];
  activeSlide && plugins.push(ClassNames());
  autoScroll && plugins.push(AutoScroll({ ...autoScrollOptions }));
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <div className="carouselDefault">
      <div className="carouselDefault__viewport" ref={emblaRef}>
        <div className="carouselDefault__container">{children}</div>
      </div>

      <div className="carouselDefault__controls">
        <div className="carouselDefault__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="carouselDefault__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index + "embla__dot"}
              onClick={() => onDotButtonClick(index)}
              className={"carouselDefault__dot".concat(index === selectedIndex ? " carouselDefault__dot--selected" : "")}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselDefault;
