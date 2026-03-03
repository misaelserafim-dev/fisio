import "./SkeletonCircle.scss";
import { FC } from "react";

interface SkeletonCircleProps {
  size: "32" | "40" | "48" | "52" | "56" | "88";
}

const SkeletonCircle: FC<SkeletonCircleProps> = ({ size }) => {
  return <div className={`skeletonCircle  skeletonCircle--${size}`} />;
};

export default SkeletonCircle;
