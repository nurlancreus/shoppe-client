import { ReviewType } from "@/lib/types";
import React from "react";
import Review from "./review";

export default function ReviewList({
  reviews,
}: {
  reviews: Array<ReviewType>;
}) {
  console.log(reviews);
  return (
    <div className="flex h-96 flex-col gap-10 divide-y divide-light-gray overflow-y-auto">
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
}
