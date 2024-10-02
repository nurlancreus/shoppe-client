import CardWrapper from "@/components/shared/card-wrapper";
import ShopHeader from "../../ui/shop-header";
import { fetchData } from "@/utils/helpers";
import { type ProductType } from "@/types";
import Product from "@/components/ui/product";

export default async function ProductList() {
  const products = await fetchData<Array<ProductType>>("/products");

  return (
    <section id="product-list" className="mb-64">
      <ShopHeader title="Shop the Latest" href="/shop" />
      <CardWrapper
        gap="lg"
        columns={3}
        data={products}
        rowHeight="lg"
        renderProps={(product) => {
          return <Product key={product.id} imageSize="lg" product={product} />;
        }}
      />
    </section>
  );
}
