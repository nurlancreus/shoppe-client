"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { AuthResponse } from "@/types";
import { convertValidationErrors } from "@/lib/error-converter";

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

// Infer the type from the schema
type RegisterData = z.infer<typeof registerSchema>;

export async function registerAction(prevState: unknown, formData: FormData) {
  const isProduction = process.env.NODE_ENV === "production";

  const result = registerSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!result.success) {
    return {
      errors: {
        validation: result.error.formErrors.fieldErrors,
      },
    };
  }

  const data = result.data;

  try {
    const response = await fetch(`${process.env.BASE_API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(convertValidationErrors<RegisterData>(
        error,
        isProduction,
      ))

      return {
        errors: {
          validation: convertValidationErrors<RegisterData>(
            error,
            isProduction,
          ),
        },
      };
    }

    const tokenData = (await response.json()) as AuthResponse;

    if (tokenData) {
      const cookieStore = cookies();

      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      cookieStore.delete("expiresAt");

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
        httpOnly: true,
        path: "/",
        secure: isProduction,
        sameSite: "strict",
      });

      revalidatePath("/");
    }
  } catch (error) {
    throw error;
  }
}

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function loginAction(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!result.success) {
    return {
      errors: {
        validation: result.error.formErrors.fieldErrors,
      },
    };
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

    if (error.status == 400) {
      return {
        errors: {
          auth: { general: "Invalid credentials" },
        },
      };
    }

    return {
      errors: {
        server: { general: "Server error. Please try again later." },
      },
    };
  }

  const tokenData = await response.json();

  if (tokenData) {
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
      httpOnly: true,
      path: "/",
      secure: isProduction,
      sameSite: "strict",
    });

    revalidatePath("/");
  }
}

export async function logoutAction() {
  const cookieStore = cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("expiresAt");
}
