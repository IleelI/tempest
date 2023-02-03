import Button from "components/common/button/button";
import InputField from "components/common/input-field/input-field";
import { Loader, Lock, Mail, Plus } from "react-feather";
import useRegisterForm from "./hooks/useRegisterForm";

export default function RegisterForm() {
  const { errors, isLoading, isValid, register, handleSubmit, onSubmit } =
    useRegisterForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
      <Button
        type="submit"
        isDisabled={!isValid || isLoading}
        label={isLoading ? "Loading" : "RegisterForm"}
        icon={isLoading ? <Loader className="animate-spin" /> : <Plus />}
      />
    </form>
  );
}
