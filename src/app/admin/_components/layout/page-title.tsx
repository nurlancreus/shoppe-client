import clsx from "clsx";
import React from "react";

export default function PageTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={clsx("text-h1-desktop font-bold text-black", className)}>
      {children}
    </h1>
  );
}
