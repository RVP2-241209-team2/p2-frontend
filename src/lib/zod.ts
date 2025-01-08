import * as z from "zod";
import { CATEGORIES } from "./constants";

export const loginSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: "Password is required" })
})

export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }).max(50, { message: "Username must be less than 50 characters" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
    role: z.enum(["SHOPPER", "MANAGER"])
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

export type RegisterSchema = z.infer<typeof registerSchema>

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

// account-page schemas/types
export const addressSchema = z.object({
  label: z.string().min(1, "Address label is required"),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().length(2, "State must be 2 characters"),
  zipCode: z.string()
    .length(5, "ZIP code must be 5 digits")
    .regex(/^\d+$/, "ZIP code must contain only digits"),
});

export type AddressFormData = z.infer<typeof addressSchema>;

export const paymentSchema = z.object({
  cardNumber: z.string()
    .min(16, "Card number must be 16 digits")
    .max(16, "Card number must be 16 digits")
    .regex(/^\d+$/, "Card number must contain only digits"),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Expiry date must be in MM/YY format"),
  cvc: z.string()
    .min(3, "CVC must be 3 digits")
    .max(4, "CVC must be 3-4 digits")
    .regex(/^\d+$/, "CVC must contain only digits"),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;