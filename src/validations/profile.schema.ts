import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  bio: z.string().max(500, "Bio must be 500 characters or less").optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  username: z.string().min(3, "Username must be at least 3 characters"),
  location: z.string().optional(),
  website_url: z
    .string()
    .url("Invalid URL for website")
    .or(z.literal(""))
    .optional(),
});

export type Profile = z.infer<typeof profileSchema>;
