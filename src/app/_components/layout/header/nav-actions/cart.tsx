"use client";
import IconButton from "@/components/shared/icon-button";
import SvgIcon from "@/components/shared/svg-icon";
import SideCart from "@/components/ui/side-cart";
import { useState } from "react";

export default function Cart() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <>
      <IconButton onClick={() => setIsCartOpen((p) => !p)}>
        <SvgIcon id="shopping-cart" />
      </IconButton>
      <SideCart isOpen={isCartOpen} close={() => setIsCartOpen(false)} />
    </>
  );
}
