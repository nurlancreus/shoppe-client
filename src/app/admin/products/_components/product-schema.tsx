import { z } from "zod";

// Define schema for validating file instances
const fileSchema = z.instanceof(File, { message: "File is required." });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/"),
  { message: "File must be an image or empty." },
);

// Define schema for adding a product with validation rules (all fields required)
export const addProductSchema = z.object({
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
  materials: z.array(
    z.string().min(1, { message: "At least one material is required." }),
  ),
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
export const updateProductSchema = z.object({
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
  materials: z
    .array(z.string().min(1, { message: "At least one material is required." }))
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

export type AddProductSchema = z.infer<typeof addProductSchema>;
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
