import clsx from "clsx";
import Button from "components/common/button/button";
import { useRouter } from "next/router";
import React from "react";
import { UserPlus, LogIn } from "react-feather";

function Unlogged() {
  const { push } = useRouter();

  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h1
          className={clsx([
            "text-3xl font-semibold text-neutral-800",
            "dark:text-neutral-200",
          ])}
        >
          Welcome!
        </h1>
        <h2
          className={clsx([
            "text-lg text-neutral-700",
            "dark:text-neutral-300",
          ])}
        >
          Log in to access your account.
        </h2>
      </header>
      <section className="flex items-center gap-8">
        <Button
          label="Register"
          variant="secondary"
          className="w-full"
          icon={<UserPlus />}
          onClick={() => push("/auth/register")}
        />
        <Button
          label="Log in"
          icon={<LogIn />}
          className="w-full"
          onClick={() => push("/auth/login")}
        />
      </section>
    </article>
  );
}

export default Unlogged;
