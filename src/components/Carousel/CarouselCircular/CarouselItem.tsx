import React, { ReactNode } from "react";

interface CarouselItemProps {
  children: ReactNode;
  rotation: number;
  len: number;
  className?: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({
  className,
  children,
  rotation,
  len,
}) => (
  <div
    className={`carouselCircular__item ${className}`}
    style={{
      transform: `translateX(-50%) rotate(${rotation}deg)`,
    }}
  >
    {children}
  </div>
);

export default CarouselItem;
