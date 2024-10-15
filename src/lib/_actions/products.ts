"use server";

import { convertValidationErrors } from "@/lib/helpers/error-converter";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addProductAction(formData: FormData) {
  console.log(formData, "FORMDATA FROM ADD PRODUCT");

  try {
    // Create a new FormData to handle the structure manually
    const requestData = new FormData();

    // Append all fields manually to ensure correct format
    requestData.append("Name", formData.get("name") + "");
    requestData.append("Info", formData.get("info") + "");
    requestData.append("Description", formData.get("description") + "");
    requestData.append("Price", formData.get("price") + "");
    requestData.append("Stock", formData.get("stock") + "");
    requestData.append("Weight", formData.get("weight") + "");
    requestData.append("Height", formData.get("height") + "");
    requestData.append("Width", formData.get("width") + "");

    // Append arrays like materials and colors
    const materials = formData.getAll("materials") as string[];
    materials.forEach((material) => requestData.append("Materials", material));

    const colors = formData.getAll("colors") as string[];
    colors.forEach((color) => requestData.append("Colors", color));

    const categories = formData.getAll("categories") as string[];
    categories.forEach((categoryName) =>
      requestData.append("Categories", categoryName),
    );

    // Append each file from the productImages array
    const productImages = formData.getAll("productImages") as File[];
    productImages.forEach((file) =>
      requestData.append("ProductImages", file, file.name),
    );

    // Send the FormData as multipart/form-data
    const response = await fetch(`${process.env.BASE_API_URL}/products`, {
      method: "POST",
      body: requestData, // FormData automatically sets Content-Type to multipart/form-data
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();

      console.log(convertValidationErrors(error));
      throw new Error("Product creation failed");
    }

    const responseData = await response.json();
    console.log("Product created:", responseData);
  } catch (error) {
    console.log(error);
    throw error;
  }

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProductAction(id: string, formData: FormData) {
  console.log(formData, "FORMDATA FROM UPDATE PRODUCT");

  try {
    // Similar to addProductAction, construct FormData for the update
    const requestData = new FormData();

    requestData.append("Name", formData.get("name") + "");
    requestData.append("Info", formData.get("info") + "");
    requestData.append("Description", formData.get("description") + "");
    requestData.append("Price", formData.get("price") + "");
    requestData.append("Stock", formData.get("stock") + "");
    requestData.append("Weight", formData.get("weight") + "");
    requestData.append("Height", formData.get("height") + "");
    requestData.append("Width", formData.get("width") + "");

    const materials = formData.getAll("materials") as string[];
    materials.forEach((material) => requestData.append("Materials", material));

    const colors = formData.getAll("colors") as string[];
    colors.forEach((color) => requestData.append("Colors", color));

    const categories = formData.getAll("categories") as string[];
    categories.forEach((categoryName) =>
      requestData.append("Categories", categoryName),
    );

    const productImages = formData.getAll("productImages") as File[];
    productImages.forEach((file) =>
      requestData.append("ProductImages", file, file.name),
    );

    console.log(requestData);

    const response = await fetch(`${process.env.BASE_API_URL}/products/${id}`, {
      method: "PATCH", // PATCH for partial updates
      body: requestData, // Send FormData for the update
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      throw new Error("Product update failed");
    }

    const responseData = await response.json();
    console.log("Product updated:", responseData);
  } catch (error) {
    console.log(error);
    throw error;
  }

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/admin/products");
  redirect("/admin/products");
  //revalidatePath(`/products/${id}/update`);
}

export async function deleteProductAction(id: string) {
  try {
    const response = await fetch(`${process.env.BASE_API_URL}/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Error:", error);
      throw new Error(error.message || "Product deletion failed");
    }

    const responseData = await response.json();
    console.log("Product removed:", responseData);

    revalidatePath("/");
    revalidatePath("/shop");
    revalidatePath("/admin/products");
    redirect("/admin/products");
  } catch (error) {
    console.error("Error during product deletion:", error);
  }
}

export async function changeMainImageAction(
  productId: string,
  imageId: string,
) {
  const response = await fetch(
    `${process.env.BASE_API_URL}/products/${productId}/images/${imageId}`,
    {
      method: "PATCH",
    },
  );

  if (!response.ok) {
    const error = await response.json();
    console.error("Error:", error);
    throw new Error(error.message || "Main image changing failed");
  }

  const responseData = await response.json();
  console.log("Main image updated:", responseData);
  revalidatePath("/admin/products");
  revalidatePath("/shop");
}

export async function deleteProductImageAction(
  productId: string,
  imageId: string,
) {
  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/products/${productId}/images/${imageId}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Error:", error);
      throw new Error(error.message || "Product image deletion failed");
    }

    const responseData = await response.json();
    console.log("Product image removed:", responseData);

    revalidatePath("/shop");
    revalidatePath("/admin/products");
  } catch (error) {
    console.error("Error during product image deletion:", error);
  }
}

export async function addProductReviewAction(
  productId: string,
  formData: FormData,
) {
  const requestData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    body: formData.get("body") as string,
    rating: Number(formData.get("rating")),
    saveMe: Boolean(formData.get("saveMe")),
  };

  console.log(requestData)
  const response = await fetch(
    `${process.env.BASE_API_URL}/products/${productId}/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData), 
      credentials: "include",
    },
  );

  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    throw new Error(error);
  }

  if (requestData.saveMe) {
    const cookieStore = cookies();

    cookieStore.delete("firstName");
    cookieStore.delete("lastName");
    cookieStore.delete("email");

    cookieStore.set("firstName", requestData.firstName);
    cookieStore.set("lastName", requestData.lastName);
    cookieStore.set("email", requestData.email);
  }

  const responseData = await response.json();

  console.log(responseData);

  revalidatePath("/shop")
}


export async function updateProductReviewAction(
  reviewId: string,
  formData: FormData,
) {
  const requestData = {
    body: formData.get("body") as string,
    rating: Number(formData.get("rating")),
    saveMe: Boolean(formData.get("saveMe")),
  };

  console.log(requestData)
  const response = await fetch(
    `${process.env.BASE_API_URL}/reviews/${reviewId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData), 
      credentials: "include",
    },
  );

  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    throw new Error(error);
  }

  if (requestData.saveMe) {
    const cookieStore = cookies();

    cookieStore.delete("firstName");
    cookieStore.delete("lastName");
    cookieStore.delete("email");

    // cookieStore.set("firstName", requestData.firstName);
    // cookieStore.set("lastName", requestData.lastName);
    // cookieStore.set("email", requestData.email);
  }

  const responseData = await response.json();

  console.log(responseData);

  revalidatePath("/shop")
}