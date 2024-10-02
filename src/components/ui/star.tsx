import React from "react";
import SvgIcon from "../shared/svg-icon";

type StarProps = {
  onClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  onMouseEnter: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  isFull: boolean;
};

export default function Star({
  onClick,
  isFull,
  onMouseEnter,
  onMouseLeave,
}: StarProps) {
  return (
    <span
      role="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isFull ? (
        <SvgIcon id="heart" className="text-black" />
      ) : (
        <SvgIcon id="heart" />
      )}
    </span>
  );
}
