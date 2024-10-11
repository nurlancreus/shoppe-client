"use client";

import { loginAction } from "@/app/_components/_actions/auth";
import Input from "@/components/ui/input";
import SubmitButton from "@/components/ui/submit-button";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function LoginPage() {
  const [state, action] = useFormState(loginAction, {
    errors: {
      validation: {},
      auth: undefined,
      server: undefined,
    },
  });

  const hasWrongCredentialsError =
    state?.errors?.auth?.general ||
    state?.errors?.validation?.email ||
    state?.errors?.validation?.password;

  return (
    <form id="login-form" name="login-form" action={action}>
      <Input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value="string@example.com"
        error={null}
        className="pb-3 text-h5-desktop text-dark-gray"
        formControllClassName="mb-11"
      />

      {/* Password Input */}
      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value="string"
        error={null}
        className="pb-3 text-h5-desktop text-dark-gray"
        formControllClassName="mb-11"
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="remember-me"
          name="remember-me"
          className="size-4 accent-black"
        />
        <label htmlFor="remember-me">Remember me</label>
      </div>

      <SubmitButton className="mt-16 w-full uppercase">Sign in</SubmitButton>

      {hasWrongCredentialsError && (
        <p className="mt-4 text-red-600">
          Wrong credentials. Please try again.
        </p>
      )}

      {state?.errors?.server?.general && (
        <p className="mt-4 text-red-600">
          Server error. Please try again later.
        </p>
      )}

      <Link
        href="/forgot-password"
        className="mt-3 block text-center text-h5-desktop"
      >
        Have you forgotten your password? Reset Password
      </Link>
    </form>
  );
}
