import AuthGuest from "components/auth/components/auth-guest/auth-guest";
import ProfileActions from "components/profile/profile-actions/profile-actions";
import ProfileForm from "components/profile/profile-form/profile-form";
import ProfileHeader from "components/profile/profile-header/profile-header";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";

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
      <main className="flex flex-col items-center gap-4">
        <ProfileHeader user={session.user} />
        <article className="flex w-full flex-col gap-6 lg:gap-8">
          <ProfileForm user={session.user} />
          <div className="h-[1px] w-full rounded-full bg-neutral-300" />
          <ProfileActions />
        </article>
      </main>
    </>
  );
};

export default ProfilePage;
