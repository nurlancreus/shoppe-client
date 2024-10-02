"use client";
import CartActions from "@/components/ui/cart-actions";
import { useState } from "react";

export default function AddToCart() {
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity((p) => p + 1);
  };

  const handleDecrement = () => {
    setQuantity((p) => Math.max(0, p - 1));
  };

  return (
    <div className="mb-20 flex items-center gap-6">
      <CartActions
        quantity={quantity}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
      />
      <button className="rounded-md border border-black px-32 py-4 text-body-large font-bold uppercase transition duration-300 hover:bg-black hover:text-white">
        Add to Cart
      </button>
    </div>
  );
}
