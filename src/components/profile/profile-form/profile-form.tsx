import { zodResolver } from "@hookform/resolvers/zod";
import Button from "components/common/button/button";
import InputField from "components/common/input-field/input-field";
import type { User } from "next-auth";
import { User as UserIcon } from "react-feather";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

const profileSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(1, "Username cannot be empty"),
});
type ProfileSchema = z.infer<typeof profileSchema>;

type ProfileFormProps = {
  user: User;
};
export default function ProfileForm({ user }: ProfileFormProps) {
  const {
    formState: { isDirty, errors },
    register,
    handleSubmit,
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    mode: "all",
    defaultValues: {
      username: user.username,
    },
  });

  const onSubmit: SubmitHandler<ProfileSchema> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-4"
    >
      <InputField
        label="Username"
        {...register("username")}
        error={errors.username}
      />
      <Button
        isDisabled={Boolean(errors.username) || !isDirty}
        type="submit"
        label="Change username"
        className="!justify-start"
        icon={<UserIcon />}
      />
    </form>
  );
}
