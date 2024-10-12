import PageTitle from "@/app/admin/_components/layout/page-title";
import React from "react";
import ProductForm from "../../_components/product-form";
import PageHeader from "@/app/admin/_components/layout/page-header";
import { Button } from "@/app/admin/_components/ui/button";
import Link from "next/link";
import {
  AppResponseWithData,
  CategoryDTOType,
  PaginatedResponse,
  ProductDTOType,
} from "@/types";
import { HttpClient } from "@/lib/http-client";

const httpClient = new HttpClient();

export default async function UpdateProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const result = await httpClient.get<AppResponseWithData<ProductDTOType>>(
    `/products/${id}`,
  );

  const categoryResult = await httpClient.get<
    PaginatedResponse<CategoryDTOType>
  >("/categories?type=product");
  const colors = await httpClient.get<string[]>("/products/colors");
  const materials = await httpClient.get<string[]>("/products/materials");

  return (
    <div>
      <PageHeader>
        <PageTitle className="mb-6">Update Product</PageTitle>
        <Button variant="link" asChild>
          <Link href="/admin/products"> Go Back</Link>
        </Button>
      </PageHeader>
      <ProductForm
        product={result.data}
        categories={categoryResult.data}
        colors={colors}
        materials={materials}
      />
    </div>
  );
}
