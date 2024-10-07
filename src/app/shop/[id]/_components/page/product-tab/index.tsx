import { ProductType } from "@/types";
import { fetchData } from "@/utils/client-utils";
import TabButtons from "./tab-buttons";
import TabContent from "./tab-content";
import AdditionalInfo from "../product-details/additional-info";
import Reviews from "../reviews";

export default async function ProductTab({
  id,
  currentTab,
}: {
  id: string;
  currentTab: string;
}) {
  const product = await fetchData<ProductType>(`/products/${id}`);

  return (
    <section className="my-24">
      <TabButtons />
      <TabContent>
        {currentTab === "description" && <p>{product.description}</p>}
        {currentTab === "additional-info" && (
          <AdditionalInfo info={product.additionalInfo} />
        )}
        {currentTab === "reviews" && <Reviews product={product} />}
      </TabContent>
    </section>
  );
}
