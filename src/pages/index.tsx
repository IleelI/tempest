import { type NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useDarkModeContext } from "../context/darkModeContext";
import { useGeolocationContext } from "../context/geolocationContext";

const Home: NextPage = () => {
  const { position, error, getPosition } = useGeolocationContext();
  const { isDarkMode } = useDarkModeContext();

  useEffect(() => {
    getPosition();
  }, [getPosition]);

  return (
    <>
      <Head>
        <title>Tempest</title>
        <meta name="description" content="Tempest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[hsl(0,65%,75%)] to-[hsl(225,83%,75%)] dark:from-[hsl(0,65%,40%)] dark:to-[hsl(225,83%,40%)]">
        <header className="flex max-w-sm flex-col gap-10">
          <h1 className="text-6xl font-extrabold text-stone-800 dark:text-stone-200">
            Tempest
          </h1>
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-medium text-stone-800 dark:text-stone-300">
              Current theme
            </h1>
            <p
              className={`rounded-md bg-stone-800 bg-opacity-25 px-4 py-2 text-lg font-medium text-stone-100 backdrop-blur-md  dark:bg-stone-200 dark:bg-opacity-50 dark:text-stone-800`}
            >
              {isDarkMode ? "Dark theme" : "Light theme"}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            {error && error?.PERMISSION_DENIED === error?.code && (
              <div className="flex flex-col gap-1">
                <p className="text-lg font-medium text-stone-700 dark:text-stone-300">
                  To use geolocation you must agree, to using location services.
                </p>
              </div>
            )}
            {error && error?.POSITION_UNAVAILABLE === error?.code && (
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-medium text-stone-800 dark:text-stone-300">
                  Position unavailable
                </h2>
              </div>
            )}
            {position && (
              <>
                <h2 className="text-2xl font-medium text-stone-800 dark:text-stone-300">
                  Your position
                </h2>
                <div>
                  <p className="text-lg font-medium text-stone-700 dark:text-stone-400">
                    Latitude: {position.coords.latitude.toFixed(4)}
                  </p>
                  <p className="text-lg font-medium text-stone-700 dark:text-stone-400">
                    Longitude: {position.coords.longitude.toFixed(4)}
                  </p>
                </div>
              </>
            )}
          </div>
        </header>
      </main>
    </>
  );
};

export default Home;
