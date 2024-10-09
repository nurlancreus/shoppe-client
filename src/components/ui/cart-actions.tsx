"use client";

import clsx from "clsx";

type CartActionsProps = {
  quantity: number;
  variant?: "sidebar" | "page";
  handleIncrement: () => void;
  handleDecrement: () => void;
};

export default function CartActions({
  variant = "page",
  quantity,
  handleIncrement,
  handleDecrement,
}: CartActionsProps) {
  return (
    <div
      className={clsx(
        "flex items-center",
        variant === "page" && "bg-light-gray text-dark-gray",
        variant === "sidebar" && "gap-2",
      )}
    >
      <button
        className={`${variant === "page" ? "p-4" : "py-1"}`}
        onClick={handleDecrement}
      >
        -
      </button>
      <span className={clsx("flex items-center", variant === "page" && "px-2")}>
        {quantity}
      </span>
      <button
        className={`${variant === "page" ? "p-4" : "py-1"}`}
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
}
