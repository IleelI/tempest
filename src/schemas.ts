import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Invalide email address" }),
});

export const passwordSchema = z.object({
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, "Password must be at least 8 characters long"),
});

export const passwordWithConfirmationSchema = passwordSchema
  .and(
    z.object({
      passwordConfirm: z
        .string({
          required_error: "Password is required",
          invalid_type_error: "Password must be a string",
        })
        .min(8, "Password must be at least 8 characters long"),
    })
  )
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });
