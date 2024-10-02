import { ProductType } from "@/types";
import { fetchData } from "@/utils/helpers";
import ProductInfo from "./_components/page/product-info";

export default async function Product({ params }: { params: { id: string } }) {
  console.log(params.id);

  const product = await fetchData<ProductType>(`/products/${params.id}`);

  console.log(product);
  return (
    <>
      <ProductInfo />
    </>
  );
}
