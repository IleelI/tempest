import Button from "components/common/button/button";
import InputField from "components/common/input-field/input-field";
import useLoginForm from "components/auth/hooks/useLoginForm/useLoginForm";
import type { NextPage } from "next";
import { User, Lock } from "react-feather";
import AuthHeader, {
  AuthRedirect,
} from "components/auth/components/auth-header/auth-header";

const LoginPage: NextPage = () => {
  const { loginError, errors, isValid, register, onSubmit, handleSubmit } =
    useLoginForm();
  const isDisabled = !isValid;

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <section className="flex flex-col gap-4">
        <AuthHeader
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
