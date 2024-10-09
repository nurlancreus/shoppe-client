import PageTitle from "@/app/admin/_components/layout/page-title";
import React from "react";
import ProductForm from "../../_components/product-form";
import PageHeader from "@/app/admin/_components/layout/page-header";
import { Button } from "@/app/admin/_components/ui/button";
import Link from "next/link";
import { ProductDTOType } from "@/types";

export default function UpdateProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = {
    id: "P001",
    name: "Product 1",
    description: "Description of Product 1",
    price: 250.0,
    stock: 10,
    weight: 1.5,
    height: 10.0,
    width: 5.0,
    material: "Plastic",
    colors: ["Red", "Blue"],
    categories: [{ id: "C001", name: "Category 1" }],
    productImages: [
      {
        fileName: "product1-main.jpg",
        pathName: "https://via.placeholder.com/600x400?text=Main+Image",
        isMain: true,
      },
      {
        fileName: "product1-secondary.jpg",
        pathName: "/img2.jpg",
        isMain: false,
      },
    ],
    rating: 4.5,
    createdAt: new Date(),
  } as ProductDTOType;

  return (
    <div>
      <PageHeader>
        <PageTitle className="mb-6">Update Product</PageTitle>
        <Button variant="link" asChild>
          <Link href="/admin/products"> Go Back</Link>
        </Button>
      </PageHeader>
      <ProductForm product={product} />
    </div>
  );
}
