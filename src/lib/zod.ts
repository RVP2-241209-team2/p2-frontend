import * as z from "zod";
import { CATEGORIES } from "./constants";

export const newProductSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters" })
    .max(20, { message: "Name must be less than 20 characters" }),
  price: z.number().min(0, { message: "Price must be greater than 0" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(250, { message: "Description must be less than 250 characters" }),
  category: z.enum(CATEGORIES.map((c) => c.slug) as [string, ...string[]], {
    required_error: "Category is required",
    invalid_type_error: "Please select a valid category",
  }),
  image: z.string().min(1, { message: "Image is required" }),
});

export type NewProduct = z.infer<typeof newProductSchema>;