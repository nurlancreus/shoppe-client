import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { reviewId: string } }
) {
  const { reviewId } = params;  

  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/reviews/${reviewId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch review data from external API");
    }

    // Parse the JSON response
    const data = await response.json();

    // Return the response data to the client
    return NextResponse.json(data);

  } catch (error) {
    console.error("Error fetching review:", error);

    // Return an error response with status code 500
    return NextResponse.json(
      { error: "Failed to fetch review data" },
      { status: 500 }
    );
  }
}
