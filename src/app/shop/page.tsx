import CardWrapper from "@/components/shared/card-wrapper";
import Heading from "@/components/ui/heading";
import Product from "@/components/ui/product";
import { ProductType } from "@/types";
import { fetchData } from "@/utils/helpers";
import ShopFilters from "./_components/page/shop-filters";

export default async function Shop({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const products = await fetchData<Array<ProductType>>("/products");

  console.log(searchParams);
  
  return (
    <div className="mt-24">
      <header className="mb-10">
        <Heading>Shop the Latest</Heading>
      </header>
      <section>
        <div className="flex items-start gap-9">
          <div className="basis-1/4">
            <ShopFilters />
          </div>
          <CardWrapper
            gap="sm"
            columns={3}
            rowHeight="md"
            data={products}
            renderProps={(product) => (
              <Product key={product.id} product={product} imageSize="md" />
            )}
          />
        </div>
      </section>
    </div>
  );
}
