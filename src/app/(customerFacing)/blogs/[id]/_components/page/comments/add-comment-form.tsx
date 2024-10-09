"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import React, { useState } from "react";

type AddCommentProps = {
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  } | null;
};
export default function AddComment({ user = null }: AddCommentProps) {
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    };
    if (!firstName) newErrors.firstName = "First name is required.";
    if (!lastName) newErrors.lastName = "Last name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!message) newErrors.message = "Review body is required.";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission
    if (validateForm()) {
      // Proceed with form submission logic here
      console.log({ firstName, lastName, email, message });
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
      case "message":
        setMessage(value);
        break;
      default:
        break;
    }
  };
  return (
    <form
      id="add-review-form"
      name="add-review-form"
      className="mt-12"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-11">
        {!user && (
          <>
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
          </>
        )}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="save-me"
            id="save-me"
            className="size-5 cursor-pointer accent-black"
          />
          <label htmlFor="save-me" className="text-sm text-dark-gray">
            Save my name, email, and website in this browser for the next time I
            comment
          </label>
        </div>
        <Input
          type="textarea"
          name="message"
          id="message"
          placeholder="Your Comment*"
          rows={4}
          value={message}
          onChange={handleInputChange}
          error={errors.message} // Pass error message
        />
      </div>
      <Button className="mt-12">Post Comment</Button>
    </form>
  );
}
