"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addCategoryAction(formData: FormData) {
  const data = {
    name: formData.get("name")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    type: formData.get("type")?.toString() || "",
  };

  console.log(formData, data);
  try {
    const response = await fetch(`${process.env.BASE_API_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Error:", error); // Changed to console.error for error logging
      throw new Error(error.message || "Category creation failed");
    }

    const responseData = await response.json();
    console.log("Category created:", responseData);

    revalidatePath("/admin/categories");
    redirect("/admin/categories");
  } catch (error) {
    console.error("Error during category creation:", error);
  }
}

// Update category action
export async function updateCategoryAction(id: string, formData: FormData) {
  const data = {
    name: formData.get("name")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    type: formData.get("type")?.toString() || "",
  };
  console.log(data, "UPDATEEE");
  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/categories/${id}`,
      {
        method: "PUT",
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

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategoryAction(id: string) {
  try {
    const response = await fetch(
      `${process.env.BASE_API_URL}/categories/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Error:", error); // Changed to console.error for error logging
      throw new Error(error.message || "Category deletion failed");
    }

    const responseData = await response.json();
    console.log("Category removed:", responseData);

    revalidatePath("/admin/categories");
    redirect("/admin/categories");
  } catch (error) {
    console.error("Error during category deletion:", error);
  }
}
