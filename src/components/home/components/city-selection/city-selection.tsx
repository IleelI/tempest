import Tooltip from "components/common/tooltip/tooltip";
import { useGeolocationContext } from "context/geolocation-context/geolocation-context";
import { MapPin } from "react-feather";
import CitySelect from "./city-select/city-select";

const CitySelection = () => {
  const { getPosition, isGeolocationDenied } = useGeolocationContext();

  return (
    <div className="relative flex items-center gap-4 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-800 shadow-main dark:border-none dark:bg-neutral-800 dark:text-neutral-200">
      <Tooltip
        legend={
          isGeolocationDenied
            ? "Location services disabled"
            : "Get current location"
        }
      >
        <button
          type="button"
          disabled={isGeolocationDenied}
          aria-label="Get current location"
          className="-m-1 rounded-full p-1 disabled:opacity-30"
          onClick={() => getPosition()}
        >
          <MapPin />
        </button>
      </Tooltip>
      <CitySelect />
    </div>
  );
};

export default CitySelection;
