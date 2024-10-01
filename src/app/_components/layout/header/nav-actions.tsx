"use client";

import IconButton from "@/components/shared/icon-button";
import SvgIcon from "@/components/shared/svg-icon";

export default function NavActions() {
  return (
    <div className="flex items-center gap-10">
      <IconButton
        onClick={() => {
          console.log("search");
        }}
      >
        <SvgIcon id="search" />
      </IconButton>
      <IconButton
        onClick={() => {
          console.log("cart");
        }}
      >
        <SvgIcon id="shopping-cart" />
      </IconButton>
      <IconButton
        onClick={() => {
          console.log("user");
        }}
      >
        <SvgIcon id="user" />
      </IconButton>
    </div>
  );
}
