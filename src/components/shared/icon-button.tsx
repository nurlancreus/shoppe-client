"use client";

import React from "react";

type IconButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
};
export default function IconButton({
  children,
  className,
  onClick,
}: IconButtonProps) {
  return (
    <button
      className={`border-none bg-transparent ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
