import PageHeader from "@/app/admin/_components/layout/page-header";
import PageTitle from "@/app/admin/_components/layout/page-title";
import React from "react";
import CategoryForm from "../../_components/category-form";
import Link from "next/link";
import { Button } from "@/app/admin/_components/ui/button";
import { HttpClient } from "@/lib/helpers/http-client";
import { AppResponseWithData, CategoryDTOType } from "@/lib/types";

export const revalidate = 0;

const httpClient = new HttpClient();
export default async function UpdateCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await httpClient.get<AppResponseWithData<CategoryDTOType>>(
    `/categories/${params.id}`,
  );
  console.log(params, data);

  return (
    <div>
      <PageHeader>
        <PageTitle className="mb-6">Update Category</PageTitle>
        <Button variant="link" asChild>
          <Link href="/admin/categories"> Go Back</Link>
        </Button>
      </PageHeader>
      <CategoryForm category={data.data} />
    </div>
  );
}
