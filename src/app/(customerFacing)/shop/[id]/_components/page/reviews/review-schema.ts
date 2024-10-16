// reviewschemas.ts
import { z } from "zod";

export const addReviewSchema = z.object({
  // firstName: z.string().min(1, "First name is required"),
  // lastName: z.string().min(1, "Last name is required"),
  // email: z.string().email("Invalid email address"),
  body: z.string().optional(),
  rating: z.number().min(1, "Rating is required"),
  //saveMe: z.boolean().optional(),
});

export const updateReviewSchema = z.object({
  // firstName: z.string().min(1, "First name is required").optional(),
  // lastName: z.string().min(1, "Last name is required").optional(),
  // email: z.string().email("Invalid email address").optional(),
  body: z.string().optional(),
  rating: z.number().min(1, "Rating is required").optional(),
  //saveMe: z.boolean().optional(),
});

export type AddReviewSchema = z.infer<typeof addReviewSchema>;
export type UpdateReviewSchema = z.infer<typeof updateReviewSchema>;
