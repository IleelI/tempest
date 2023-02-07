import Button from "components/common/button/button";
import AuthGuest from "components/auth/components/auth-guest/auth-guest";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";

const ProfilePage: NextPage = () => {
  const { data: session } = useSession();

  if (!session?.user)
    return (
      <AuthGuest title="Welcome!" message="Log in to access your profile." />
    );

  return (
    <div className="flex flex-col gap-4">
      <h1>Your Profile</h1>
      <Button label="Sign out" onClick={() => signOut()} />
    </div>
  );
};

export default ProfilePage;
