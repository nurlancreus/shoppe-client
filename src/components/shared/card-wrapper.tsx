const gapStyles = {
    sm: "gap-6",
    md: "gap-12",
    lg: "gap-14",
  };
  
  const columnStyles = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
  };
  
  type CardWrapperProps<T> = {
    gap: keyof typeof gapStyles;       
    columns?: keyof typeof columnStyles;  // Change to use columnStyles keys
    data: Array<T>;                      
    renderProps: (el: T) => JSX.Element; 
    className?: string;                 
  };
  
  export default function CardWrapper<T>({
    gap,
    columns = 1, 
    data,
    renderProps,
    className = "",
  }: CardWrapperProps<T>) {
    const columnClass = columnStyles[columns];  // Get column class from columnStyles
  
    return (
      <div className={`grid ${columnClass} ${gapStyles[gap]} ${className}`}>
        {data.map(renderProps)}
      </div>
    );
  }
  