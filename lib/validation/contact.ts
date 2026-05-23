import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .trim()
    .min(7, "Phone number is too short")
    .regex(/^[0-9+\-\s]+$/, "Invalid phone number"),

  subject: z
    .string()
    .trim()
    .min(2, "Subject is required"),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;