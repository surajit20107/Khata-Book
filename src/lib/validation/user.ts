import { z } from "zod";

export const registerValidation = z.object({
  firstName: z.string()
    .min(3, "First name must be at least 3 characters long")
    .max(10, "First name must be at most 10 characters long")
    .trim(),
  lastName: z.string()
    .min(3, "Last name must be at least 3 characters long")
    .max(10, "Last name must be at most 10 characters long")
    .trim(),
  email: z.string()
    .email("Invalid email address")
    .trim()
    .toLowerCase()
    .min(15, "Invalid email")
    .max(50, "Email is too long"),
  password: z.string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long")
})

export const LoginValidation = z.object({
  email: z.string()
    .email("Invalid email address")
    .trim()
    .toLowerCase()
    .min(15, "Invalid email")
    .max(50, "Email is too long"),
  password: z.string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long")
})
