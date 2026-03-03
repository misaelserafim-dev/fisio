// CarouselHandle.tsx
import React from "react";

interface CarouselHandleProps {
  onMouseDown: (e: React.MouseEvent | React.TouchEvent) => void;
  children: React.ReactNode;
}

const CarouselHandle: React.FC<CarouselHandleProps> = ({
  onMouseDown,
  children,
}) => {
  return (
    <div
      className="carouselCircular__handle"
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
    >
      <div className="carouselCircular__center">{children}</div>
    </div>
  );
};

export default CarouselHandle;
