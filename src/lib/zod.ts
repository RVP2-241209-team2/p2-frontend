import * as z from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

// Updated register schema to match backend
export const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: "Username is required" })
      .max(50, { message: "Username must be less than 50 characters" }),
    firstName: z
      .string()
      .min(1, { message: "First name is required" })
      .max(50, { message: "First name must be less than 50 characters" }),
    lastName: z
      .string()
      .min(1, { message: "Last name is required" })
      .max(50, { message: "Last name must be less than 50 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
    phoneNumber: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" })
      .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
    role: z.union([
      z.literal("ADMIN"),
      z.literal("STORE_OWNER"),
      z.literal("CUSTOMER"),
    ]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

// Existing product schema
export const newProductSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters" })
    .max(20, { message: "Name must be less than 20 characters" }),
  price: z.number().min(1, { message: "Price must be greater than 0" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(250, { message: "Description must be less than 250 characters" }),
  // todo: put tags in backend api and use those
  // category: z.enum(CATEGORIES.map((c) => c.slug) as [string, ...string[]], {
  //   required_error: "Category is required",
  //   invalid_type_error: "Please select a valid category",
  // }),
  images: z
    .array(z.string())
    .min(1, { message: "At least one image is required" }),
  quantity: z.number().min(1, { message: "Quantity must be greater than 0" }),
});

export type NewProduct = z.infer<typeof newProductSchema>;

export const editProductSchema = newProductSchema.extend({
  id: z.string().uuid(),
});

export type EditProduct = z.infer<typeof editProductSchema>;

// Updated address schema to match backend
export const addressSchema = z.object({
  recipientName:z.string().min(1, { message: "Recepient Name is required" }),
  addressLine1: z.string().min(1, { message: "Address line 1 is required" }),
  addressLine2: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().length(2, { message: "State must be 2 characters" }),
  zipCode: z
    .string()
    .length(5, { message: "ZIP code must be 5 digits" })
    .regex(/^\d+$/, { message: "ZIP code must contain only digits" }),
  country: z.string().min(1, { message: "Country is required" }),
  type: z.enum(["BILLING", "SHIPPING"]),
});

export type AddressFormData = z.infer<typeof addressSchema>;

// Updated payment schema to match backend
export const paymentSchema = z.object({
  cardNumber: z
    .string()
    .length(16, { message: "Card number must be 16 digits" })
    .regex(/^\d+$/, { message: "Card number must contain only digits" }),
  cardHolderName: z
    .string()
    .min(1, { message: "Card holder name is required" }),
  expireDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, {
    message: "Expiry date must be in MM/YY format",
  }),
  addressId: z.string().uuid({ message: "Invalid address ID" }),
  isDefault: z.boolean().default(false),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;
