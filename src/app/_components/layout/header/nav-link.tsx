"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

type NavLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: "header" | "footer";
};

export function NavLink({ variant = "header", ...props }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={clsx(
        "pb-6 text-black border-b-2 border-b-transparent transition duration-300 hover:opacity-80",
        variant === "header" ? "text-h5-desktop" : "text-sm font-normal",
        pathname === props.href && "border-b-black",
      )}
    />
  );
}
