"use client";
import { usePathname } from "next/navigation";

export default function Titles() {
  const pathname = usePathname();

  const title =
    pathname === "/forgot-password"
      ? "Have you Forgotten Your Password ?"
      : "My Account";
  const subTitle =
    pathname === "/forgot-password"
      ? "If you've forgotten your password, enter your e-mail address and we'll send you an e-mail"
      : null;

  return (
    <>
      <h1 className="text-center text-h1-desktop font-semibold">{title}</h1>
      {subTitle && (
        <p className="mt-10 px-8 text-center text-h3-desktop">{subTitle}</p>
      )}
    </>
  );
}
