import { ProductType } from "@/types";
import { fetchData } from "@/utils/helpers";
import ProductInfo from "./_components/page/product-info";
import ProductTab from "./_components/page/product-tab";
import SimilarItems from "./_components/page/similar-items";

export default async function Product({ params }: { params: { id: string } }) {
  console.log(params.id);

  const product = await fetchData<ProductType>(`/products/${params.id}`);

  console.log(product);
  return (
    <>
      <ProductInfo />
      <ProductTab />
      <SimilarItems />
    </>
  );
}
