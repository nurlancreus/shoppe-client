import { Button } from "../_components/ui/button";
import PageHeader from "../_components/layout/page-header";
import PageTitle from "../_components/layout/page-title";
import CategoryTable from "./_components/category-table";
import Link from "next/link";
import { CategoryDTOType, PaginatedResponse } from "@/types";
import { HttpClient } from "@/lib/http-client";

const httpClient = new HttpClient(process.env.BASE_API_URL!);

export default async function CategoriesPage() {
  // Fetch categories data using HttpClient
  const data =
    await httpClient.get<PaginatedResponse<CategoryDTOType>>("/categories");

  console.log(data);

  return (
    <div>
      <PageHeader>
        <PageTitle>Categories</PageTitle>
        <Button
          asChild
          variant="default"
          className="hover:bg-slate-200 hover:text-slate-900"
        >
          <Link href="categories/add"> + Add Category</Link>
        </Button>
      </PageHeader>
      <div>
        <CategoryTable data={data} />
      </div>
    </div>
  );
}
