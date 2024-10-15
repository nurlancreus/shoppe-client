import React from "react";
import Rating from "../../ui/rating";
import { RatingValueType, ReviewType } from "@/lib/types";
import { formatDate } from "@/lib/helpers/client-helpers";
import EditReviewBtn from "./edit-review-btn";

type ReviewProps = {
  review: ReviewType;
};

export default function Review({
  review: { id, firstName, lastName, createdAt, body, rating },
}: ReviewProps) {
  return (
    <article className="py-6 pr-2">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h5 className="text-h3-desktop font-normal">
            {firstName} {lastName}
          </h5>
          <span>{formatDate(createdAt)}</span>
        </div>
        <EditReviewBtn id={id} />
      </div>
      <Rating defaultRating={rating as RatingValueType} />
      <p className="mt-6 text-h5-desktop text-dark-gray">{body}</p>
    </article>
  );
}
