import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { type NextPage } from "next";
import Head from "next/head";
import CitySelection from "components/home/components/city-selection/city-selection";
import { getWeatherByHour } from "services/openMeteo/openMeteo";
import type { GetTodayWeatherResponse } from "services/openMeteo/types";
import HourlyWeather from "components/home/components/hourly-weather/hourly-weather";
import TodaysWeather from "components/home/components/todays-weather/todays-weather";
import MiniInfoGrid from "components/home/components/mini-info-grid/mini-info-grid";
import { HourlyWeatherProvider } from "components/home/context/hourly-weather-context";

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;
const Home: NextPage<HomeProps> = ({ initialHourlyData }) => {
  return (
    <>
      <Head>
        <title>Tempest</title>
        <meta name="description" content="Tempest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col gap-6">
        <CitySelection />
        <HourlyWeatherProvider initialData={initialHourlyData}>
          <TodaysWeather />
          <HourlyWeather />
          <MiniInfoGrid />
        </HourlyWeatherProvider>
      </main>
    </>
  );
};

export default Home;

type HomeStaticProps = {
  initialHourlyData?: GetTodayWeatherResponse;
};
export const getStaticProps: GetStaticProps<HomeStaticProps> =
  async function () {
    try {
      const initialHourlyData = await getWeatherByHour();
      return {
        props: {
          initialHourlyData,
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
