import { ReviewType } from "@/types";
import React from "react";
import Review from "./review";

export default function ReviewList({
  reviews,
}: {
  reviews: Array<ReviewType>;
}) {
  return (
    <div className="flex flex-col gap-10 divide-y divide-light-gray">
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
}
