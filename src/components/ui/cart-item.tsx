"use client";

import { formatCurrency } from "@/lib/helpers/client-helpers";
import React from "react";
import CartActions from "./cart-actions";
import Image from "next/image";
import { CartItemType } from "@/lib/types";
import IconButton from "../shared/icon-button";
import SvgIcon from "../shared/svg-icon";

type SideCartItemProps = {
  variant: "sidebar" | "page";
  cartItem: CartItemType;
  quantity: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
  handleRemove: (id: string) => void;
};

export default function SideCartItem({
  variant,
  cartItem,
  quantity,
  handleIncrement,
  handleDecrement,
  handleRemove,
}: SideCartItemProps) {
  return (
    <article className="relative flex gap-2">
      <IconButton
        onClick={() => handleRemove(cartItem.id)}
        className="absolute right-0 top-0"
      >
        <SvgIcon id="close" height={8} width={8} />
      </IconButton>
      <div className="relative size-32">
        <Image src={cartItem.imageUrl} alt={cartItem.title} fill />
      </div>
      <div className="flex flex-col">
        <div className="mb-auto flex flex-col gap-2">
          <p className="text-body-medium">{cartItem.title}</p>
          <p className="text-body-medium text-dark-gray">{cartItem.category}</p>
          <p className="text-body-medium text-accent">
            {formatCurrency(cartItem.price)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-body-small text-dark-gray">QTY:</span>
          <CartActions
            variant={variant}
            quantity={quantity}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
        </div>
      </div>
    </article>
  );
}
