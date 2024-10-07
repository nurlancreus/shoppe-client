"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

type NavLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant: "header" | "footer" | "auth";
};

export function NavLink({ variant, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const indexOfSecondSlash = pathname.indexOf("/", 1);

  let path = pathname;

  if (indexOfSecondSlash !== -1) path = pathname.slice(0, indexOfSecondSlash);

  return (
    <Link
      {...props}
      className={clsx(
        "group relative inline-block pb-2 transition duration-300 hover:opacity-80",
        variant === "header" && "text-h5-desktop text-black",
        variant === "footer" && "text-h5-desktop uppercase text-dark-gray",
        variant === "auth" && "grid place-items-center py-3 text-h3-desktop",
        (variant === "header" || variant === "footer") &&
          pathname === props.href &&
          "text-black",
        variant === "auth" && pathname === props.href && "bg-white", // Change text color if active
      )}
    >
      {props.children}
      {variant !== "auth" && path === props.href && (
        <span className="absolute bottom-[-16px] left-0 right-0 h-[2px] bg-black opacity-100 transition-opacity duration-300"></span>
      )}
    </Link>
  );
}
