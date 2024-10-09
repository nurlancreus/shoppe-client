// components/ProductsPage.tsx
import React from "react";
import PageTitle from "../_components/layout/page-title";

import ProductTable from "./_components/product-table";
import { Button } from "../_components/ui/button";
import Link from "next/link";
import PageHeader from "../_components/layout/page-header";
// import { ProductDTO } from "../types/ProductDTO";

export default function ProductsPage() {
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
        <ProductTable />
      </div>
    </div>
  );
}
