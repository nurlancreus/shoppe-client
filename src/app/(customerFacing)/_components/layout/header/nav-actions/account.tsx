"use client";

import { useState } from "react";
import Dropdown from "@/components/shared/dropdown";
import { useRouter } from "next/navigation";
import IconButton from "@/components/shared/icon-button";
import SvgIcon from "@/components/shared/svg-icon";

type NavItem = {
  id: number;
  href: string;
  label: string;
};

const ACCOUNT_NAV: NavItem[] = [
  { id: 0, href: "/admin", label: "Admin Panel" },
  { id: 1, href: "/account", label: "Account" },
  { id: 2, href: "/login", label: "Sign in" },
  { id: 3, href: "/register", label: "Register" },
  { id: 4, href: "#", label: "Logout" }, // Add Logout item
];

export default function Account({
  isAuth = false,
  userRoles = [],
}: {
  isAuth?: boolean;
  userRoles?: string[];
}) {
  const [isOpened, setIsOpened] = useState(false);
  const router = useRouter();


  const handleCloseDropdown = () => setIsOpened(false);

  const handleLogout = () => {
    fetch(`${process.env.NEXT_PUBLIC_LOCAL_ROUTE_HANDLER_URL}/auth/logout`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        router.refresh();
        // router.push("/login");
      });
  };

  const isAdmin = userRoles.includes("admin");

  const menu = ACCOUNT_NAV.filter((item) =>
    isAuth
      ? item.label !== "Sign in" &&
        item.label !== "Register" &&
        (item.label !== "Admin Panel" || isAdmin)
      : item.label === "Sign in" || item.label === "Register",
  ).map((item) => ({
    id: item.id,
    label: item.label,
    action:
      item.label === "Logout"
        ? handleLogout
        : () => {
            router.push(item.href);
          },
  }));

  return (
    <div>
      <IconButton onClick={() => setIsOpened((prev) => !prev)}>
        <SvgIcon id="user" />
      </IconButton>
      <Dropdown isOpened={isOpened} close={handleCloseDropdown} menu={menu} />
    </div>
  );
}
