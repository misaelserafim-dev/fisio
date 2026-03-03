import { FC, ReactNode } from "react";

interface CarouselSlideProps {
  children: ReactNode;
}

const CarouselSlide: FC<CarouselSlideProps> = ({ children }) => {
  return <div className="carouselDefault__slide">{children}</div>;
};

export default CarouselSlide;
