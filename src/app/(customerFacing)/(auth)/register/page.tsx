"use client";
import Input from "@/components/ui/input";
import Link from "next/link";
import { useFormState } from "react-dom";
import SubmitButton from "@/components/ui/submit-button";
import { registerAction } from "@/lib/_actions/auth";

export default function RegisterPage() {
  const [state, action] = useFormState(registerAction, {
    errors: {
      validation: {},
    },
  });

  return (
    <form id="register-form" name="register-form" action={action}>
      <Input
        type="text"
        name="firstName"
        id="firstName"
        placeholder="First Name"
        className="text-h5-desktop text-dark-gray"
        formControllClassName="mb-6"
        error={state?.errors?.validation?.firstName} // Display error if present
      />
      <Input
        type="text"
        name="lastName"
        id="lastName"
        placeholder="Last Name"
        className="text-h5-desktop text-dark-gray"
        formControllClassName="mb-6"
        error={state?.errors?.validation?.lastName} // Display error if present
      />
      <Input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        className="text-h5-desktop text-dark-gray"
        formControllClassName="mb-6"
        error={state?.errors?.validation?.email} // Display error if present
      />
      <Input
        type="text"
        name="userName"
        id="userName"
        placeholder="Username"
        className="text-h5-desktop text-dark-gray"
        formControllClassName="mb-6"
        error={state?.errors?.validation?.userName} // Display error if present
      />
      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        className="text-h5-desktop text-dark-gray"
        formControllClassName="mb-6"
        error={state?.errors?.validation?.password} // Display error if present
      />
      <Input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm Password"
        className="text-h5-desktop text-dark-gray"
        formControllClassName="mb-6"
        error={state?.errors?.validation?.confirmPassword} // Display error if present
      />
      <SubmitButton className="mt-8 w-full uppercase">Register</SubmitButton>
      <Link href="/login" className="mt-4 block text-center text-h5-desktop">
        Already have an account? Sign in
      </Link>
    </form>
  );
}
