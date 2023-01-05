import { useCallback, useMemo, useState } from "react";
import getNavigator from "../../utils/browser";

const getPositionOptions: PositionOptions = {
  enableHighAccuracy: true,
};
const navigator = getNavigator();

export default function useGeolocation() {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);

  const onGeolocationSuccess = useCallback<PositionCallback>((position) => {
    setPosition(position);
    setError(null);
  }, []);

  const onGeolocationError = useCallback<PositionErrorCallback>((error) => {
    setError(error);
  }, []);

  const getPosition = useCallback(() => {
    if (!navigator) return;
    const geolocation = navigator.geolocation;
    geolocation.getCurrentPosition(
      onGeolocationSuccess,
      onGeolocationError,
      getPositionOptions
    );
  }, [onGeolocationSuccess, onGeolocationError]);

  const watchPosition = useMemo(
    () =>
      navigator?.geolocation.watchPosition.bind(
        navigator.geolocation,
        onGeolocationSuccess,
        onGeolocationError,
        getPositionOptions
      ) ?? null,
    [onGeolocationSuccess, onGeolocationError]
  );

  const clearPosition = useMemo(
    () => navigator?.geolocation.clearWatch.bind(navigator.geolocation) ?? null,
    []
  );

  return {
    position,
    error,
    getPosition,
    watchPosition,
    clearPosition,
  } as const;
}