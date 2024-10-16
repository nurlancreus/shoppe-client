"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addProductReviewAction(
  productId: string,
  formData: FormData
) {
  const requestData = {
    body: formData.get("body"),
    rating: Number(formData.get("rating")),
    saveMe: Boolean(formData.get("saveMe")),
    entityId: productId,
  };

  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");

  if (!token) {
    console.error("Access token is missing!");
    throw new Error("Access token is missing from cookies");
  }

  console.log(requestData, "Sending request...");

  const response = await fetch(`${process.env.BASE_API_URL}/reviews?type=product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token.value}`,
    },
    body: JSON.stringify(requestData),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    throw new Error(error);
  }

  const responseData = await response.json();
  console.log(responseData);

  revalidatePath("/shop");
}

export async function updateProductReviewAction(reviewId: string, formData: FormData) {
  const requestData = {
    body: formData.get("body"),
    rating: Number(formData.get("rating")),
    saveMe: Boolean(formData.get("saveMe")),
  };

  console.log(requestData, "Updating review...");

  const cookieStore = cookies();
  const token = cookieStore.get("accessToken");

  if (!token) {
    console.error("Access token is missing!");
    throw new Error("Access token is missing from cookies");
  }
  
  const response = await fetch(`${process.env.BASE_API_URL}/reviews/${reviewId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token.value}`,
    },
    body: JSON.stringify(requestData),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    throw new Error(error);
  }

  const responseData = await response.json();
  console.log(responseData);

  revalidatePath("/shop");
}

export async function removeProductReviewAction(reviewId: string) {
    const cookieStore = cookies();
    const token = cookieStore.get("accessToken");
  
    if (!token) {
      console.error("Access token is missing!");
      throw new Error("Access token is missing from cookies");
    }
  
    console.log(`Deleting review with ID: ${reviewId}`);
  
    const response = await fetch(`${process.env.BASE_API_URL}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token.value}`, 
      },
      credentials: "include",
    });
  
    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      throw new Error(error.message || "Failed to delete review");
    }
  
    console.log(`Review with ID: ${reviewId} deleted successfully`);
  
    revalidatePath("/shop");
  }