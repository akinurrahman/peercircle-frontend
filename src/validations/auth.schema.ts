import { z } from "zod";
import {
  emailSchema,
  fullNameSchema,
  passwordSchema,
  usernameSchema,
} from "./common.schema";

export const loginSchema = z.object({
  identifier: z
    .string()
    .refine(
      (val) =>
        emailSchema.safeParse(val).success ||
        usernameSchema.safeParse(val).success,
      {
        message: "Invalid username or email",
      }
    ),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const signupSchema = z
  .object({
    fullName: fullNameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    new_password: passwordSchema,
    confirm_password: z.string(),
  })
  .superRefine(({ confirm_password, new_password }, ctx) => {
    if (confirm_password !== new_password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirm_password"],
      });
    }
  });

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type SignUpSchemaType = z.infer<typeof signupSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
