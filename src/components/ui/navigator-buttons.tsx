import { ChevronLeft, ChevronRight } from "lucide-react";

export const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
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

export const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow prev-arrow opacity-0 group-hover:opacity-100 transition-opacity`}
      style={{ ...style }}
      onClick={onClick}>
      <div className=" w-10 h-10 bg-blue-400 rounded-md flex items-center justify-center">
        <ChevronLeft size={24} color="#fff" />
      </div>
    </div>
  );
};
