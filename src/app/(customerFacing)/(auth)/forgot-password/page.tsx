import Input from "@/components/ui/input";
import SubmitButton from "@/components/ui/submit-button";
import Link from "next/link";
import React from "react";

export default function ForgotPasswordPage() {
  return (
    <form
      id="forgot-password-form"
      name="forgot-password-form"
      className="mt-20"
    >
      <Input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        error=""
        className="pb-3 text-h5-desktop text-dark-gray"
      />

      <SubmitButton className="mt-16 w-full uppercase">
        Reset password
      </SubmitButton>
      <Link href="/login" className="mt-3 block text-center text-h5-desktop">
        Remembered your password? Sign in
      </Link>
    </form>
  );
}
