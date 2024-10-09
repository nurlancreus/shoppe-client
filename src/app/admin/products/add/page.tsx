import React from "react";
import PageTitle from "../../_components/layout/page-title";
import ProductForm from "../_components/product-form";
import PageHeader from "../../_components/layout/page-header";
import { Button } from "../../_components/ui/button";
import Link from "next/link";

export default function AddProductPage() {
  return (
    <div>
      <PageHeader>
        <PageTitle className="mb-6">Add a new Product</PageTitle>
        <Button variant="link" asChild>
          <Link href="/admin/products"> Go Back</Link>
        </Button>
      </PageHeader>
      <ProductForm />
    </div>
  );
}
