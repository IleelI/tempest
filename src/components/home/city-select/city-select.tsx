import Tooltip from "components/common/tooltip/tooltip";
import { useGeolocationContext } from "context/geolocationContext";
import { useLocationContext } from "context/locationContext";
import { MapPin } from "react-feather";

const CitySelect = () => {
  const { getPosition } = useGeolocationContext();
  const { currentLocation } = useLocationContext();

  return (
    <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-800 shadow-main dark:border-none dark:bg-neutral-800 dark:text-neutral-200">
      <Tooltip legend="Get current location">
        <button
          type="button"
          aria-label="Get current location"
          className="-m-1 rounded-full p-1"
          onClick={() => getPosition()}
        >
          <MapPin />
        </button>
      </Tooltip>

      <p className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
        {currentLocation.name}, {currentLocation.country}{" "}
      </p>
    </div>
  );
};

export default CitySelect;
