// components/ProductsPage.tsx
import React from "react";
import PageTitle from "../_components/layout/page-title";

import ProductTable from "./_components/product-table";
import { Button } from "../_components/ui/button";
import Link from "next/link";
import PageHeader from "../_components/layout/page-header";
import { PaginatedResponse, ProductDTOType } from "@/lib/types";
import httpClient from "@/lib/helpers/http-client";

export const revalidate = 0;

export default async function ProductsPage() {
  const data =
    await httpClient.get<PaginatedResponse<ProductDTOType>>("/products");

  return (
    <div>
      <PageHeader>
        <PageTitle>Products</PageTitle>
        <Button
          asChild
          variant="default"
          className="hover:bg-slate-200 hover:text-slate-900"
        >
          <Link href="products/add"> + Add Product</Link>
        </Button>
      </PageHeader>
      <div>
        <ProductTable products={data.data} />
      </div>
    </div>
  );
}
