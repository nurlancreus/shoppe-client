"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

type NavLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant: "header" | "footer" | "auth" | "account-header";
};

export function NavLink({ variant, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const indexOfSecondSlash = pathname.indexOf("/", 1);

  let path = pathname;

  if (indexOfSecondSlash !== -1 && variant !== "account-header")
    path = pathname.slice(0, indexOfSecondSlash);

  return (
    <Link
      {...props}
      className={clsx(
        "group relative inline-block pb-2 capitalize transition duration-300 hover:opacity-80",
        variant === "account-header" &&
          "pb-8 text-h3-desktop text-dark-gray hover:text-black",
        variant === "header" && "text-h5-desktop text-black",
        variant === "footer" && "text-h5-desktop uppercase text-dark-gray",
        variant === "auth" && "grid place-items-center py-3 text-h3-desktop",
        variant !== "auth" && pathname === props.href && "text-black",
        variant === "auth" && pathname === props.href && "bg-white", // Change text color if active
      )}
    >
      {props.children}
      {variant !== "auth" && path === props.href && (
        <span
          className={`absolute ${variant !== "account-header" ? "bottom-[-1rem]" : "bottom-[-2px]"} left-0 right-0 h-[2px] bg-black opacity-100 transition-opacity duration-300`}
        />
      )}
    </Link>
  );
}
