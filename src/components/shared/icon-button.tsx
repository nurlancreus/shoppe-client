"use client";

import React from "react";

type IconButtonProps = {
  children: React.ReactNode;
 // onClick: () => void;
};
export default function IconButton({ children}: IconButtonProps) {
  return (
    <button className="border-none bg-transparent">
      {children}
    </button>
  );
}
