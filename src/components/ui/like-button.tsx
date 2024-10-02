"use client";
import IconButton from "../shared/icon-button";
import SvgIcon from "../shared/svg-icon";

type LikeButtonProps = {
  isLiked?: boolean;
  handleClick: () => void;
};

export default function LikeButton({
  isLiked = false,
  handleClick,
}: LikeButtonProps) {
  return (
    <div className="group">
      <IconButton onClick={handleClick}>
        {isLiked ? (
          <SvgIcon id="heart" className="text-black" />
        ) : (
          <SvgIcon
            id="heart"
            className="transition duration-300 group-hover:text-black"
          />
        )}
      </IconButton>
    </div>
  );
}
