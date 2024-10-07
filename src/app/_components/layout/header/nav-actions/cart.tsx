"use client";
import IconButton from "@/components/shared/icon-button";
import SvgIcon from "@/components/shared/svg-icon";

export default function Cart() {
  return (
    <IconButton onClick={() => console.log("cart")}>
      <SvgIcon id="shopping-cart" />
    </IconButton>
  );
}
