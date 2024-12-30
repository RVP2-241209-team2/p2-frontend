import * as a from "zod";

export const loginSchema = a.object({
    username: a.string().min(1, { message: "Username is required" }),
    password: a.string().min(1, { message: "Password is required" })
})

export type LoginSchema = a.infer<typeof loginSchema>

export const registerSchema = a.object({
    username: a.string().min(1, { message: "Username is required" }).max(50, { message: "Username must be less than 50 characters" }),
    password: a.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: a.string(),
    role: a.enum(["SHOPPER", "MANAGER"])
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

export type RegisterSchema = a.infer<typeof registerSchema>