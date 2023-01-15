import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { getCityFromGeolocation } from "services/openWeatherGeo/openWeatherGeo";
import { useGeolocationContext } from "./geolocation-context";

export type LocationType = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};
export const DEFAULT_LOCATION: LocationType = {
  name: "Gdansk",
  country: "PL",
  latitude: 54.3485,
  longitude: 18.5646,
};

type LocationContextType = {
  currentLocation: LocationType;
  setCurrentLocation: Dispatch<SetStateAction<LocationType>>;
};
const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

type LocationProviderType = {
  children: ReactNode;
};
function LocationProvider(props: LocationProviderType) {
  const { position } = useGeolocationContext();
  const [currentLocation, setCurrentLocation] = useState(DEFAULT_LOCATION);
  const oldPosition = useRef(position);

  // Watch for change in geolocation if coordinates are diffrent from the old ones
  // fetch the new current location from api route
  useEffect(() => {
    const hasSameLatitude =
      oldPosition.current?.coords.latitude === position?.coords.latitude;
    const hasSameLongitude =
      oldPosition.current?.coords.longitude === position?.coords.longitude;
    const hasSameLocation = hasSameLatitude && hasSameLongitude;
    if (!position || hasSameLocation) {
      return;
    }
    const getNewLocation = async function () {
      try {
        const { latitude, longitude } = position.coords;
        const {
          city: { country, lat, lon, name },
        } = await getCityFromGeolocation(latitude, longitude);
        setCurrentLocation({
          name,
          country,
          latitude: lat,
          longitude: lon,
        });
      } catch (error) {
        console.error(error);
      } finally {
        oldPosition.current = position;
      }
    };
    getNewLocation();
  }, [position]);

  return (
    <LocationContext.Provider
      value={{ currentLocation, setCurrentLocation }}
      {...props}
    />
  );
}

function useLocationContext() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocationContext must be used within it's provider");
  }
  return context;
}

export { LocationProvider, useLocationContext };
