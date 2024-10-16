import ProductDetails from "./_components/page/product-details/index.tsx"; // wrote full pathname (index.tsx included)
import ProductTab from "./_components/page/product-tab/index.tsx";
import SimilarItems from "./_components/page/similar-items/index.tsx";

export default async function Product({
  searchParams,
  params,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  // WARNING: PAGES NOT LOADING FAST ENOUGH, RATING AND SIMILAR ITEMS WERE EMTPY FIRST
  return (
    <div className="mt-32">
      <ProductDetails id={params.id} />
      <ProductTab id={params.id} currentTab={searchParams.tab as string} />
      <SimilarItems id={params.id} />
    </div>
  );
}
