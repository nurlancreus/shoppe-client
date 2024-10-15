import { AuthResponse } from "@/lib/types";
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
      console.log("HITTTTT");

      console.log("MEN BURDAYAM");

      const nextResponse = NextResponse.json(tokenData);
      /*

      // nextResponse.cookies.delete("accessToken");
      // nextResponse.cookies.delete("refreshToken");
      // nextResponse.cookies.delete("expiresAt");

      //const isProduction = process.env.NODE_ENV === "production";  
      const isProduction = false;  
      

      nextResponse.cookies.set("accessToken", tokenData.token.accessToken, {
        httpOnly: true,
        path: "/",
        secure: isProduction,  
        sameSite: "lax",
      });

      nextResponse.cookies.set("refreshToken", tokenData.token.refreshToken, {
        httpOnly: true,
        path: "/",
        secure: isProduction,  
        sameSite: "lax",
      });

      nextResponse.cookies.set("expiresAt", tokenData.token.expiresAt, {
        path: "/",
        sameSite: isProduction ? "strict" : "lax",
      });
*/
      return nextResponse;
    }
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.error();
  }
}
