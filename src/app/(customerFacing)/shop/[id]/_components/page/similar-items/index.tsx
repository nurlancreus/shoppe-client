import CardWrapper from "@/components/shared/card-wrapper";
import Product from "@/components/ui/product";
import { ProductType } from "@/types";
import { fetchData } from "@/utils/client-utils";

export default async function SimilarItems() {
  const products = await fetchData<Array<ProductType>>("/products");

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
