import { NextResponse } from "next/server";

export async function GET() {
  console.log("HIT");
  try {
    // Create a response object
    const nextResponse = NextResponse.json({ message: "Cookies removed" });

    // Check if in production
    const isProduction = process.env.NODE_ENV === "production"; 

    // Delete the cookies
    nextResponse.cookies.set("accessToken", "", {
      httpOnly: true,
      path: "/",
      secure: isProduction,  // Secure flag is only set in production
      sameSite: "strict",
      maxAge: -1, // Set maxAge to -1 to delete the cookie
    });

    nextResponse.cookies.set("refreshToken", "", {
      httpOnly: true,
      path: "/",
      secure: isProduction,
      sameSite: "strict",
      maxAge: -1, // Set maxAge to -1 to delete the cookie
    });

    nextResponse.cookies.set("expiresAt", "", {
      path: "/",
      sameSite: "strict",
      maxAge: -1, // Set maxAge to -1 to delete the cookie
    });

    return nextResponse;
  } catch (error) {
    console.error("Error during cookie removal:", error);
    return NextResponse.error();
  }
}
