import clsx from "clsx";
import { useSession } from "next-auth/react";
import ProfileAvatar from "./profile-avatar";

export default function ProfileHeader() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="flex flex-col items-center gap-2 lg:gap-4">
      <ProfileAvatar />
      <h1
        className={clsx([
          "text-lg font-semibold text-neutral-800 ",
          "lg:text-2xl",
          "dark:text-neutral-200",
        ])}
      >
        Hello, {user?.username ?? "there"}!
      </h1>
    </header>
  );
}
