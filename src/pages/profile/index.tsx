import Button from "components/common/button/button";
import Unlogged from "components/profile/unlogged/unlogged";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";

const ProfilePage: NextPage = () => {
  const { data: session } = useSession();

  if (!session?.user) return <Unlogged />;
  return <Button label="Sign out" onClick={() => signOut()} />;
};

export default ProfilePage;
