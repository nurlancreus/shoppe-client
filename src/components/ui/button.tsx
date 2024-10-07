"use client";
import clsx from "clsx";
import Spinner from "./spinner";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  variant?: "black" | "white" | "outlined";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
};

export default function Button({
  type = "button",
  variant = "black",
  className = "",
  children,
  onClick,
  disabled = false,
  isLoading = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "rounded-md px-8 py-4 text-body-large flex items-center justify-center gap-3 transition",
        {
          "hover:bg-gray-800 border bg-black text-white hover:border-black hover:bg-white hover:text-black":
            variant === "black",
          "hover:bg-gray-100 border border-black bg-white text-black hover:bg-black hover:text-white":
            variant === "white",
          "border border-current bg-transparent text-black hover:bg-black hover:text-white":
            variant === "outlined",
        },
        className,
      )}
    >
      {isLoading && <Spinner color={variant === "outlined" ? "black" : "light"} />}
      {children}
    </button>
  );
}
