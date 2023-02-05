import Link from "next/link";
import React from "react";

export enum AuthRedirect {
  LOGIN = "/auth/login",
  REGISTER = "/auth/register",
}
type AuthHeaderProps = {
  title: string;
  redirectMessage: string;
  redirect: AuthRedirect;
  error?: unknown;
};
function AuthHeader({
  title,
  redirectMessage,
  redirect,
  error,
}: AuthHeaderProps) {
  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        {title}
      </h1>
      <h2 className="flex items-center gap-1">
        <span>{redirectMessage}</span>
        <Link
          href={redirect}
          className="text-blue-700 underline underline-offset-2 dark:text-blue-300"
        >
          here.
        </Link>
      </h2>
      {Boolean(error) && (
        <h2 className="text-sm font-medium tracking-wide text-red-700 dark:text-red-300">
          {String(error)}
        </h2>
      )}
    </header>
  );
}

export default AuthHeader;
