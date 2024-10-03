import React from "react";

import { ProductType } from "@/types";
import { fetchData } from "@/utils/helpers";
import ProductInfo from "./product-info";
import ProductImages from "./product-images";

// const productImages = [
//   {
//     id: "1",
//     url: "https://via.placeholder.com/600x400?text=Main+Image",
//     isMain: true,
//   },
//   {
//     id: "2",
//     url: "https://via.placeholder.com/150?text=Image+1",
//     isMain: false,
//   },
//   {
//     id: "3",
//     url: "https://via.placeholder.com/150?text=Image+2",
//     isMain: false,
//   },
//   {
//     id: "4",
//     url: "https://via.placeholder.com/150?text=Image+3",
//     isMain: false,
//   },
//   {
//     id: "5",
//     url: "https://via.placeholder.com/150?text=Image+4",
//     isMain: false,
//   },
// ];

export default async function ProductDetails({ id }: { id: string }) {
  const product = await fetchData<ProductType>(`/products/${id}`);

  return (
    <div className="flex items-center justify-between gap-16">
      <ProductImages images={product.images} />
      <ProductInfo avRating={product.avRating} info={product.description} price={product.price} title={product.name}/>
    </div>
  );
}
