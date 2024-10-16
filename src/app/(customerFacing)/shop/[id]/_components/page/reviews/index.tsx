import { PaginatedResponse, ProductDTOType, ReviewType } from "@/lib/types";
import AddReview from "./add-review";
import ReviewList from "./review-list";
import httpClient from "@/lib/helpers/http-client";
import ReviewContextProvider from "@/lib/context/ReviewContextProvider";
import { getSession } from "@/lib/helpers/server-helpers";
import Link from "next/link";

export default async function Reviews({
  product,
}: {
  product: ProductDTOType;
}) {
  const result = await httpClient.get<PaginatedResponse<ReviewType>>(
    `/products/${product.id}/reviews`,
    {cache: "no-store"}
  );

  const reviews = result.data ?? [];
  const session = getSession();

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
        {session?.isAuth ? (
          <AddReview productId={product.id} />
        ) : (
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
              <p className="text-h4-desktop">
                First you need to sign in, then add review.
              </p>
              <Link href="/login" className="bg-accent-custom inline-block rounded-md px-6 py-2 text-white">
                Sign in
              </Link>
            </div>
          </div>
        )}
      </div>
    </ReviewContextProvider>
  );
}
