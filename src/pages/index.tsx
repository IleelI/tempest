import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { type NextPage } from "next";
import Head from "next/head";
import {
  getForecastByDay,
  getForecastByHour,
} from "services/openMeteo/openMeteo";
import type {
  GetDailyForecastResponse,
  GetTodayForecastResponse,
} from "services/openMeteo/types";
import { HourlyForecastProvider } from "components/home/context/hourly-forecast-context/hourly-forecast-context";
import HourlyForecast from "components/home/components/hourly-forecast/hourly-forecast";
import CitySelection from "components/home/components/city-selection/city-selection";
import CurrentForecast from "components/home/components/current-forecast/current-forecast";
import MiniInfoGrid from "components/home/components/mini-info-grid/mini-info-grid";
import WeeklyForecast from "components/home/components/weekly-forecast/weekly-forecast";

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;
const Home: NextPage<HomeProps> = ({
  initialHourlyData,
  initialWeeklyData,
}) => {
  return (
    <>
      <Head>
        <title>Tempest - Home</title>
        <meta name="description" content="Tempest - Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col gap-6">
        <CitySelection />
        <HourlyForecastProvider initialData={initialHourlyData}>
          <CurrentForecast />
          <HourlyForecast />
          <MiniInfoGrid />
        </HourlyForecastProvider>
        <WeeklyForecast initialData={initialWeeklyData} />
      </main>
    </>
  );
};

export default Home;

type HomeStaticProps = {
  initialHourlyData?: GetTodayForecastResponse;
  initialWeeklyData?: GetDailyForecastResponse;
};
export const getStaticProps: GetStaticProps<HomeStaticProps> =
  async function () {
    try {
      const initialHourlyData = await getForecastByHour();
      const initialWeeklyData = await getForecastByDay();
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
