"use client";
import { usePathname } from "next/navigation";
import { NavLink } from "@/components/shared/nav-link";

export default function Nav() {
  const pathname = usePathname();

  if (pathname === "/forgot-password") return null;

  return (
    <nav className="mb-32 mt-16 flex items-center rounded-lg bg-gray p-1 [&>*]:flex-1">
      <NavLink href={"/login"} variant="auth">
        Sign in
      </NavLink>
      <NavLink href={"/register"} variant="auth">
        Register
      </NavLink>
    </nav>
  );
}
