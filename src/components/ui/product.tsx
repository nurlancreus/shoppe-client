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
  };
};

export default function Product({
  product: { id, discount, name, price, stock },
}: ProductProps) {
  return (
    <article>
      <Link href={`/products/${id}`}>
        <div>
          <div className="relative mb-6 overflow-hidden rounded-lg">
            {(discount != null || stock === 0) && (
              <span className="absolute left-4 top-4 rounded-sm bg-accent px-2 py-[2px]">
                {discount != null && stock === 0 && <span>- {discount} %</span>}

                {discount != null && <span>- {discount} %</span>}
                {stock === 0 && <span> Sold out</span>}
              </span>
            )}
            <Image
              src={"/images/product-01.png"}
              alt={name}
              width={380}
              height={380}
            />
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-h3-desktop">{name}</h4>
            <p className="text-h4-desktop text-accent">
              {formatCurrency(price)}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
