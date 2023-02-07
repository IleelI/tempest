import clsx from "clsx";
import AuthGuest from "components/auth/components/auth-guest/auth-guest";
import Button from "components/common/button/button";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Trash } from "react-feather";
import { getFavouriteLocations } from "services/favouriteLocations/favouriteLocations";
import type { FavouriteLocation } from "services/favouriteLocations/types";

const FavouritesPage: NextPage = () => {
  const { data: session } = useSession();
  const [data, setData] = useState<FavouriteLocation[] | null>(null);

  if (!session) {
    return (
      <AuthGuest
        title="Welcome!"
        message="Login to access your favourite locations."
      />
    );
  }

  const makeRequest = async () => {
    try {
      const data = await getFavouriteLocations();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };
  const hasData = data && data.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
        Your favourite locations
      </h1>
      {hasData ? (
        <ul className="flex flex-col gap-4">
          {data.map((location) => (
            <li
              key={location.id}
              className="grid grid-cols-favouriteLocations items-center gap-4 rounded-lg border border-neutral-200 p-4 text-neutral-50 shadow-main dark:border-transparent dark:bg-neutral-800 dark:shadow-none"
            >
              <div>
                <h1 className=" font-medium text-neutral-800 dark:text-neutral-200">
                  {location.city}, {location.country}
                </h1>
              </div>
              <button
                type="button"
                aria-label="Remove from favourites"
                className={clsx([
                  "-m-2 p-2 text-red-800 transition-colors",
                  "dark:text-red-300",
                  "hover:text-red-600 hover:dark:text-red-400",
                ])}
              >
                <Trash />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="tracking-tight text-neutral-800 dark:text-neutral-200">
          You do not have any favourite locations. Try adding one!
        </h2>
      )}
      <Button label="Get favourite locations" onClick={makeRequest} />
    </div>
  );
};

export default FavouritesPage;
