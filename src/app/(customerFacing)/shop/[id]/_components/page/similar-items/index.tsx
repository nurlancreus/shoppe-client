import CardWrapper from "@/components/shared/card-wrapper";
import Product from "@/components/ui/product";
import { PaginatedResponse, ProductDTOType } from "@/lib/types";
import httpClient from "@/lib/helpers/http-client";

export default async function SimilarItems({ id }: { id: string }) {
  const result =
    await httpClient.get<PaginatedResponse<ProductDTOType>>("/products");

  console.log(result.data, "result data");

  const products = result.data.filter((p) => p.id !== id);
  return (
    <section>
      <h5 className="mb-12 text-h2-desktop">Similar items</h5>

      <CardWrapper
        gap="lg"
        data={products.slice(0, 3)}
        rowHeight="lg"
        columns={3}
        renderProps={(p) => <Product imageSize="lg" key={p.id} product={p} />}
      />
    </section>
  );
}
