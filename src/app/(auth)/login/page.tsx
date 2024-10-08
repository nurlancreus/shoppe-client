"use client";

import Input from "@/components/ui/input";
import SubmitButton from "@/components/ui/submit-button";
import Link from "next/link";
import { useFormState } from "react-dom";
import { loginAction } from "../../_components/_actions/auth";

export default function LoginPage() {
  const [errors, action] = useFormState(loginAction, {});

  return (
    <form id="login-form" name="login-form" action={action}>
      <Input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value="string@example.com"
        error={errors?.email?.[0]}
        className="pb-3 text-h5-desktop text-dark-gray"
        formControllClassName="mb-11"
      />
      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value="string"
        error={errors?.password?.[0]}
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
      <Link
        href="/forgot-password"
        className="mt-3 block text-center text-h5-desktop"
      >
        Have you forgotten your password? Reset Password
      </Link>
    </form>
  );
}
