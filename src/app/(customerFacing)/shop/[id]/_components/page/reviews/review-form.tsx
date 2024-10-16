"use client";
import {
  RatingValueType,
  ReviewType,
  UserType,
} from "@/lib/types";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddReviewSchema,
  UpdateReviewSchema,
  addReviewSchema,
  updateReviewSchema,
} from "./review-schema";
import Input from "@/components/ui/input";
import AddRating from "./add-rating";
import Button from "@/components/ui/button";
import {
  addProductReviewAction,
  updateProductReviewAction,
} from "@/lib/_actions/reviews";
import { useReviewContext } from "@/lib/context/ReviewContextProvider";
import { useEffect, useState } from "react";
import httpClient from "@/lib/helpers/http-client";

type AddReviewFormProps = {
  productId: string;
  user?: Pick<UserType, "firstName" | "lastName" | "email">;
};

export default function ReviewForm({ productId, user }: AddReviewFormProps) {
  const { isEdit, reviewId } = useReviewContext();
  const [review, setReview] = useState<ReviewType | null>(null);

  const form = useForm<AddReviewSchema | UpdateReviewSchema>({
    resolver: zodResolver(review ? updateReviewSchema : addReviewSchema),
    values: {
      // firstName: review?.firstName ?? user?.firstName ?? "",
      // lastName: review?.lastName ?? user?.lastName ?? "",
      // email: review?.email ?? user?.email ?? "",
      body: review?.body ?? "",
      rating: review?.rating ?? 0,
      //saveMe: false,
    },
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmitForm: SubmitHandler<
    AddReviewSchema | UpdateReviewSchema
  > = async (data) => {
    const formData = new FormData();
    // formData.append("firstName", data.firstName + "");
    // formData.append("lastName", data.lastName + "");
    // formData.append("email", data.email + "");
    formData.append("body", data.body + "");
    formData.append("rating", data.rating + "");
    // formData.append("saveMe", data.saveMe ? "true" : "false"); 

    console.log(Object.entries(formData.entries()));

    if (!isEdit) await addProductReviewAction(productId, formData);
    else if (isEdit && review)
      await updateProductReviewAction(review.id, formData);
  };

  // Fetch the review data when `isEdit` and `reviewId` are set
  useEffect(() => {
    if (isEdit && reviewId) {
      fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_ROUTE_HANDLER_URL}/reviews/${reviewId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json", // Proper headers
          },
        },
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch review data"); // Handle non-200 responses
          }
          return res.json(); // Parse JSON if the response is valid
        })
        .then((result) => {
          console.log(result);
          setReview(result.data); // Set the review state with fetched data
        })
        .catch((error) => {
          console.error("Error fetching review:", error);
        });
    }
  }, [isEdit, reviewId]);

  useEffect(() => {
    if (review) {
      // setValue("firstName", review.firstName);
      // setValue("lastName", review.lastName);
      // setValue("email", review.email);
      setValue("body", review.body);
      setValue("rating", review.rating); 
    }

    console.log(getValues())
  }, [review, setValue]);

  return (
    <FormProvider {...form}>
      <form
        id="add-review-form"
        name="add-review-form"
        className="space-y-6"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        {/* <Input
          type="text"
          id="first-name"
          name="firstName"
          disabled={user != null}
          placeholder="First Name"
          error={errors.firstName?.message}
          className="pb-8 pt-2"
        />
        <Input
          type="text"
          id="last-name"
          name="lastName"
          disabled={user != null}
          placeholder="Last Name"
          error={errors.lastName?.message}
          className="pb-8 pt-2"
        />
        <Input
          id="email"
          name="email"
          disabled={user != null}
          placeholder="Email"
          type="email"
          error={errors.email?.message}
          className="pb-8 pt-2"
        /> */}
        <Input
          id="review-body"
          name="body"
          placeholder="Your Review"
          type="textarea"
          error={errors.body?.message}
          rows={4}
        />
        {/* {user == null && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="saveMe"
              id="save-me"
              className="size-5 cursor-pointer accent-black"
              onChange={(e) => setValue("saveMe", e.target.checked)} // Bind to form
            />
            <label htmlFor="save-me" className="text-sm text-dark-gray">
              Save my name, email, and website in this browser for the next time
              I comment
            </label>
          </div>
        )} */}

        <div className="space-y-4">
          <p className="text-gray-600 text-sm">Your Rating *</p>
          <AddRating
            defaultRating={getValues("rating") as RatingValueType}
            onSetRating={(value) => setValue("rating", value)}
          />
          {errors.rating && (
            <div className="text-destructive">{errors.rating.message}</div>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </FormProvider>
  );
}
