import Button from "components/common/button/button";
import Divider from "components/common/divider/divider";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const ProfilePage: NextPage = () => {
  const { push } = useRouter();
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <div className="flex flex-col gap-8">
        <Button
          label="Log in"
          className="w-full justify-center"
          onClick={() => signIn()}
        />
        <Divider title="or" />
        <Button
          label="Register"
          className="w-full justify-center"
          onClick={() => push("/auth/register")}
        />
      </div>
    );
  }
  return <Button label="Sign out" onClick={() => signOut()} />;
};

export default ProfilePage;
