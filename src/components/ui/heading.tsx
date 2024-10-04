import React from "react";
import clsx from "clsx";

interface HeadingProps {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ 
  as: Component = "h3",
  className, 
  children 
}) => {
  return (
    <Component className={clsx("text-h1-desktop font-semibold", className)}>
      {children}
    </Component>
  );
};

export default Heading;
