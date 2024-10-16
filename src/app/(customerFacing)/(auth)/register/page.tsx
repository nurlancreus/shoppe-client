"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/input";
import Link from "next/link";
import { registerAction } from "@/lib/_actions/auth";
import { registerSchema, RegisterSchema } from "./register-schema";
import Button from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";

export default function RegisterPage() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const formData = new FormData();

      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("userName", data.userName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);

      await registerAction(formData);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        id="register-form"
        name="register-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          className="text-h5-desktop text-dark-gray"
          formControllClassName="mb-6"
          error={errors.firstName?.message}
        />
        <Input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last Name"
          className="text-h5-desktop text-dark-gray"
          formControllClassName="mb-6"
          error={errors.lastName?.message}
        />
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="text-h5-desktop text-dark-gray"
          formControllClassName="mb-6"
          error={errors.email?.message}
        />
        <Input
          type="text"
          name="userName"
          id="userName"
          placeholder="Username"
          className="text-h5-desktop text-dark-gray"
          formControllClassName="mb-6"
          error={errors.userName?.message}
        />
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="text-h5-desktop text-dark-gray"
          formControllClassName="mb-6"
          error={errors.password?.message}
        />
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="text-h5-desktop text-dark-gray"
          formControllClassName="mb-6"
          error={errors.confirmPassword?.message}
        />
        <Button type="submit" disabled={isSubmitting} className="mt-8 flex w-full items-center gap-2 uppercase">
          {isSubmitting && <Spinner />} Register
        </Button>
        <Link href="/login" className="mt-4 block text-center text-h5-desktop">
          Already have an account? Sign in
        </Link>
      </form>
    </FormProvider>
  );
}
