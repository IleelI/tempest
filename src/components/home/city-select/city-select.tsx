import { useGeolocationContext } from "context/geolocationContext";
import { MapPin } from "react-feather";

const CitySelect = () => {
  const { getPosition, isGeolocationDenied } = useGeolocationContext();

  return (
    <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-800 shadow-main dark:border-none dark:bg-neutral-800 dark:text-neutral-200">
      <button
        type="button"
        aria-label="Get location"
        disabled={isGeolocationDenied}
        onClick={() => getPosition()}
      >
        <MapPin />
      </button>
    </div>
  );
};

export default CitySelect;
