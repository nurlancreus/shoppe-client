"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const NAVIGATION_ROUTES = [
  {
    id: 1,
    path: "/admin/address",
    label: "Address",
  },
  {
    id: 2,
    path: "/admin/blogs",
    label: "Blogs",
  },
  {
    id: 4,
    path: "/admin/categories",
    label: "Categories",
  },
  {
    id: 5,
    path: "/admin/contact",
    label: "Contact",
  },
  {
    id: 6,
    path: "/admin/products",
    label: "Products",
  },
  {
    id: 9,
    path: "/admin/review",
    label: "Review",
  },
  {
    id: 10,
    path: "/admin/slider",
    label: "Slider",
  },
  {
    id: 12,
    path: "/admin/social-links",
    label: "Social Links",
  },
  {
    id: 13,
    path: "/admin/subscriber",
    label: "Subscribers",
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="mb-16 bg-slate-900 py-4">
      <div className="container mx-auto">
        <ul className="flex items-center justify-center gap-4">
          {NAVIGATION_ROUTES.map(({ id, path, label }) => (
            <li key={id}>
              <Button
                asChild
                variant={pathname === path ? "outline" : "default"}
                className="hover:bg-slate-200 hover:text-slate-900"
              >
                <Link href={path}> {label}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
