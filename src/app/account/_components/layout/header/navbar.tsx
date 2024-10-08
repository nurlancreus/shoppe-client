"use client";

import { NavLink } from "@/components/shared/nav-link";
// import { usePathname } from "next/navigation";
import React from "react";

const NAVIGATION_ROUTES = [
  {
    id: 1,
    path: "/account",
    label: "dashboard",
  },
  {
    id: 2,
    path: "/account/orders",
    label: "orders",
  },
  {
    id: 3,
    path: "/account/downloads",
    label: "downloads",
  },
  {
    id: 4,
    path: "/account/addresses",
    label: "addresses",
  },
  {
    id: 5,
    path: "/account/details",
    label: "account details",
  },
];

export default function Navbar() {
  //const pathname = usePathname();

  return (
    <>
      {/* {pathname === "/account" && (
        <h1 className="mb-16 text-center text-h1-desktop capitalize">
          My Account
        </h1>
      )} */}
      <nav>
        <ul className="flex items-center gap-12 border-b border-b-gray">
          {NAVIGATION_ROUTES.map((nav_route) => (
            <li key={nav_route.id}>
              <NavLink href={nav_route.path} variant="account-header">
                {nav_route.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
