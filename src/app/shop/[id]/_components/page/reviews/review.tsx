import React from "react";
import Rating from "../../ui/rating";
import { RatingValueType, ReviewType } from "@/types";
import { formatDate } from "@/utils/helpers";

type ReviewProps = {
  review: ReviewType;
};

export default function Review({
  review: { firstName, lastName, date, body, rating },
}: ReviewProps) {
  return (
    <article className="py-6">
      <div className="mb-4 flex items-center gap-4">
        <h5 className="text-h3-desktop font-normal">
          {firstName} {lastName}
        </h5>
        <span>{formatDate(date)}</span> {/* Use the formatDate function here */}
      </div>
      <Rating defaultRating={rating as RatingValueType} />
      <p className="mt-6 text-h5-desktop text-dark-gray">{body}</p>
    </article>
  );
}
