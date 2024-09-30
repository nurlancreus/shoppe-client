type SvgIconProps = {
  width?: number;
  height?: number;
  id: string;
  className?: string;
};

export default function SvgIcon({
  width = 20,
  height = 20,
  id,
  className = "",
}: SvgIconProps) {
  return (
    <svg
      width={width}
      height={height}
      className={`${className} [&_path]:fill-current`}
      aria-hidden="true"
    >
      {/* Ensure correct path */}
      <use href={`/icons/sprite.svg#${id}`} />
    </svg>
    
  );
}
