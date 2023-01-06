import { type NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import useGeolocation from "../hooks/useGeolocation/useGeolocation";

const Home: NextPage = () => {
  const { position, error, getPosition } = useGeolocation();

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
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[hsl(0,65%,40%)] to-[hsl(225,83%,40%)]">
        <header className="flex flex-col gap-10">
          <h1 className="text-6xl font-extrabold text-stone-200">Tempest</h1>
          {!error && (
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-medium text-stone-300">
                Your position
              </h2>
              <div>
                <p className="text-lg font-medium text-stone-400">
                  Latitude: {position?.coords.latitude.toFixed(4) ?? 0}
                </p>
                <p className="text-lg font-medium text-stone-400">
                  Longitude: {position?.coords.longitude.toFixed(4) ?? 0}
                </p>
              </div>
            </div>
          )}
        </header>
      </main>
    </>
  );
};

export default Home;
