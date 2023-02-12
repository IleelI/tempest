import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import AuthGuest from "components/auth/components/auth-guest/auth-guest";
import Button from "components/common/button/button";
import InputField from "components/common/input-field/input-field";
import useLogout from "hooks/useLogout/useLogout";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { Trash, User, Lock, LogOut } from "react-feather";
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

const ProfilePage: NextPage = () => {
  const { data: session } = useSession();
  const logout = useLogout();
  const {
    formState: { errors, isDirty },
    register,
    handleSubmit,
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    mode: "all",
    defaultValues: {
      username: session?.user.username ?? "",
    },
  });

  const onSubmit: SubmitHandler<ProfileSchema> = (data) => {
    console.log(data);
  };

  if (!session?.user) {
    return (
      <AuthGuest title="Welcome!" message="Log in to access your profile." />
    );
  }
  const { id, username, image } = session.user;
  const hasImage = Boolean(image);
  const imageSrc = `https://tempest-app.fly.dev/api/files/users/${id}/${image}`;

  return (
    <>
      <Head>
        <title>Tempest - Profile</title>
        <meta name="description" content="Tempest - Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center gap-4">
        <header className="flex flex-col items-center gap-2 lg:gap-4">
          <div
            className={clsx([
              "relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border shadow-main",
              "lg:h-32 lg:w-32",
              hasImage
                ? "border-neutral-800 dark:border-neutral-200"
                : "border-2 border-neutral-800 bg-neutral-50 dark:border-neutral-200 dark:bg-neutral-900",
            ])}
          >
            {hasImage ? (
              <Image priority fill alt="User profile image" src={imageSrc} />
            ) : (
              <User className="h-full w-full translate-y-1.5 stroke-[0.5]" />
            )}
          </div>
          <h1
            className={clsx([
              "text-lg font-semibold text-neutral-800 ",
              "lg:text-2xl",
              "dark:text-neutral-200",
            ])}
          >
            Hello, {username}!
          </h1>
        </header>
        <div className="flex w-full flex-col gap-6 lg:gap-8">
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
              icon={<User />}
            />
          </form>
          <div className="h-[1px] w-full rounded-full bg-neutral-300" />
          <section className="flex flex-col gap-4">
            <Button
              label="Change password"
              icon={<Lock />}
              className="!justify-start"
            />
            <Button
              label="Log out"
              icon={<LogOut />}
              className="!justify-start"
              onClick={() => logout()}
            />
            <Button
              label="Delete account"
              icon={<Trash />}
              className="!justify-start bg-red-800 hover:bg-red-700 dark:bg-red-300 hover:dark:bg-red-400"
            />
          </section>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
