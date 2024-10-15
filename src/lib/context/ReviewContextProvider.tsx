"use client";
import React, { createContext, useContext, useState } from "react";

const ReviewContext = createContext<{
  isEdit: boolean;
  reviewId: string;
  handleEditReview: (id: string) => void;
}>({ isEdit: false, reviewId: "", handleEditReview: () => {} });

export default function ReviewContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [reviewState, setReviewState] = useState({
    isEdit: false,
    reviewId: "",
  });

  const handleEditReview = (id: string) => {
    setReviewState((p) => {
      const newState = {
        isEdit: true,
        reviewId: id,
      };
      return newState;
    });
  };
  return (
    <ReviewContext.Provider
      value={{
        isEdit: reviewState.isEdit,
        reviewId: reviewState.reviewId,
        handleEditReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

export const useReviewContext = () => {
  return useContext(ReviewContext);
};
