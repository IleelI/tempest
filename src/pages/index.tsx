import { type NextPage } from "next";
import Head from "next/head";
import { useDarkModeContext } from "context/darkModeContext";

const Home: NextPage = () => {
  const { handleDarkModeToggle } = useDarkModeContext();

  return (
    <>
      <Head>
        <title>Tempest</title>
        <meta name="description" content="Tempest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-full flex-[2] flex-col items-center justify-center">
        <h1 className="mb-8 text-5xl font-semibold">Tempest 🌩️</h1>
        <button
          type="button"
          className="rounded-lg bg-neutral-700 px-6 py-2 text-neutral-300 dark:bg-neutral-300 dark:text-neutral-700"
          onClick={() => handleDarkModeToggle()}
        >
          Toggle theme
        </button>
      </main>
    </>
  );
};

export default Home;
