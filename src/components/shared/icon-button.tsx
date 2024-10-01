"use client";

import React from "react";

type IconButtonProps = {
  children: React.ReactNode;
 onClick: () => void;
};
export default function IconButton({ children, onClick}: IconButtonProps) {
  return (
    <button className="border-none bg-transparent" onClick={onClick}>
      {children}
    </button>
  );
}
