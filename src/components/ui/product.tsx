import { formatCurrency } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProductProps = {
  product: {
    id: string;
    imageUrl: string;
    name: string;
    price: number;
    stock: number;
    discount: number | null;
    category?: string; // Added category property
    isNew?: boolean; // Added isNew property to mark new products
  };
};

export default function Product({
  product: { id, discount, name, price, stock, category, isNew },
}: ProductProps) {
  // Calculate the discounted price if discount exists
  const discountedPrice = discount ? price - (price * discount) / 100 : price;

  return (
    <article className="group relative cursor-pointer">
      <div>
        <div className="relative mb-6 overflow-hidden rounded-lg">
          {/* Display badges conditionally */}
          {(discount != null || stock === 0 || isNew || category) && (
            <div className="absolute left-4 top-4 space-y-1">
              {discount != null && (
                <span className="block rounded-sm bg-accent px-2 py-[2px] text-xs text-white">
                  -{discount}%
                </span>
              )}
              {category && (
                <span className="block rounded-sm bg-black px-2 py-[2px] text-xs text-white">
                  {category}
                </span>
              )}
              {stock === 0 && (
                <span className="block rounded-sm bg-accent px-2 py-[2px] text-xs text-white">
                  Sold Out
                </span>
              )}
              {isNew && (
                <span className="block rounded-sm bg-white px-2 py-[2px] text-xs text-black">
                  New
                </span>
              )}
            </div>
          )}

          {/* Product Image */}
          <Link href={`/products/${id}`}>
            <Image
              src={"/images/product-01.png"} // Use product's actual imageUrl
              alt={name}
              width={380}
              height={380}
              className="transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end justify-center bg-white bg-opacity-20 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
          </Link>

          {/* Hover Overlay */}
          <div className="z-10 w-full translate-y-full transform bg-white bg-opacity-50 py-4 text-center transition-transform duration-300 ease-in-out group-hover:translate-y-0">
            <button className="px-4 py-2 text-sm font-bold uppercase text-black transition">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-2">
          <h4 className="text-h3-desktop font-semibold">{name}</h4>
          {/* Display discounted price if discount exists */}
          {discount ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-red-500 line-through">
                {formatCurrency(price)}
              </span>
              <span className="text-h4-desktop text-accent">
                {formatCurrency(discountedPrice)}{" "}
              </span>
            </div>
          ) : (
            <p className="text-h4-desktop text-accent">
              {formatCurrency(price)}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
