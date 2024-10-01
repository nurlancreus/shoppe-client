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
        "relative inline-block pb-2 transition duration-300 hover:opacity-80 group",
        variant === "header"
          ? "text-h5-desktop text-black"
          : "text-h5-desktop uppercase text-dark-gray",
        pathname === props.href && "text-black", // Change text color if active
      )}
    >
      {props.children}
      {pathname === props.href && (
        <span className="absolute left-0 right-0 bottom-[-16px] h-[2px] bg-black transition-opacity duration-300 opacity-100"></span>
      )}
    </Link>
  );
}
