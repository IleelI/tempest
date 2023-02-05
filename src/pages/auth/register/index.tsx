import Button from "components/common/button/button";
import InputField from "components/common/input-field/input-field";
import useRegisterForm from "hooks/useRegisterForm/useRegisterForm";
import type { NextPage } from "next";
import { Mail, Loader, Lock } from "react-feather";

const RegisterPage: NextPage = () => {
  const {
    registrationError,
    errors,
    isLoading,
    isValid,
    register,
    handleSubmit,
    onSubmit,
  } = useRegisterForm();
  const isDisabled = !isValid || isLoading;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <header>
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            Create new account
          </h1>
          {Boolean(registrationError) && (
            <h2 className="text-sm font-medium tracking-wide text-red-700 dark:text-red-300">
              {String(registrationError)}
            </h2>
          )}
        </header>
        <fieldset className="flex flex-col gap-4">
          <InputField
            isRequired
            label="Email"
            placeholder="dolor.amet@ipsum.sit"
            icon={<Mail />}
            error={errors.email}
            {...register("email")}
          />
          <InputField
            isRequired
            type="password"
            label="Password"
            placeholder="Password"
            icon={<Lock />}
            error={errors.password}
            {...register("password")}
          />
          <InputField
            isRequired
            type="password"
            label="Confirm Password"
            placeholder="Password"
            icon={<Lock />}
            error={errors.confirm}
            {...register("confirm")}
          />
        </fieldset>
      </div>
      <Button
        type="submit"
        isDisabled={isDisabled}
        label={isLoading ? "Loading" : "Register"}
        icon={isLoading ? <Loader className="animate-spin" /> : undefined}
      />
    </form>
  );
};

export default RegisterPage;
