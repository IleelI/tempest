import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { registerNewUser } from "services/authentication/authentication";
import { getErrorMessage } from "utils/api";
import { z } from "zod";

export const registrationSchema = z
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
export type RegistrationSchema = z.infer<typeof registrationSchema>;

const defaultValues: RegistrationSchema = {
  email: "",
  password: "",
  confirm: "",
};
export default function useRegistrationForm() {
  const {
    formState: { errors, isValid },
    watch,
    register,
    trigger,
    handleSubmit,
  } = useForm<RegistrationSchema>({
    defaultValues,
    resolver: zodResolver(registrationSchema),
  });
  const {
    error: registrationError,
    isLoading,
    mutateAsync,
  } = useMutation({
    mutationKey: "register-user",
    mutationFn: registerNewUser,
  });

  const onSubmit: SubmitHandler<RegistrationSchema> = useCallback(
    async (formData) => {
      try {
        await mutateAsync(formData);
        toast.success("Account has been successfully created!");
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },
    [mutateAsync]
  );

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
