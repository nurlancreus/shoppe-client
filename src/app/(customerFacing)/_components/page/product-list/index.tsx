import CardWrapper from "@/components/shared/card-wrapper";
import ShopHeader from "../../ui/shop-header";
import { PaginatedResponse, ProductDTOType } from "@/lib/types";
import Product from "@/components/ui/product";
import httpClient from "@/lib/helpers/http-client";

export default async function ProductList() {
  const result = await httpClient.get<PaginatedResponse<ProductDTOType>>("/products", {cache: "no-store"});

  return (
    <section id="product-list">
      <ShopHeader title="Shop the Latest" href="/shop" />
      <CardWrapper
        gap="lg"
        columns={3}
        data={result.data}
        rowHeight="lg"
        renderProps={(product) => {
          return <Product key={product.id} imageSize="lg" product={product} />;
        }}
      />
    </section>
  );
}
