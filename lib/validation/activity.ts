import { z } from "zod";

export const activitySchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "English title must be at least 3 characters"),

  titleMm: z
    .string()
    .trim()
    .min(3, "Myanmar title must be at least 3 characters"),

  subTitle: z
    .string()
    .trim()
    .min(3, "Sub title is required"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),

  images: z
    .array(
      z.object({
        url: z.string().url(),
        key: z.string().min(1),
      })
    )
    .min(1, "Please upload at least one image"),
});

export type ActivityInput = z.infer<
  typeof activitySchema
>;