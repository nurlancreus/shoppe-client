"use client";

import Star from "@/components/ui/star";
import { RatingValueType } from "@/lib/types";
import { useState } from "react";

type ProductRatingProps = {
  defaultRating?: RatingValueType;
  totalStars?: number; // Optional prop to control the total number of stars
  reviews?: { length: number }; // Optional reviews object to display the number of reviews
  onSetRating?: ((rating: RatingValueType) => void) | null; // Optional callback for handling rating change
};

export default function AddRating({
  defaultRating = 0,
  totalStars = 5,
  reviews = { length: 0 },
  onSetRating = null,
}: ProductRatingProps) {
  const [rating, setRating] = useState<RatingValueType>(defaultRating);
  const [tempRating, setTempRating] = useState<RatingValueType>(0);

  const handleRating = (newRating: RatingValueType) => {
    const updatedRating = rating === newRating ? 0 : newRating;
    setRating(updatedRating);
    setTempRating(0);

    if (onSetRating) onSetRating(updatedRating); // Notify parent of rating change
  };

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalStars }, (_, i) => (
        <Star
          key={i}
          onClick={() => handleRating((i + 1) as RatingValueType)}
          onMouseEnter={() => setTempRating((i + 1) as RatingValueType)}
          onMouseLeave={() => setTempRating(0)}
          isFull={(tempRating || rating) > i} // If tempRating exists, use it, otherwise use the actual rating
        />
      ))}
    </div>
  );
}
