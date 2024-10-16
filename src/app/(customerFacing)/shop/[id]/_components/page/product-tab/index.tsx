import { AppResponseWithData, ProductDTOType } from "@/lib/types";
import TabButtons from "./tab-buttons";
import TabContent from "./tab-content";
import AdditionalInfo from "../product-details/additional-info";
import Reviews from "../reviews";
import httpClient from "@/lib/helpers/http-client";

export default async function ProductTab({
  id,
  currentTab = "description",
}: {
  id: string;
  currentTab: string;
}) {
  const result = await httpClient.get<AppResponseWithData<ProductDTOType>>(
    `/products/${id}`,
  );

  const product = result.data;

  return (
    <section className="my-24">
      <TabButtons />
      <TabContent>
        {currentTab === "description" && <p>{product.description}</p>}
        {currentTab === "additional-info" && (
          <AdditionalInfo info={{
            colors: product.colors,
            dimentions: [product.width, product.height],
            weight: product.weight,
            materials: product.materials
          }} />
        )}
        {currentTab === "reviews" && <Reviews product={product} />}
      </TabContent>
    </section>
  );
}
