import { type NextPage } from "next";
import Head from "next/head";
import { useDarkModeContext } from "context/darkModeContext";
import CitySelect from "components/home/city-select/city-select";

const Home: NextPage = () => {
  const { isDarkMode } = useDarkModeContext();

  return (
    <>
      <Head>
        <title>Tempest</title>
        <meta name="description" content="Tempest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col gap-6">
        <CitySelect />
        <section className="rounded-lg bg-neutral-50 p-4 shadow-main dark:bg-neutral-800">
          <h1 className="font-medium text-neutral-800 dark:text-neutral-200">
            Current theme: {isDarkMode ? "dark" : "light"}
          </h1>
        </section>
      </main>
    </>
  );
};

export default Home;
