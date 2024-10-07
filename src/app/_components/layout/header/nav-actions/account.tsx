"use client";

import { useState } from "react";
import Dropdown from "@/components/shared/dropdown";
import { useRouter } from "next/navigation";
import IconButton from "@/components/shared/icon-button";
import SvgIcon from "@/components/shared/svg-icon";
//import { cookies } from "next/headers"; // Import cookies to access and modify cookie store

type NavItem = {
  id: number;
  href: string;
  label: string;
};

const ACCOUNT_NAV: NavItem[] = [
  { id: 1, href: "/admin", label: "Admin Panel" },
  { id: 2, href: "/login", label: "Sign in" },
  { id: 3, href: "/register", label: "Register" },
  { id: 4, href: "#", label: "Logout" }, // Add Logout item
];

export default function Account({ isAuth = false }: { isAuth?: boolean }) {
  const [isOpened, setIsOpened] = useState(false);
  const router = useRouter();

  const handleCloseDropdown = () => setIsOpened(false);

  // Logout function to clear cookies
  const handleLogout = () => {
    // const cookieStore = cookies();

    // // Clear the authentication cookies
    // cookieStore.delete("accessToken");
    // cookieStore.delete("refreshToken");
    // cookieStore.delete("expiresAt");
console.log("logout")
    // Optionally redirect to login page after logout
    // router.push("/login");
  };

  const menu = ACCOUNT_NAV.filter((item) => 
    isAuth ? item.label !== "Sign in" && item.label !== "Register" : item.label === "Sign in" || item.label === "Register"
  ).map((item) => ({
    id: item.id,
    label: item.label,
    action: item.label === "Logout" ? handleLogout : () => {
      router.push(item.href);
    },
  }));

  return (
    <div>
      <IconButton onClick={() => setIsOpened((p) => !p)}>
        <SvgIcon id="user" />
      </IconButton>
      <Dropdown isOpened={isOpened} close={handleCloseDropdown} menu={menu} />
    </div>
  );
}
