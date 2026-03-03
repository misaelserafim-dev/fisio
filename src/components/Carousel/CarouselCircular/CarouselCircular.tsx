"use client";
import "./CarouselCircular.scss";
import { ReactNode, Ref, useRef, useState, useEffect, forwardRef, useCallback, useMemo, memo, Children } from "react";
import { lerp } from "@/utils/circularUtils";
import CarouselItem from "./CarouselItem";
import CarouselHandle from "./CarouselHandle";

interface CircularCarousel {
  scrollTo: (i: number) => void;
}

interface CircularCarouselProps {
  onSelect?: (index: number) => void;
  onSwapRight?: () => void;
  onPointerDown?: () => void;
  children: ReactNode;
  arcSize: number;
  cloneCount?: number;
  initialSlide?: number; // The initial slide to navigate to after rendering
}

const CircularCarouselComp = (
  { onSelect, onSwapRight, onPointerDown, children, arcSize, initialSlide = 0, cloneCount = 3 }: CircularCarouselProps,
  ref: Ref<CircularCarousel>
) => {
  const indexRef = useRef(0);
  const prevRef = useRef(0);
  const nextRef = useRef(0);
  const rendering = useRef(false);
  const [deg, setDeg] = useState(0);
  const [wrapper, setWrapper] = useState<HTMLDivElement | null>(null);

  const handleSetWrapper = useCallback((ref: HTMLDivElement | null) => {
    setWrapper(ref);
  }, []);

  prevRef.current = deg;
  const clonedChildren = useMemo(() => {
    const originalChildren = Children.toArray(children);
    const clones = [];

    // Repeat the original children `cloneCount` times on each side
    for (let i = 0; i < cloneCount; i++) {
      clones.push(...originalChildren);
    }

    return [
      ...clones, // Cloned at the beginning
      ...originalChildren, // Middle section (original)
      ...clones // Cloned at the end
    ];
  }, [children, cloneCount]);

  const len = useMemo(() => Children.count(clonedChildren), [clonedChildren]);

  const move = useCallback(() => {
    const next = nextRef.current;
    const prev = prevRef.current;
    const deg = lerp(prev, next, 0.2);
    if (deg !== prev) {
      setDeg(deg);
      requestAnimationFrame(move);
    } else {
      rendering.current = false;
    }
    const index = Math.round(Math.abs(((deg / arcSize) * len) % len));
    if (index !== indexRef.current) {
      indexRef.current = index;
      onSelect && onSelect(index);
    }
  }, [onSelect, len]);

  const scrollTo = useCallback(
    (i: number) => {
      const _deg = (-arcSize / len) * i;
      nextRef.current = _deg;
      if (!rendering.current) {
        rendering.current = true;
        requestAnimationFrame(move);
      }
    },
    [len, move]
  );

  const onNext = useCallback(() => {
    const nextIndex = (indexRef.current + 1) % len;
    scrollTo(nextIndex);
  }, [scrollTo, len]);

  const onPrev = useCallback(() => {
    const prevIndex = (indexRef.current - 1 + len) % len;
    scrollTo(prevIndex);
  }, [scrollTo, len]);

  useEffect(() => {
    if (initialSlide > 0 && initialSlide < len) {
      let currentStep = 0;

      const navigateNext = () => {
        if (currentStep < initialSlide) {
          onNext();
          currentStep += 1;
          setTimeout(navigateNext, 150);
        }
      };

      setTimeout(navigateNext, 150);
    }
  }, [initialSlide, onNext, len, 150]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const isTouch = e.type === "touchstart";
      let _deg = deg;

      onPointerDown && onPointerDown();

      const tryMove = (next: number) => {
        _deg = nextRef.current += next;
        _deg = nextRef.current = Math.min(_deg, 3);
        _deg = nextRef.current = Math.max(_deg, -arcSize + 3);
        if (!rendering.current) {
          rendering.current = true;
          requestAnimationFrame(move);
        }
      };

      const onMouseMove = ({ movementX }: MouseEvent) => {
        tryMove(movementX / 30);
      };

      let prevTouchPageX: number | undefined;
      const onTouchMove = ({ touches }: TouchEvent) => {
        const pageX = touches[0].pageX;
        if (prevTouchPageX) {
          const movementX = pageX - prevTouchPageX;
          tryMove(movementX / 10);
        }
        prevTouchPageX = pageX;
      };

      const onMouseUp = () => {
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("touchend", onMouseUp);

        const angle = arcSize / len;
        const mod = _deg % angle;
        const diff = angle - Math.abs(mod);
        const sign = Math.sign(_deg);
        const max = angle * (len - 1);

        if (_deg > 0) {
          if (onSwapRight && indexRef.current === 0 && _deg > 2) {
            onSwapRight();
          }
          tryMove(-_deg);
        } else if (-_deg > max) {
          tryMove(-_deg - max);
        } else {
          const move = (diff <= angle / 2 ? diff : mod) * sign;
          tryMove(move);
        }
      };
      if (isTouch) {
        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("touchend", onMouseUp);
      } else {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      }
    },
    [deg, move, onPointerDown, onSwapRight, len]
  );

  return (
    <div className="carouselCircular" ref={handleSetWrapper}>
      <div className="carouselCircular__buttonsContainer">
        <button onClick={onPrev} className="carouselCircular__button carouselCircular__button--prev" />
        <button onClick={onNext} className="carouselCircular__button carouselCircular__button--next" />
      </div>
      <CarouselHandle onMouseDown={onMouseDown}>
        <div className="carouselCircular__items" style={{ transform: `rotate(${deg}deg)` }}>
          {Children.map(clonedChildren, (child, i) => {
            const className =
              i === indexRef.current
                ? "carouselCircular__item--slideCenter"
                : i === (indexRef.current - 1 + len) % len
                ? "carouselCircular__item--slidePrev"
                : i === (indexRef.current + 1) % len
                ? "carouselCircular__item--slideNext"
                : "";
            return (
              <CarouselItem className={className} key={i} rotation={i * (arcSize / len)} len={len}>
                {child}
              </CarouselItem>
            );
          })}
        </div>
      </CarouselHandle>
    </div>
  );
};

const CircularCarousel = memo(forwardRef(CircularCarouselComp));

export default CircularCarousel;
