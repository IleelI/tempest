import Button from "components/common/button/button";
import InputField from "components/common/input-field/input-field";
import useLoginForm from "components/auth/hooks/useLoginForm/useLoginForm";
import type { NextPage } from "next";
import { User, Lock } from "react-feather";
import AuthFormHeader, {
  AuthRedirect,
} from "components/auth/components/auth-form-header/auth-form-header";
import { useSession } from "next-auth/react";

const LoginPage: NextPage = () => {
  const { data: session } = useSession();
  const { loginError, errors, isValid, register, onSubmit, handleSubmit } =
    useLoginForm();
  const isDisabled = !isValid;

  if (session) {
    return (
      <div className="shado-main rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-transparent dark:bg-neutral-800 dark:shadow-none">
        <h1 className="text-center font-medium text-neutral-800 dark:text-neutral-200">
          If you want to log in with different account you must log out first.
        </h1>
      </div>
    );
  }
  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <section className="flex flex-col gap-4">
        <AuthFormHeader
          title="Log in"
          error={loginError}
          redirect={AuthRedirect.REGISTER}
          redirectMessage="Don't have an account? Create it"
        />
        <fieldset className="flex flex-col gap-4">
          <InputField
            isRequired
            label="Login"
            placeholder="email/username"
            icon={<User />}
            error={errors?.login}
            {...register("login")}
          />
          <InputField
            isRequired
            type="password"
            label="Password"
            placeholder="Password"
            icon={<Lock />}
            error={errors?.password}
            {...register("password")}
          />
        </fieldset>
      </section>
      <section className="self-end">
        <Button type="submit" isDisabled={isDisabled} label="Login" />
      </section>
    </form>
  );
};

export default LoginPage;
