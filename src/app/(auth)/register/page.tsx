"use client";
import Input from "@/components/ui/input";
import Link from "next/link";
import { useFormState } from "react-dom";
import { registerAction } from "../../_components/_actions/users";
import SubmitButton from "@/components/ui/submit-button";

export default function RegisterPage() {
  const [errors, action] = useFormState(registerAction, {});

  return (
    <form id="register-form" name="register-form" action={action}>
      <Input
        type="text"
        name="firstName"
        id="firstName"
        placeholder="First Name"
        className="text-h5-desktop text-dark-gray"
        formControllClassName="mb-6"
        error={errors?.firstName?.[0]} // Display error if present
      />
      <Input
        type="text"
        name="lastName"
        id="lastName"
        placeholder="Last Name"
        className="text-h5-desktop text-dark-gray"
        formControllClassName="mb-6"
        error={errors?.lastName?.[0]} // Display error if present
      />
      <Input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        className="text-h5-desktop text-dark-gray"
        formControllClassName="mb-6"
        error={errors?.email?.[0]} // Display error if present
      />
      <Input
        type="text"
        name="userName"
        id="userName"
        placeholder="Username"
        className="text-h5-desktop text-dark-gray"
        formControllClassName="mb-6"
        error={errors?.userName?.[0]} // Display error if present
      />
      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        className="text-h5-desktop text-dark-gray"
        formControllClassName="mb-6"
        error={errors?.password?.[0]} // Display error if present
      />
      <Input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm Password"
        className="text-h5-desktop text-dark-gray"
        formControllClassName="mb-6"
        error={errors?.confirmPassword?.[0]} // Display error if present
      />
      <SubmitButton className="mt-8 w-full uppercase">Register</SubmitButton>
      <Link href="/login" className="mt-4 block text-center text-h5-desktop">
        Already have an account? Sign in
      </Link>
    </form>
  );
}
