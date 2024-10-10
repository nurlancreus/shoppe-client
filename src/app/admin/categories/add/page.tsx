import React from "react";
import PageTitle from "../../_components/layout/page-title";
import CategoryForm from "../_components/category-form";
import PageHeader from "../../_components/layout/page-header";
import { Button } from "../../_components/ui/button";
import Link from "next/link";

export default function AddCategoryPage() {
  return (
    <div>
      <PageHeader>
        <PageTitle className="mb-6">Add a new Category</PageTitle>
        <Button variant="link" asChild>
          <Link href="/admin/categories"> Go Back</Link>
        </Button>
      </PageHeader>
      <CategoryForm />
    </div>
  );
}
