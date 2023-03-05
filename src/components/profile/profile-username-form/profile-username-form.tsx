import { zodResolver } from "@hookform/resolvers/zod";
import Button from "components/common/button/button";
import InputField from "components/common/input-field/input-field";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import { User as UserIcon } from "react-feather";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateUsername } from "services/user/user";
import { getErrorMessage } from "utils/api";
import { z } from "zod";

const usernameSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(1, "Username cannot be empty"),
});
type UsernameSchema = z.infer<typeof usernameSchema>;

export default function ProfileUsernameForm() {
  const { data } = useSession();
  const {
    formState: { isDirty, errors },
    reset,
    register,
    handleSubmit,
  } = useForm<UsernameSchema>({
    resolver: zodResolver(usernameSchema),
    mode: "all",
    defaultValues: {
      username: data?.user?.username || "",
    },
  });

  const onSubmit: SubmitHandler<UsernameSchema> = async ({ username }) => {
    try {
      const {
        user: { username: updatedUsername },
      } = await updateUsername(username);
      triggerAuthContextUpdate();
      reset({ username: updatedUsername });
      toast.success("Username changed");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const triggerAuthContextUpdate = () => {
    // Hack to trigger auth context update
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  useEffect(() => {
    // Function that mimics window change
    const handleAuthContextUpdate = () =>
      !document.hidden && getSession({ event: "visibilitychange" });

    // Adding event listener to the document
    document.addEventListener(
      "visibilitychange",
      handleAuthContextUpdate,
      false
    );
    // Removing event listener from the document
    return document.removeEventListener(
      "visibilitychange",
      handleAuthContextUpdate,
      false
    );
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
        Change username
      </h1>
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
    </section>
  );
}
