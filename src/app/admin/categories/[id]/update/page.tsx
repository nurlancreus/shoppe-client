import PageHeader from "@/app/admin/_components/layout/page-header";
import PageTitle from "@/app/admin/_components/layout/page-title";
import React from "react";
import CategoryForm from "../../_components/category-form";
import Link from "next/link";
import { Button } from "@/app/admin/_components/ui/button";

export default function UpdateCategoryPage() {
  const category = {
    id: "C001",
    name: "Category 1",
    description: "This is category 1.",
  };

  return (
    <div>
      <PageHeader>
        <PageTitle className="mb-6">Update Category</PageTitle>
        <Button variant="link" asChild>
          <Link href="/admin/categories"> Go Back</Link>
        </Button>
      </PageHeader>
      <CategoryForm category={category} />
    </div>
  );
}
