"use client";
import { useState } from "react";
import AddRating from "./add-rating";
import { RatingValueType } from "@/types";
import Input from "../../../../../../components/ui/input";
import Button from "@/components/ui/button";

export default function AddReview() {
  const [rating, setRating] = useState<RatingValueType>(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [reviewBody, setReviewBody] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    reviewBody: "",
  });

  const handleRating = (rating: RatingValueType) => {
    setRating(rating);
  };

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      reviewBody: "",
    };
    if (!firstName) newErrors.firstName = "First name is required.";
    if (!lastName) newErrors.lastName = "Last name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!reviewBody) newErrors.reviewBody = "Review body is required.";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission
    if (validateForm()) {
      // Proceed with form submission logic here
      console.log({ rating, firstName, lastName, email, reviewBody });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case "first-name":
        setFirstName(value);
        break;
      case "last-name":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "review-body":
        setReviewBody(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h5 className="mb-3 text-h3-desktop">Add Review</h5>
      <p className="text-sm text-dark-gray">
        Your email address will not be published. Required fields are marked *
      </p>
      <form
        id="add-review-form"
        name="add-review-form"
        className="mt-12"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-11">
          <Input
            type="text"
            name="first-name"
            id="first-name"
            placeholder="Enter your first name*"
            value={firstName}
            onChange={handleInputChange}
            error={errors.firstName} // Pass error message
          />
          <Input
            type="text"
            name="last-name"
            id="last-name"
            placeholder="Enter your last name*"
            value={lastName}
            onChange={handleInputChange}
            error={errors.lastName} // Pass error message
          />
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email*"
            value={email}
            onChange={handleInputChange}
            error={errors.email} // Pass error message
          />
          <Input
            type="textarea"
            name="review-body"
            id="review-body"
            placeholder="Your Review*"
            rows={4}
            value={reviewBody}
            onChange={handleInputChange}
            error={errors.reviewBody} // Pass error message
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="save-me"
              id="save-me"
              className="size-5 cursor-pointer accent-black"
            />
            <label htmlFor="save-me" className="text-sm text-dark-gray">
              Save my name, email, and website in this browser for the next time
              I comment
            </label>
          </div>

          <div>
            <p className="mb-3 text-sm text-dark-gray">Your Rating *</p>
            <AddRating onSetRating={handleRating} />
          </div>
        </div>
        <Button className="mt-12">
          Submit
        </Button>

      </form>
    </div>
  );
}
