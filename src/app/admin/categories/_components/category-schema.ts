import { z } from "zod";

export const addCategorySchema = z.object({
  name: z.string().min(1, { message: "Category name is required." }),
  description: z.string().optional(),
  type: z.enum(["Product", "Blog"], {
    errorMap: () => ({ message: "Category type is required." }),
  }),
});

export const updateCategorySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  type: z.enum(["Product", "Blog"]).optional(),
});

export type AddCategorySchema = z.infer<typeof addCategorySchema>;
export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;
