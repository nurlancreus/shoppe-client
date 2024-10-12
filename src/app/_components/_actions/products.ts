"use server";

import { revalidatePath } from "next/cache";


export async function addProductAction(

  formData: FormData,
) {
 // const productImages = formData.getAll("productImages"); // Get all files
  //console.log(productImages, categoryIds, colors);
  // const result = addSchema.safeParse({
  //   ...Object.fromEntries(formData.entries()),
  //   productImages, // Attach the array of files
  //   categoryIds, // Attach selected categories
  //   colors, // Attach selected colors
  // });

  console.log(formData, "FORMDATA FROM ADD PRODUCT");



  const data = {
    
  };
  
  console.log("Formatted data:", data);

  try {
    const response = await fetch(`${process.env.BASE_API_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      throw new Error("Product creation failed", error);
    }

    const responseData = await response.json();
    console.log("Product created:", responseData);
  } catch (error) {
    console.log(error);
    throw error
  }

  revalidatePath("/"); // Revalidate cache for homepage
  revalidatePath("/products"); // Revalidate cache for products page
}

export async function updateProductAction(
  id: string,
  formData: FormData,
) {
  //const productImages = formData.getAll("productImages"); // Get all files
  // const result = updateSchema.safeParse({
  //   ...Object.fromEntries(formData.entries()),
  //   productImages, // Attach the array of files
  //   categoryIds, // Attach selected categories
  //   colors, // Attach selected colors
  // });

  // if (!result.success) {
  //   console.log(result.error.formErrors.fieldErrors);
  //   return result.error.formErrors.fieldErrors;
  // }

  const data = {};
  console.log("Formatted data:", formData);

  try {
    const response = await fetch(`${process.env.BASE_API_URL}/products/${id}`, {
      method: "PATCH", // PATCH for partial updates
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      throw new Error("Product update failed", error);
    }

    const responseData = await response.json();
    console.log("Product updated:", responseData);
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/"); // Revalidate cache for homepage
  revalidatePath("/products"); // Revalidate cache for products page
}
