import type { ReactNode } from "react";
import { useContext } from "react";
import { createContext } from "react";
import type { UseGeolocationReturn } from "../hooks/useGeolocation/useGeolocation";
import useGeolocation from "../hooks/useGeolocation/useGeolocation";

type GeolocationContextType = UseGeolocationReturn;
const GeolocationContext = createContext<GeolocationContextType | undefined>(
  undefined
);

type GeolocationProviderType = {
  children: ReactNode;
};
function GeolocationProvider({ children }: GeolocationProviderType) {
  const geolocation = useGeolocation();

  return (
    <GeolocationContext.Provider value={geolocation}>
      {children}
    </GeolocationContext.Provider>
  );
}

const useGeolocationContext = () => {
  const context = useContext(GeolocationContext);
  if (context === undefined) {
    throw new Error(
      "useGeolocationContext must be used within useGeolocationProvider"
    );
  }
  return context;
};

export { GeolocationProvider, useGeolocationContext };
