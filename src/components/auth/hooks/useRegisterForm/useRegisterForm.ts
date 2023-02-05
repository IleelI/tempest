import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useCallback, useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { registerUser } from "services/registration/registration";
import { getErrorMessage } from "utils/api";
import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email({ message: "Invalide email address" }),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(8, "Password must be at least 8 characters long"),
    confirm: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
export type RegisterSchema = z.infer<typeof registerSchema>;

const defaultValues: RegisterSchema = {
  email: "",
  password: "",
  confirm: "",
};
export default function useRegisterForm() {
  const {
    formState: { errors, isValid },
    reset,
    watch,
    register,
    trigger,
    handleSubmit,
  } = useForm<RegisterSchema>({
    mode: "all",
    defaultValues,
    resolver: zodResolver(registerSchema),
  });
  const {
    error: registrationError,
    isLoading,
    mutateAsync,
  } = useMutation({
    mutationKey: "register-user",
    mutationFn: registerUser,
  });

  const onSubmit: SubmitHandler<RegisterSchema> = useCallback(
    async (formData) => {
      try {
        await mutateAsync(formData);
        reset(defaultValues);
        toast.success("Account has been successfully created!");
        // Signing in newly created user and redirecting to homepage
        await signIn("credentials", {
          username: formData.email,
          password: formData.password,
          callbackUrl: "/",
        });
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },
    [mutateAsync, reset]
  );

  // Watch changes inside password and cofirm fields
  // trigger validation on every change, when both values are non empty.
  useEffect(() => {
    const watchSubscription = watch(({ password, confirm }) => {
      if (!password || !confirm) return;
      trigger(["password", "confirm"]);
    });
    return () => {
      watchSubscription.unsubscribe();
    };
  }, [watch, trigger]);

  return {
    errors,
    registrationError,
    isLoading,
    isValid,
    register,
    onSubmit,
    handleSubmit,
  };
}
