import React from "react";
import PageTitle from "../../_components/layout/page-title";
import ProductForm from "../_components/product-form";
import PageHeader from "../../_components/layout/page-header";
import { Button } from "../../_components/ui/button";
import Link from "next/link";
import { HttpClient } from "@/lib/http-client";
import { CategoryDTOType, PaginatedResponse } from "@/types";

const httpClient = new HttpClient();

export default async function AddProductPage() {
  const result = await httpClient.get<PaginatedResponse<CategoryDTOType>>(
    "/categories?type=product",
  );
  const colors = await httpClient.get<string[]>("/products/colors");
  const materials = await httpClient.get<string[]>("/products/materials");

  return (
    <div>
      <PageHeader>
        <PageTitle className="mb-6">Add a new Product</PageTitle>
        <Button variant="link" asChild>
          <Link href="/admin/products"> Go Back</Link>
        </Button>
      </PageHeader>
      <ProductForm
        categories={result.data}
        colors={colors}
        materials={materials}
      />
    </div>
  );
}
