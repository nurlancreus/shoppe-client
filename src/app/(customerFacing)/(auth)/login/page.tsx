"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import Link from "next/link";
import { loginSchema, LoginSchema } from "./login-schema";
import { loginAction } from "@/lib/_actions/auth";
import Spinner from "@/components/ui/spinner";
import Button from "@/components/ui/button";

export default function LoginPage() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: LoginSchema) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("rememberMe", data.rememberMe ? "true" : "false");

      await loginAction(formData);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <FormProvider {...form}>
      <form id="login-form" name="login-form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          formControllClassName="mb-11"
        />

        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          formControllClassName="mb-11"
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="rememberMe"
            className="size-4 accent-black"
            {...register("rememberMe")}
          />
          <label htmlFor="rememberMe">Remember me</label>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-16 flex w-full items-center gap-2 uppercase"
        >
          {isSubmitting && <Spinner />} Login
        </Button>

        {(errors.email || errors.password) && (
          <p className="mt-4 text-red-600">Wrong Credentials</p>
        )}

        <Link
          href="/forgot-password"
          className="mt-3 block text-center text-h5-desktop"
        >
          Have you forgotten your password? Reset Password
        </Link>
      </form>
    </FormProvider>
  );
}
