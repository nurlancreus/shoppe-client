"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { AuthResponse } from "@/lib/types";
import { redirect } from "next/navigation";

export async function registerAction(formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;
    console.log("register data", data);

    const requestData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      userName: formData.get("userName"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const response = await fetch(`${process.env.BASE_API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Registration error:", error);
    }

    const tokenData = (await response.json()) as AuthResponse;

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
        sameSite: isProduction ? "strict" : "lax",
      });

      cookieStore.set("refreshToken", tokenData.token.refreshToken, {
        httpOnly: true,
        path: "/",
        secure: isProduction,
        sameSite: isProduction ? "strict" : "lax",
      });

      cookieStore.set("expiresAt", tokenData.token.expiresAt, {
        httpOnly: true,
        path: "/",
        secure: isProduction,
        sameSite: isProduction ? "strict" : "lax",
      });

      // Revalidate the page to reflect the new state (if needed)
      revalidatePath("/");
      redirect("/");
    }
  } catch (error) {
    console.error("Registration failed", error);
    throw error;
  }
}

export async function loginAction(formData: FormData) {
  //const data = Object.fromEntries(formData.entries());

  const requestData = {
    email: formData.get("email"),
    password: formData.get("password"),
    rememberMe: Boolean(formData.get("rememberMe")),
  };

  //console.log(data, "DATA LOGIN");

  const response = await fetch(`${process.env.BASE_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestData),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  const tokenData = await response.json();

  if (tokenData) {
    const cookieStore = cookies();

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("expiresAt");

    const isProduction = process.env.NODE_ENV === "production";

    const maxAge = requestData.rememberMe ? 60 * 60 * 24 * 10 : undefined; // 10 days if rememberMe is true, otherwise session cookie

    cookieStore.set("accessToken", tokenData.token.accessToken, {
      httpOnly: true,
      path: "/",
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge,
    });

    cookieStore.set("refreshToken", tokenData.token.refreshToken, {
      httpOnly: true,
      path: "/",
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge,
    });

    cookieStore.set("expiresAt", tokenData.token.expiresAt, {
      httpOnly: true,
      path: "/",
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge,
    });

    revalidatePath("/");
    redirect("/");
  }
}

export async function logoutAction() {
  const cookieStore = cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("expiresAt");
}
