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
  const indexOfLastSlash = pathname.lastIndexOf("/");

  let path = pathname;

  if (indexOfLastSlash !== 0) path = pathname.slice(0, indexOfLastSlash);

  return (
    <Link
      {...props}
      className={clsx(
        "group relative inline-block pb-2 transition duration-300 hover:opacity-80",
        variant === "header"
          ? "text-h5-desktop text-black"
          : "text-h5-desktop uppercase text-dark-gray",
        pathname === props.href && "text-black", // Change text color if active
      )}
    >
      {props.children}
      {path === props.href && (
        <span className="absolute bottom-[-16px] left-0 right-0 h-[2px] bg-black opacity-100 transition-opacity duration-300"></span>
      )}
    </Link>
  );
}
