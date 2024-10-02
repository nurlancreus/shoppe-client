import React from "react";
import ProductImages from "../ui/product-images";
import ProductDetails from "../ui/product-details";

export default function ProductInfo() {
  return (
    <div className="flex items-center justify-between gap-16">
      <ProductImages />
      <ProductDetails />
    </div>
  );
}
