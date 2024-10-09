"use client";
import Input from "@/components/ui/input";
import React, { useState } from "react";
import SelectInput from "../../../../../../components/ui/select-input";
import Button from "@/components/ui/button";

const contactFormSubjects = [
  { value: "general", label: "General Inquiry" },
  { value: "support", label: "Customer Support" },
  { value: "sales", label: "Sales" },
  { value: "feedback", label: "Feedback" },
  { value: "careers", label: "Careers" },
  { value: "partnerships", label: "Partnerships" },
  { value: "billing", label: "Billing" },
  { value: "technical", label: "Technical Issue" },
  { value: "press", label: "Press Inquiry" },
  { value: "other", label: "Other" },
];

export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    subject: "",
  });
  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    };
    if (!firstName) newErrors.firstName = "First name is required.";
    if (!lastName) newErrors.lastName = "Last name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!subject) newErrors.subject = "Subject is required.";
    if (!message) newErrors.message = "Review body is required.";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      console.log({ firstName, lastName, email, subject, message });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
      case "subject":
        setSubject(value);
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
      id="contact-form"
      name="contact-form"
      onSubmit={handleSubmit}
      className="mt-28"
    >
      <div className="grid grid-cols-2 gap-x-24 gap-y-20">
        <Input
          type="text"
          name="first-name"
          id="first-name"
          placeholder="First name*"
          value={firstName}
          onChange={handleInputChange}
          error={errors.firstName}
          className="text-h5-desktop"
        />
        <Input
          type="text"
          name="last-name"
          id="last-name"
          placeholder="Last name*"
          value={lastName}
          onChange={handleInputChange}
          error={errors.lastName}
          className="text-h5-desktop"
        />
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Email*"
          value={email}
          onChange={handleInputChange}
          error={errors.email}
          className="text-h5-desktop"
        />
        <SelectInput
          value={subject}
          id="subject"
          onChange={handleInputChange}
          error={errors.subject}
          options={contactFormSubjects}
        />
      </div>
      <Input
        type="textarea"
        name="message"
        id="message"
        placeholder="Your Review*"
        rows={0}
        value={message}
        onChange={handleInputChange}
        error={errors.message}
        className="text-h5-desktop"
      />

      <Button className="mt-28 px-56 uppercase">Send</Button>
    </form>
  );
}
