import clsx from "clsx";
import type { User } from "next-auth";
import Image from "next/image";
import { User as UserIcon } from "react-feather";

type ProfileHeaderProps = {
  user: User;
};
export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const { id, username, image } = user;
  const hasImage = Boolean(image);
  const imageSrc = `https://tempest-app.fly.dev/api/files/users/${id}/${image}`;

  return (
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
          <UserIcon className="h-full w-full translate-y-1.5 stroke-[0.5]" />
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
  );
}
