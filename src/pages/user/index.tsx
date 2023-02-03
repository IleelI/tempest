import type { NextPage } from "next";
import type { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "components/common/input-field/input-field";
import clsx from "clsx";
import { Lock, Mail } from "react-feather";

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

type RegisterSchema = z.infer<typeof registerSchema>;

function Register() {
  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterSchema> = (data) => {
    console.log(data.email, data.password);
  };
  const onError: SubmitErrorHandler<RegisterSchema> = (error) => {
    console.error(error);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex flex-col gap-4"
    >
      <InputField
        isRequired
        label="Email"
        icon={<Mail />}
        placeholder="dolor.amet@ipsum.sit"
        error={errors.email}
        {...register("email")}
      />
      <InputField
        isRequired
        label="Password"
        type="password"
        placeholder="Password"
        icon={<Lock />}
        error={errors.password}
        {...register("password")}
      />
      <InputField
        isRequired
        label="Confirm Password"
        type="password"
        placeholder="Password"
        icon={<Lock />}
        error={errors.confirm}
        {...register("confirm")}
      />
      <button
        type="submit"
        disabled={!isValid}
        className={clsx([
          "self-end rounded-lg bg-neutral-700 px-8 py-2 text-neutral-200 transition-colors duration-300",
          "hover:bg-neutral-800 hover:text-neutral-100",
          "dark:bg-neutral-300 dark:text-neutral-700 dark:hover:bg-neutral-200 dark:hover:text-neutral-800",
          "disabled:pointer-events-none disabled:opacity-40",
        ])}
      >
        Register
      </button>
    </form>
  );
}

const UserPage: NextPage = function () {
  return <Register />;
};

export default UserPage;
