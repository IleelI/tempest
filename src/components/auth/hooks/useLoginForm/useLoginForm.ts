import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { getErrorMessage } from "utils/api";
import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { passwordSchema } from "schemas";

export const loginSchema = passwordSchema.merge(
  z.object({
    login: z.string({
      required_error: "Login is required",
      invalid_type_error: "Login must be a string",
    }),
  })
);
export type LoginSchema = z.infer<typeof loginSchema>;

const defaultValues: LoginSchema = {
  login: "",
  password: "",
};
export default function useLoginForm() {
  const {
    formState: { isValid, errors },
    register,
    handleSubmit,
  } = useForm<LoginSchema>({
    mode: "all",
    defaultValues,
    resolver: zodResolver(loginSchema),
  });
  const [loginError, setLoginError] = useState<string | null>(null);
  const { back } = useRouter();

  const onSubmit: SubmitHandler<LoginSchema> = useCallback(
    async ({ login: username, password }) => {
      try {
        const response = await signIn("credentials", {
          username,
          password,
          redirect: false,
        });
        // Checking if sign In was not successfull in that case we set and throw an error
        if (!response?.ok) {
          throw new Error("Login or password is incorrect.");
        }
        // If everything is ok we show success toast, clear errors and redirect to the homepage
        toast.success("Logged in!");
        setLoginError(null);
        // Go back to page that user request login from.
        back();
      } catch (error) {
        setLoginError(getErrorMessage(error));
        toast.error(getErrorMessage(error));
      }
    },
    [back]
  );

  return {
    errors,
    isValid,
    loginError,
    register,
    onSubmit,
    handleSubmit,
  };
}
