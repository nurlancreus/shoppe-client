"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

// Define schema for validating file instances
const fileSchema = z.instanceof(File, { message: "File is required." });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/"),
  { message: "File must be an image or empty." },
);

// Define schema for adding a product with validation rules (all fields required)
const addSchema = z.object({
  name: z.string().min(1, { message: "Product name is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  price: z.coerce
    .number()
    .min(0, { message: "Price must be a non-negative number." }),
  stock: z.coerce
    .number()
    .int()
    .min(0, { message: "Stock must be a non-negative integer." }),
  weight: z.coerce
    .number()
    .min(0, { message: "Weight must be a non-negative number." }),
  height: z.coerce
    .number()
    .min(0, { message: "Height must be a non-negative number." }),
  width: z.coerce
    .number()
    .min(0, { message: "Width must be a non-negative number." }),
  material: z.string().min(1, { message: "Material is required." }),
  colors: z.array(
    z.string().min(1, { message: "At least one color is required." }),
  ),
  categoryIds: z.array(
    z.string().min(1, { message: "At least one category is required." }),
  ),
  productImages: z
    .array(
      imageSchema.refine((file) => file.size > 0, {
        message: "At least one image is required.",
      }),
    )
    .min(1, { message: "At least one image is required." }), // Ensure at least one image is provided
});

// Define schema for updating a product with validation rules (all fields optional)
const updateSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Product name must be at least 1 character." })
    .optional(),
  description: z
    .string()
    .min(1, { message: "Description must be at least 1 character." })
    .optional(),
  price: z.coerce
    .number()
    .min(0, { message: "Price must be a non-negative number." })
    .optional(),
  stock: z.coerce
    .number()
    .int()
    .min(0, { message: "Stock must be a non-negative integer." })
    .optional(),
  weight: z.coerce
    .number()
    .min(0, { message: "Weight must be a non-negative number." })
    .optional(),
  height: z.coerce
    .number()
    .min(0, { message: "Height must be a non-negative number." })
    .optional(),
  width: z.coerce
    .number()
    .min(0, { message: "Width must be a non-negative number." })
    .optional(),
  material: z
    .string()
    .min(1, { message: "Material must be at least 1 character." })
    .optional(),
  colors: z
    .array(z.string().min(1, { message: "At least one color is required." }))
    .optional(),
  categoryIds: z
    .array(z.string().min(1, { message: "At least one category is required." }))
    .optional(),
  productImages: z
    .array(
      imageSchema.refine((file) => file.size > 0 || file.size === 0, {
        message: "Image must be valid.",
      }),
    )
    .optional(), // Images optional for update
});

export async function addProductAction(
  categoryIds: string[],
  colors: string[],
  prevState: unknown,
  formData: FormData,
) {
  const productImages = formData.getAll("productImages"); // Get all files
  console.log(productImages, categoryIds, colors);
  const result = addSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
    productImages, // Attach the array of files
    categoryIds, // Attach selected categories
    colors, // Attach selected colors
  });

  console.log(formData, result);

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = {
    Name: result.data.name,
    Material: result.data.material,
    Description: result.data.description,
    ...result.data,
  };
  
  console.log("Formatted data:", data);

  try {
    const response = await fetch(`${process.env.BASE_API_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      //credentials: "include",
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
  categoryIds: string[],
  colors: string[],
  prevState: unknown,
  formData: FormData,
) {
  const productImages = formData.getAll("productImages"); // Get all files
  const result = updateSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
    productImages, // Attach the array of files
    categoryIds, // Attach selected categories
    colors, // Attach selected colors
  });

  if (!result.success) {
    console.log(result.error.formErrors.fieldErrors);
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  console.log("Formatted data:", data);

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
