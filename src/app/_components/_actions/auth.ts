"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { AuthResponse } from "@/types";

const registerSchema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    userName: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function registerAction(prevState: unknown, formData: FormData) {
  const result = registerSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  const response = await fetch(`${process.env.BASE_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  const tokenData = (await response.json()) as AuthResponse;

  if (tokenData) {
    const cookieStore = cookies();

    if (cookieStore.get("accessToken")) {
      cookieStore.delete("accessToken");
    }
    if (cookieStore.get("refreshToken")) {
      cookieStore.delete("refreshToken");
    }
    if (cookieStore.get("expiresAt")) {
      cookieStore.delete("expiresAt");
    }

    cookieStore.set("accessToken", tokenData.token.accessToken);
    cookieStore.set("refreshToken", tokenData.token.refreshToken);
    cookieStore.set("expiresAt", tokenData.token.expiresAt);
  }

  revalidatePath("/");
}

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function loginAction(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  const response = await fetch(`${process.env.BASE_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    console.log(error)
    throw new Error("Login failed", error);
  }

  const tokenData = await response.json();

  if (tokenData) {
    /*
    const cookieStore = cookies();

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("expiresAt");

    const isProduction = process.env.NODE_ENV === "production";

    cookieStore.set("accessToken", tokenData.token.accessToken, {
      httpOnly: true,
      path: "/",
      secure: isProduction, 
      sameSite: "strict",
    });

    cookieStore.set("refreshToken", tokenData.token.refreshToken, {
      httpOnly: true,
      path: "/",
      secure: isProduction, 
      sameSite: "strict",
    });

    cookieStore.set("expiresAt", tokenData.token.expiresAt, {
      path: "/",
      sameSite: "strict",
    });
*/
    console.log(tokenData, "TOKEN FROM RESPONSE");
    revalidatePath("/");
  }
}

export async function logoutAction() {
  const cookieStore = cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("expiresAt");
}
