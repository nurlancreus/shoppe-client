import { z } from "zod";

// Define schema for validating file instances
const fileSchema = z.instanceof(File, { message: "File is required." });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/"),
  { message: "File must be an image or empty." },
);

// Validate FileList instead of array
const fileListSchema = z
  .custom<FileList>((value) => value instanceof FileList, {
    message: "Invalid file list.",
  })
  //.refine((list) => list.length > 0, { message: "At least one file is required." })
  .refine(
    (list) =>
      Array.from(list).every(
        (file) => file.size === 0 || file.type.startsWith("image/"),
      ),
    { message: "All files must be images or empty." },
  );

// Define schema for adding a product with validation rules (all fields required)
export const addProductSchema = z.object({
  name: z.string().min(1, { message: "Product name is required." }),
  info: z.string().min(1, { message: "Info must be at least 1 character." }),
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
  categories: z.array(
    z.string().min(1, { message: "At least one category is required." }),
  ),
  productImages: fileListSchema, // Use FileList schema
});

// Define schema for updating a product with validation rules (all fields optional)
export const updateProductSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Product name must be at least 1 character." })
    .optional(),
  info: z
    .string()
    .min(1, { message: "Info must be at least 1 character." })
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
  categories: z
    .array(z.string().min(1, { message: "At least one category is required." }))
    .optional(),
  productImages: fileListSchema.optional(), // FileList schema for update, optional
});

export type AddProductSchema = z.infer<typeof addProductSchema>;
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
