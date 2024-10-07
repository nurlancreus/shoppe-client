import { AuthResponse } from "@/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("HIT");
  try {
    const data = await request.json(); 
    const { email, password } = data; 

    const response = await fetch(`${process.env.BASE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include", 
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const tokenData = (await response.json()) as AuthResponse;
    console.log(tokenData, "TOKENNNNN");

    if (tokenData) {
      const cookieStore = cookies();

      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      cookieStore.delete("expiresAt");

      cookieStore.set("accessToken", tokenData.token.accessToken, {
        httpOnly: true, 
        path: "/", 
        secure: process.env.NODE_ENV === "production", 
      });
      cookieStore.set("refreshToken", tokenData.token.refreshToken, {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
      });
      cookieStore.set("expiresAt", tokenData.token.expiresAt, {
        path: "/",
      });

      console.log("HITTTTT");
    }
    return NextResponse.json(tokenData);
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.error();
  }
}
