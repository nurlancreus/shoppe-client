"use client";
import Star from "@/components/ui/star";

type ProductRatingProps = {
  defaultRating: number;
  totalStars?: number;
  reviews?: { length: number };
};

export default function Rating({
  defaultRating,
  totalStars = 5,
  reviews = { length: 0 },
}: ProductRatingProps) {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: totalStars }, (_, i) => (
        <Star key={i} isFull={defaultRating > i} />
      ))}
      {reviews.length > 0 && (
        <span className="text-gray-600 ml-2 text-sm">
          {reviews.length} customer review{reviews.length > 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
}
