import Button from "components/common/button/button";
import InputField from "components/common/input-field/input-field";
import { Loader, Lock, User } from "react-feather";
import useLoginForm from "./hooks/useLoginForm";

function LoginForm() {
  const { errors, isValid, isLoading, register, onSubmit, handleSubmit } =
    useLoginForm();
  const isDisabled = !isValid || isLoading;

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <header>
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            Login
          </h1>
        </header>
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
      </div>
      <Button
        type="submit"
        isDisabled={isDisabled}
        label="Login"
        icon={isLoading ? <Loader className="animate-spin" /> : undefined}
      />
    </form>
  );
}

export default LoginForm;
