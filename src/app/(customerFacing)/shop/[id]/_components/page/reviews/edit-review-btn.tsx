"use client";

import { useReviewContext } from "@/lib/context/ReviewContextProvider";
import { EditIcon } from "lucide-react";

export default function EditReviewBtn({ id }: { id: string }) {
  const { handleEditReview } = useReviewContext();

  return (
    <button
      onClick={() => {
        handleEditReview(id);
      }}
    >
      <EditIcon width={20} height={20} />
    </button>
  );
}
