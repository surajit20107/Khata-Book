import { z } from "zod";

export const registerValidation = z.object({
  firstName: z.string().min(3).max(10).trim(),
  email: z.string().email().trim().toLowerCase().min(3).max(20),
  password: z.string().min(6).max(20)
})

//export type User = z.infer<typeof registerValidation>

export const LoginValidation = z.object({
  email: z.string().email().trim().toLowerCase().min(3).max(20),
  password: z.string().min(6).max(20)
})

//export type User = z.infer<typeof registerValidation>
