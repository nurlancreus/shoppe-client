"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache"; // For revalidating paths

// Define schema for validating file instances
const fileSchema = z.instanceof(File, { message: "Required" });
// Refine schema to ensure file is either empty or of image type
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/"),
);

// Define schema for adding/updating a product with validation rules
const addSchema = z.object({
  name: z.string().min(1), // Name must be a non-empty string
  description: z.string().min(1), // Description must be a non-empty string
  stock: z.coerce.number().int().min(0), // Stock must be a non-negative integer
  weight: z.coerce.number().min(0), // Weight must be a non-negative number
  height: z.coerce.number().min(0), // Height must be a non-negative number
  width: z.coerce.number().min(0), // Width must be a non-negative number
  material: z.string().min(1), // Material must be a non-empty string
  colors: z.string().min(1), // Colors must be a non-empty string
  categoryIds: z.string().min(1), // Category IDs must be a non-empty string
  productImages: z.array(
    imageSchema.refine((file) => file.size > 0, "Required"),
  ), // Image must be provided and non-empty
});

// Function to handle adding or updating a product
export async function addProductAction(prevState: unknown, formData: FormData) {
  // Parse formData using the addSchema
  //   const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  //   // If parsing fails, return field errors
  //   if (result.success === false) {
  //     console.log(result.error.formErrors.fieldErrors)
  //     return result.error.formErrors.fieldErrors;
  //   }

  const data = Object.fromEntries(formData.entries());
  console.log("Formatted data:", data); // Extract validated data

  // create product dto

  try {
    const response = await fetch(`${process.env.BASE_API_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      throw new Error("Product creation failed", error);
    }

    const responseData = await response.json();
    console.log("Product created:", responseData); // Log the success response
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/"); // Revalidate cache for homepage
  revalidatePath("/products"); // Revalidate cache for products page

  return { success: true };
}

export async function updateProductAction(
  id: string,
  prevState: unknown,
  formData: FormData,
) {
  return {};
}
