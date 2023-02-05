import AuthHeader, {
  AuthRedirect,
} from "components/auth/components/auth-header/auth-header";
import useRegisterForm from "components/auth/hooks/useRegisterForm/useRegisterForm";
import Button from "components/common/button/button";
import InputField from "components/common/input-field/input-field";
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
      <section className="flex flex-col gap-4">
        <AuthHeader
          title="Create an account"
          redirect={AuthRedirect.LOGIN}
          redirectMessage="Already have an account? Log in"
          error={registrationError}
        />
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
      </section>
      <section className="self-end">
        <Button
          type="submit"
          isDisabled={isDisabled}
          label={isLoading ? "Loading" : "Register"}
          icon={isLoading ? <Loader className="animate-spin" /> : undefined}
        />
      </section>
    </form>
  );
};

export default RegisterPage;
