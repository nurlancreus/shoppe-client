"use client";
import Button from "@/components/ui/button";
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
      <Button type="button" variant="outlined" className="w-full">
        Add to Cart
      </Button>
    </div>
  );
}
