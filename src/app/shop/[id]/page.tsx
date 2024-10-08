import ProductDetails from "./_components/page/product-details/index.tsx"; // wrote full pathname (index.tsx included)
import ProductTab from "./_components/page/product-tab";
import SimilarItems from "./_components/page/similar-items";

export default async function Product({
  searchParams,
  params,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="mt-32">
      <ProductDetails id={params.id} />
      <ProductTab id={params.id} currentTab={searchParams.tab as string} />
      <SimilarItems />
    </div>
  );
}
