import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { type NextPage } from "next";
import Head from "next/head";
import CitySelection from "components/home/components/city-selection/city-selection";
import {
  getWeatherByDay,
  getWeatherByHour,
} from "services/openMeteo/openMeteo";
import type {
  GetDailyWeatherResponse,
  GetTodayWeatherResponse,
} from "services/openMeteo/types";
import HourlyWeather from "components/home/components/hourly-weather/hourly-weather";
import TodaysWeather from "components/home/components/todays-weather/todays-weather";
import MiniInfoGrid from "components/home/components/mini-info-grid/mini-info-grid";
import { HourlyWeatherProvider } from "components/home/context/hourly-weather-context";
import WeeklyWeather from "components/home/components/weekly-weather/weekly-weather";

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;
const Home: NextPage<HomeProps> = ({
  initialHourlyData,
  initialWeeklyData,
}) => {
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
        <WeeklyWeather initialData={initialWeeklyData} />
      </main>
    </>
  );
};

export default Home;

type HomeStaticProps = {
  initialHourlyData?: GetTodayWeatherResponse;
  initialWeeklyData?: GetDailyWeatherResponse;
};
export const getStaticProps: GetStaticProps<HomeStaticProps> =
  async function () {
    try {
      const initialHourlyData = await getWeatherByHour();
      const initialWeeklyData = await getWeatherByDay();
      return {
        props: {
          initialHourlyData,
          initialWeeklyData,
        },
        revalidate: 60,
      };
    } catch (error) {
      return {
        props: {
          initTodayWeatherData: undefined,
          initialWeeklyData: undefined,
        },
        revalidate: 60,
      };
    }
  };
