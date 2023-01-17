import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { type NextPage } from "next";
import Head from "next/head";
import CitySelection from "components/home/city-selection/city-selection";
import { useLocationContext } from "context/location-context";
import { useQuery } from "react-query";
import { getWeatherByHour } from "services/openMeteo/openMeteo";
import TodaysWeather from "components/home/todays-weather/todays-weather";
import type { GetTodayWeatherResponse } from "services/openMeteo/types";

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;
const Home: NextPage<HomeProps> = ({ initTodayWeatherData }) => {
  const { currentLocation } = useLocationContext();
  const { data } = useQuery({
    queryKey: [
      "get-today-weather",
      currentLocation.country,
      currentLocation.name,
    ],
    queryFn: () =>
      getWeatherByHour(currentLocation.latitude, currentLocation.longitude),
    initialData: initTodayWeatherData,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Head>
        <title>Tempest</title>
        <meta name="description" content="Tempest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col gap-6">
        <CitySelection />
        <TodaysWeather weatherData={data} />
      </main>
    </>
  );
};

export default Home;

type HomeStaticProps = {
  initTodayWeatherData?: GetTodayWeatherResponse;
};
export const getStaticProps: GetStaticProps<HomeStaticProps> =
  async function () {
    try {
      const todayWeatherData = await getWeatherByHour();
      return {
        props: {
          initTodayWeatherData: todayWeatherData,
        },
        revalidate: 60,
      };
    } catch (error) {
      return {
        props: {
          initTodayWeatherData: undefined,
        },
        revalidate: 60,
      };
    }
  };
