import AuthGuest from "components/auth/components/auth-guest/auth-guest";
import ProfileActions from "components/profile/profile-actions/profile-actions";
import ProfileUsernameForm from "components/profile/profile-username-form/profile-username-form";
import ProfileHeader from "components/profile/profile-header/profile-header";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import ProfilePasswordForm from "components/profile/profile-password-form/profile-password-form";
import Divider from "components/common/divider/divider";

const ProfilePage: NextPage = () => {
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <AuthGuest title="Welcome!" message="Log in to access your profile." />
    );
  }
  return (
    <>
      <Head>
        <title>Tempest - Profile</title>
        <meta name="description" content="Tempest - Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center gap-8">
        <ProfileHeader />
        <article className="flex w-full flex-col gap-8">
          <Divider />
          <ProfileUsernameForm />
          <Divider />
          <ProfilePasswordForm />
          <Divider />
          <ProfileActions />
        </article>
      </main>
    </>
  );
};

export default ProfilePage;
