"use client";

import { FC, ComponentProps, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import "./VerticalStackCarousel.scss";

type Prop = ComponentProps<"div">;

interface StackCardProps {
  index: number;
  total: number;
  scroll: any;
  children: React.ReactNode;
}

const StackCard: FC<StackCardProps> = ({ index, total, scroll, children }) => {
  /** Quanto mais baixo o card na pilha, mais ele atrasa */
  const start = index * 0.15; // atraso progressivo
  const end = start + 0.5; // janela de animação

  // progressão local do item
  const localProgress = useTransform(scroll, [start, end], [-0.1, 0.5], {
    clamp: false,
  });

  // animações
  const scale = useTransform(localProgress, [0, 1], [1, 0.80]);
  // const opacity = useTransform(localProgress, [0, 1], [1, 0.80]);
  const y = useTransform(localProgress, [0, 1], [0, -120], { clamp: true });

  return (
    <motion.div
      className="stack-card"
      style={{
        scale,
        // opacity,
        y,
        zIndex: total + index, // ← o 0 vai pra trás ao scrollar
      }}
    >
      {children}
    </motion.div>
  );
};

const VerticalStackCarousel: FC<Prop> = ({ children, ...props }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] 
  });

  const array = Array.isArray(children) ? children : [];
  const total = array.length;

  return (
    <div id="verticalStackCarousel" ref={containerRef} {...props}>
      {array.map((child, index) => (
        <StackCard
          key={index}
          index={index}
          total={total}
          scroll={scrollYProgress}
        >
          {child}
        </StackCard>
      ))}
    </div>
  );
};

export default VerticalStackCarousel;