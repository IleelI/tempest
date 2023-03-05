import { zodResolver } from "@hookform/resolvers/zod";
import Button from "components/common/button/button";
import InputField from "components/common/input-field/input-field";
import { useState } from "react";
import { Lock } from "react-feather";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { passwordWithConfirmationSchema } from "schemas";
import { updatePassword } from "services/user/user";
import { getErrorMessage } from "utils/api";
import { z } from "zod";

const profilePasswordSchema = passwordWithConfirmationSchema.and(
  z.object({
    oldPassword: z
      .string({
        required_error: "Old password is required",
        invalid_type_error: "Old password must be a string",
      })
      .min(8, "Old password must be at least 8 characters long"),
  })
);
type ProfilePasswordSchema = z.infer<typeof profilePasswordSchema>;

const defaultValues: ProfilePasswordSchema = {
  password: "",
  passwordConfirm: "",
  oldPassword: "",
};
export default function ProfilePasswordForm() {
  const {
    formState: { isValid, errors },
    reset,
    register,
    handleSubmit,
  } = useForm<ProfilePasswordSchema>({
    resolver: zodResolver(profilePasswordSchema),
    mode: "all",
    defaultValues,
  });
  const [submitError, setSubmitError] = useState(false);

  const onSubmit: SubmitHandler<ProfilePasswordSchema> = async ({
    password,
    passwordConfirm,
    oldPassword,
  }) => {
    try {
      await updatePassword(password, passwordConfirm, oldPassword);
      reset();
      setSubmitError(false);
      toast.success("Password changed successfully!");
    } catch (error) {
      setSubmitError(true);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
        Change password
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <InputField
          type="password"
          label="Old password"
          {...register("oldPassword")}
          error={errors.oldPassword}
        />
        <InputField
          type="password"
          label="New password"
          {...register("password")}
          error={errors.password}
        />
        <InputField
          type="password"
          label="Confirm new password"
          {...register("passwordConfirm")}
          error={errors.passwordConfirm}
        />
        <div className="flex flex-col gap-2">
          <Button
            isDisabled={!isValid}
            type="submit"
            label="Change password"
            className="!justify-start"
            icon={<Lock />}
          />
          {submitError && (
            <h2 className="text-xs font-medium tracking-wide text-red-700 dark:text-red-300">
              Please check if you&apos;ve entered a correct old password.
            </h2>
          )}
        </div>
      </form>
    </section>
  );
}
