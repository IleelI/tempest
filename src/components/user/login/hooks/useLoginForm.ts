import { getErrorMessage } from "utils/api";
import { useMutation } from "react-query";
import { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { loginUser } from "services/authentication/authentication";

export const loginSchema = z.object({
  login: z.string({
    required_error: "Login is required",
    invalid_type_error: "Login must be a string",
  }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, "Password must be at least 8 characters long"),
});
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
  const { isLoading, mutateAsync } = useMutation({
    mutationKey: "login-user",
    mutationFn: loginUser,
  });

  const onSubmit: SubmitHandler<LoginSchema> = useCallback(
    async (loginData) => {
      try {
        const data = await mutateAsync(loginData);
        console.log(JSON.parse(data.data.token), JSON.parse(data.data.user));
        toast.success("Logged in!");
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },
    [mutateAsync]
  );

  return {
    errors,
    isValid,
    isLoading,
    register,
    onSubmit,
    handleSubmit,
  };
}
