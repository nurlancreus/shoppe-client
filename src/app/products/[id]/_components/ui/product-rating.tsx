"use client";

import Star from "@/components/ui/star";
import { useState } from "react";

type RatingValueType = 0 | 1 | 2 | 3 | 4 | 5;

type ProductRatingProps = {
  defaultRating: RatingValueType;
  totalStars?: number; // Optional prop to control the total number of stars
  reviews?: { length: number }; // Optional reviews object to display the number of reviews
  // onSetRating?: ((rating: RatingValueType) => void) | null; // Optional callback for handling rating change
};

export default function ProductRating({
  defaultRating,
  totalStars = 5,
  reviews = { length: 0 },
  // onSetRating = null,
}: ProductRatingProps) {
  const [rating, setRating] = useState<RatingValueType>(defaultRating);
  const [tempRating, setTempRating] = useState<RatingValueType>(0);

  const handleRating = (newRating: RatingValueType) => {
    const updatedRating = rating === newRating ? 0 : newRating;
    setRating(updatedRating);
    setTempRating(0);

    // if (onSetRating) onSetRating(updatedRating); // Notify parent of rating change
  };

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: totalStars }, (_, i) => (
        <Star
          key={i}
          onClick={() => handleRating((i + 1) as RatingValueType)}
          onMouseEnter={() => setTempRating((i + 1) as RatingValueType)}
          onMouseLeave={() => setTempRating(0)}
          isFull={(tempRating || rating) > i} // If tempRating exists, use it, otherwise use the actual rating
        />
      ))}
      {reviews.length > 0 && (
        <span className="text-gray-600 ml-2 text-sm">
          {reviews.length} customer review{reviews.length > 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
}
