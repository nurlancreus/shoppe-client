"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

const addCategorySchema = z.object({
  name: z.string().min(1, { message: "Category name is required." }),
  description: z.string().min(1, { message: "Description is required." }),
});

const updateCategorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Category name must be at least 1 character." })
    .optional(),
  description: z
    .string()
    .min(1, { message: "Description must be at least 1 character." })
    .optional(),
});

export async function addCategoryAction(
  prevState: unknown,
  formData: FormData,
) {
  const result = addCategorySchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  try {
    const response = await fetch(`${process.env.BASE_API_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      throw new Error("Category creation failed");
    }

    const responseData = await response.json();
    console.log("Category created:", responseData);
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/categories");
}

// Update category action
export async function updateCategoryAction(
  id: string,
  prevState: unknown,
  formData: FormData,
) {
  const result = updateCategorySchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!result.success) {
    console.log(result.error.formErrors.fieldErrors);
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/categories/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      throw new Error("Category update failed");
    }

    const responseData = await response.json();
    console.log("Category updated:", responseData);
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/categories");
}
