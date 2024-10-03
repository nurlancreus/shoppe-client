import React from "react";
import SvgIcon from "../shared/svg-icon";

type StarProps = {
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  isFull: boolean;
};

export default function Star({
  isFull,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: StarProps) {
  return (
    <span
      role="button"
      onClick={(e) => onClick?.(e)} // Call onClick only if it exists
      onMouseEnter={(e) => onMouseEnter?.(e)} // Call onMouseEnter only if it exists
      onMouseLeave={(e) => onMouseLeave?.(e)} // Call onMouseLeave only if it exists
    >
      {isFull ? (
        <SvgIcon id="star" className="text-black" />
      ) : (
        <SvgIcon id="star" className="text-transparent" />
      )}
    </span>
  );
}
