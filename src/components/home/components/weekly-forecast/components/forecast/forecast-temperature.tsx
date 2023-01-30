type ForecastTemperatureProps = {
  maxTemperature: number;
  minTemperature: number;
  temperatureUnit: string;
};
export default function ForecastTemperature({
  minTemperature,
  maxTemperature,
  temperatureUnit,
}: ForecastTemperatureProps) {
  return (
    <section className="flex items-center gap-2">
      <p className="tracking-wide">
        {maxTemperature.toFixed(0)}
        {temperatureUnit}
      </p>
      <p className="tracking-wide text-blue-800 opacity-75 dark:text-blue-300">
        {minTemperature.toFixed(0)}
        {temperatureUnit}
      </p>
    </section>
  );
}
