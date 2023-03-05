import AsyncSelect from "react-select/async";
import { getFlagEmoji } from "utils/string";
import clsx from "clsx";
import useCitySelect from "./useCitySelect";
import type { ClassNamesConfig, FormatOptionLabelMeta } from "react-select";
import type { LocationType } from "context/location-context/location-context";

const selectClasses: ClassNamesConfig<LocationType, false> = {
  container: () => "bg-transparent flex-[2] outline-neutral-300",
  control: () => "gap-4 !grid grid-cols-[1fr_max-content] !min-h-0",
  valueContainer: () =>
    "text-lg font-semibold text-neutral-800 dark:text-neutral-200 cursor-text",
  indicatorsContainer: () => "cursor-pointer",
  dropdownIndicator: ({ selectProps: { menuIsOpen } }) =>
    clsx(["!transition-transform !duration-300", menuIsOpen && "-rotate-180"]),
  indicatorSeparator: () => "hidden",
  // Width is calculated base on padding of container 2rem + size of icon with gap between itself and select (1rem + 1rem)
  // Width = 100% + 4rem
  // Left is added width minus padding padding of container, so left = 4rem - 1rem
  // Top is calculated from total height of select and pading of container with some added gap
  // Height = 100%, padding: 0.75rem, added gap: 0.5rem
  menu: () =>
    clsx([
      "!w-[calc(100%_+_4rem)] !top-[calc(100%_+_1.25rem)] -left-[3rem] px-4 py-6",
      "bg-neutral-50 border border-neutral-200 dark:border-none dark:bg-neutral-800 rounded-lg",
      "shadow-main",
    ]),
  menuList: () => "flex flex-col gap-2 text-base",
  option: ({ isFocused, isSelected }) =>
    clsx([
      "relative !cursor-pointer relative font-medium",
      "after:mt-2 after:w-full after:block after:h-[1px]",
      "after:bg-neutral-200 dark:after:bg-neutral-700 rounded-lg",
      isSelected
        ? "text-blue-800 dark:text-blue-400 font-semibold"
        : isFocused
        ? "text-neutral-800 dark:text-neutral-200"
        : "text-neutral-500 dark:text-neutral-400",
    ]),
  noOptionsMessage: () => "break-all",
};

const formatOptionLabel = (
  { country, name }: LocationType,
  { context }: FormatOptionLabelMeta<LocationType>
) => {
  const baseLabel = `${name}, ${country}`;
  if (context === "menu") {
    return `${getFlagEmoji(country)} ${baseLabel}`;
  } else {
    return baseLabel;
  }
};

const getOptionValue = ({ name, country }: LocationType) =>
  `${name.toLowerCase()},${country.toLowerCase()}`;

const CitySelect = () => {
  const { currentLocation, visibleOptions, loadOptions, handleOptionChange } =
    useCitySelect();

  return (
    <AsyncSelect
      instanceId="city-select"
      unstyled
      openMenuOnFocus
      classNames={selectClasses}
      loadOptions={loadOptions}
      defaultOptions={visibleOptions}
      noOptionsMessage={({ inputValue }) => `No city found for ${inputValue}.`}
      value={currentLocation}
      onChange={handleOptionChange}
      getOptionValue={getOptionValue}
      formatOptionLabel={formatOptionLabel}
    />
  );
};

export default CitySelect;
