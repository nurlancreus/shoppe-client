import { AppResponseWithData, ProductDTOType } from "@/lib/types";
import ProductInfo from "./product-info";
import ProductImages from "./product-images";
import httpClient from "@/lib/helpers/http-client";

export default async function ProductDetails({ id }: { id: string }) {
  const result = await httpClient.get<AppResponseWithData<ProductDTOType>>(
    `/products/${id}`,
  );

  const product = result.data;

  return (
    <div className="flex items-center justify-between gap-16">
      <ProductImages images={product.productImages} />
      <ProductInfo
        avRating={product.rating}
        info={product.description}
        price={product.price}
        title={product.name}
      />
    </div>
  );
}
