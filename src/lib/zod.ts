import * as z from "zod";

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