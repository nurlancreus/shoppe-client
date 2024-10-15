"use client";

import { formatCurrency } from "@/lib/helpers/client-helpers";
import React, { useState } from "react";
import Button from "./button";
import CartItem from "./cart-item";
import { CartItemType } from "@/lib/types";
import IconButton from "../shared/icon-button";
import SvgIcon from "../shared/svg-icon";
import { useRouter } from "next/navigation";

const initialCartItems: CartItemType[] = [
  {
    id: "1",
    title: "Product 1",
    category: "Category 1",
    price: 20,
    imageUrl: "https://via.placeholder.com/600x400?text=Product+1",
    quantity: 2, // Use quantity instead of initialQuantity
  },
  {
    id: "2",
    title: "Product 2",
    category: "Category 2",
    price: 35,
    imageUrl: "https://via.placeholder.com/600x400?text=Product+2",
    quantity: 1, // Use quantity instead of initialQuantity
  },
];

export default function SideCart({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) {
  const [cart, setCart] = useState<CartItemType[]>(initialCartItems);
  const router = useRouter();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleIncrement = (id: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleDecrement = (id: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item,
      ),
    );
  };

  const handleRemove = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-10" onClick={close} />}
      <aside
        className={`fixed bottom-0 right-0 top-0 z-30 flex w-[22.5rem] flex-col gap-9 border-l border-l-gray bg-white px-9 pb-6 pt-[4.5rem] transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <IconButton onClick={close} className="absolute right-6 top-6 z-50">
          <SvgIcon id="close" height={20} width={20} />
        </IconButton>
        <h5 className="mb-4 text-h5-desktop">Shopping bag</h5>
        <div className="flex h-20 grow flex-col space-y-5">
          <p className="mb-1 text-body-small text-dark-gray">
            {cart.length} items
          </p>
          <div className="grow space-y-5 overflow-y-auto">
            {cart.map((cartItem) => (
              <CartItem
                variant="sidebar"
                key={cartItem.id}
                cartItem={cartItem}
                quantity={cartItem.quantity}
                handleIncrement={() => handleIncrement(cartItem.id)}
                handleDecrement={() => handleDecrement(cartItem.id)}
                handleRemove={handleRemove}
              />
            ))}
          </div>
          <div className="px-4 pt-5 text-h5-desktop">
            <div className="mb-5 flex items-center justify-between">
              <p>Subtotal ({cart.length} items)</p>
              <p>{formatCurrency(subtotal)}</p>
            </div>
            <Button
              type="button"
              variant="outlined"
              className="w-full uppercase"
              onClick={() => router.push("/cart")}
            >
              View Cart
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
