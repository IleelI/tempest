import { useSession } from "next-auth/react";
import Image from "next/image";
import { User as UserIcon } from "react-feather";
import clsx from "clsx";

export default function ProfileAvatar() {
  const { data: session } = useSession();
  const user = session?.user;
  const hasImage = Boolean(user?.image);
  const imageSrc =
    user && hasImage
      ? `https://tempest-app.fly.dev/api/files/users/${user.id}/${user.image}`
      : "#";

  return (
    <div
      className={clsx([
        "relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border",
        "lg:h-32 lg:w-32",
        "hover:shadow-main",
        hasImage
          ? "border-neutral-700 dark:border-neutral-300"
          : "border-2 border-neutral-700 dark:border-neutral-300",
      ])}
    >
      {hasImage ? (
        <Image
          fill
          priority
          alt="User profile image"
          sizes="96px,(min-width: 1024px) 128px"
          src={imageSrc}
        />
      ) : (
        <UserIcon className="h-full w-full translate-y-1.5 stroke-[0.5]" />
      )}
    </div>
  );
}
