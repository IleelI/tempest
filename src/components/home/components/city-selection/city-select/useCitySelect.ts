import type { LocationType } from "context/location-context";
import { DEFAULT_LOCATION, useLocationContext } from "context/location-context";
import type { Comparator } from "lodash";
import { debounce, uniqWith } from "lodash";
import { useCallback, useMemo } from "react";
import type { GroupBase, OptionsOrGroups, SingleValue } from "react-select";
import { getGeolocationsFromCity } from "services/openWeatherGeo/openWeatherGeo";
import type { GeocodingResponse } from "services/openWeatherGeo/types";

const INPUT_DELAY = 1_000;
export const DEFAULT_OPTIONS: LocationType[] = [
  { ...DEFAULT_LOCATION },
  {
    name: "London",
    country: "GB",
    latitude: 51.5073,
    longitude: -0.1277,
  },
  {
    name: "Warsaw",
    country: "PL",
    latitude: 52.2297,
    longitude: 21.0122,
  },
  {
    name: "Berlin",
    country: "DE",
    latitude: 52.52,
    longitude: 13.4049,
  },
  {
    name: "Prague",
    country: "CZ",
    latitude: 50.0755,
    longitude: 14.4378,
  },
  {
    name: "Paris",
    country: "FR",
    latitude: 48.8566,
    longitude: 2.3522,
  },
];

const compareCityAndCountry: Comparator<GeocodingResponse | LocationType> = (
  firstLocation,
  secondLocation
) => {
  const sameName =
    firstLocation.name.toLowerCase() === secondLocation.name.toLowerCase();
  const sameCountry =
    firstLocation.country.toLowerCase() ===
    secondLocation.country.toLowerCase();
  return sameName && sameCountry;
};

type LoadOptionsCallback = (
  options: OptionsOrGroups<LocationType, GroupBase<LocationType>>
) => void;

type LoadOptions = (
  newValue: string,
  callback: LoadOptionsCallback
) => void | Promise<void>;
const handleLoadOptions: LoadOptions = async (newValue, callback) => {
  try {
    const { locations } = await getGeolocationsFromCity(newValue);
    const filteredApiOptions: LocationType[] = uniqWith(
      locations,
      compareCityAndCountry
    ).map((data) => ({
      country: data.country,
      name: data.name,
      latitude: data.lat,
      longitude: data.lon,
    }));
    const filteredDefaultOptions = DEFAULT_OPTIONS.filter(
      ({ name: cityName }) =>
        cityName.toLowerCase().includes(newValue.toLowerCase())
    );
    const filteredOptions = uniqWith(
      [...filteredApiOptions, ...filteredDefaultOptions],
      compareCityAndCountry
    );
    callback(filteredOptions);
  } catch (error) {
    callback(DEFAULT_OPTIONS);
  }
};

export default function useCitySelect() {
  const { currentLocation, setCurrentLocation } = useLocationContext();

  const visibleOptions = useMemo(
    () =>
      uniqWith([currentLocation, ...DEFAULT_OPTIONS], compareCityAndCountry),
    [currentLocation]
  );

  const handleOptionChange = useCallback(
    (newValue: SingleValue<LocationType>) => {
      if (!newValue) return;
      setCurrentLocation(newValue);
    },
    [setCurrentLocation]
  );

  const loadOptions = useMemo(
    () =>
      debounce((newValue: string, callback: LoadOptionsCallback) => {
        handleLoadOptions(newValue, callback);
      }, INPUT_DELAY),
    []
  );

  return {
    currentLocation,
    visibleOptions,
    loadOptions,
    handleOptionChange,
  };
}
