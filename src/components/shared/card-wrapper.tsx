const gapStyles = {
  sm: "gap-6",
  md: "gap-12",
  lg: "gap-14",
};

const columnStyles = {
  [-1]: "",
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
};

const rowStyles = {
  sm: "auto-rows-24",
  md: "auto-rows-[24.5rem]",
  lg: "auto-rows-[29.5rem]",
};

type CardWrapperProps<T> = {
  gap: keyof typeof gapStyles;
  columns?: keyof typeof columnStyles;
  rowHeight?: keyof typeof rowStyles; // New prop for row height
  data: Array<T>;
  renderProps: (el: T) => JSX.Element;
  className?: string;
};

export default function CardWrapper<T>({
  gap,
  columns = -1,
  rowHeight = undefined, // Default row height
  data,
  renderProps,
  className = "",
}: CardWrapperProps<T>) {
  const columnClass =
    columns === -1 ? "overflow-x-auto" : columnStyles[columns]; // Use scrollable class if columns is -1

  return (
    <div
      className={`grid ${columnClass} ${gapStyles[gap]} ${rowHeight ? rowStyles[rowHeight] : ""} ${className}`}
    >
      {data.map(renderProps)}
    </div>
  );
}
