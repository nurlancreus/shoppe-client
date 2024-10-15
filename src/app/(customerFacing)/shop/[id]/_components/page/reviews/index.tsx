import { PaginatedResponse, ProductDTOType, ReviewType } from "@/lib/types";
import AddReview from "./add-review";
import ReviewList from "./review-list";
import httpClient from "@/lib/helpers/http-client";
import ReviewContextProvider from "@/lib/context/ReviewContextProvider";

export default async function Reviews({
  product,
}: {
  product: ProductDTOType;
}) {
  const result = await httpClient.get<PaginatedResponse<ReviewType>>(
    `/products/${product.id}/reviews`,
  );

  const reviews = result.data ?? [];

  return (
    <ReviewContextProvider>
      <div className="flex items-start gap-20 [&>*]:flex-1">
        <div>
          {reviews.length > 0 ? (
            <>
              <h4 className="mb-20 text-h3-desktop">
                {reviews.length} Reviews for{" "}
                <span className="capitalize">{product.name ?? ""}</span>
              </h4>
              <ReviewList reviews={reviews} />
            </>
          ) : (
            <h5 className="text-h5 text-center">
              There is no review currently
            </h5>
          )}
        </div>
        <AddReview productId={product.id} />
      </div>
    </ReviewContextProvider>
  );
}
