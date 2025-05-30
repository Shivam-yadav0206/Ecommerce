import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const NextArrow: React.FC<ArrowProps> = ({
  className,
  style,
  onClick,
}) => {
  return (
    <div
      className={`${className} custom-arrow next-arrow opacity-0 group-hover:opacity-100 transition-opacity`}
      style={{ ...style }}
      onClick={onClick}>
      <div className="w-10 h-10 bg-blue-400 rounded-md flex items-center justify-center">
        <ChevronRight size={24} color="#fff" />
      </div>
    </div>
  );
};

export const PrevArrow: React.FC<ArrowProps> = ({
  className,
  style,
  onClick,
}) => {
  return (
    <div
      className={`${className} custom-arrow prev-arrow opacity-0 group-hover:opacity-100 transition-opacity`}
      style={{ ...style }}
      onClick={onClick}>
      <div className="w-10 h-10 bg-blue-400 rounded-md flex items-center justify-center">
        <ChevronLeft size={24} color="#fff" />
      </div>
    </div>
  );
};
