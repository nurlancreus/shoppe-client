import { ProductDTOType } from "@/lib/types";
import { formatCurrency, generateImageUrl } from "@/lib/helpers/client-helpers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProductProps = {
  product: ProductDTOType;
  imageSize?: keyof typeof imageSizeStyles; // New prop for image size
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const imageSizeStyles = {
  sm: "h-24 w-24", // Small size
  md: "size-[18.75rem]", // Medium size
  lg: "size-[23.75rem]", // Large size
};

const isNew = false;
const category = "";

export default function Product({
  product: { id, discount, name, price, stock, productImages },
  imageSize = "md", // Default image size
}: ProductProps) {
  // Calculate the discounted price if discount exists
  const discountedPrice = discount ? price - (price * discount) / 100 : price;

  const mainImage = productImages.find((image) => image.isMain);

  return (
    <article className="group cursor-pointer">
      <div className="relative mb-6 overflow-hidden rounded-lg">
        {/* Display badges conditionally */}
        {(discount != null || stock === 0 || isNew || category) && (
          <div className="absolute left-4 top-4 space-y-1">
            {discount != null && (
              <span className="block rounded-sm bg-accent-custom px-2 py-[2px] text-xs text-white">
                -{discount}%
              </span>
            )}
            {category && (
              <span className="block rounded-sm bg-black px-2 py-[2px] text-xs text-white">
                {category}
              </span>
            )}
            {stock === 0 && (
              <span className="block rounded-sm bg-accent-custom px-2 py-[2px] text-xs text-white">
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
        <Link href={`/shop/${id}`}>
          <Image
            src={generateImageUrl(mainImage?.pathName ?? "", mainImage?.fileName ?? "")} // Use product's actual imageUrl
            alt={name}
            width={imageSize == "lg" ? 380 : imageSize == "md" ? 300 : 300}
            height={imageSize == "lg" ? 380 : imageSize == "md" ? 300 : 300}
            //fill
            style={{ objectFit: "cover" }}
            className={`transition-transform duration-300 ease-in-out group-hover:scale-105 ${imageSizeStyles[imageSize]}`} // Apply image size styles
          />
          <div className="absolute inset-0 flex items-end justify-center bg-white bg-opacity-20 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
        </Link>

        {/* Hover Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 w-full translate-y-full transform bg-white bg-opacity-50 py-4 text-center transition-transform duration-300 ease-in-out group-hover:translate-y-0">
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
            <span className="text-h4-desktop text-accent-custom">
              {formatCurrency(discountedPrice)}{" "}
            </span>
          </div>
        ) : (
          <p className="text-h4-desktop text-accent-custom">{formatCurrency(price)}</p>
        )}
      </div>
    </article>
  );
}
