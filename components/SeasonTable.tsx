import { getSeason } from "@/services/ergast.service";
import { Race } from "@/types";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "./LoadingIndicator";

type Props = {
  year: string;
  champ: string;
};

const SeasonTable = ({ year, champ }: Props) => {
  const [season, setSeason] = useState<Race[] | null>();

  useEffect(() => {
    const fetchSeason = async () => {
      const season = await getSeason(year);
      setSeason(season);
    };
    fetchSeason();
  }, [year]);

  return (
    <div>
      <div className="relative overflow-x-auto">
        {!season && (
          <div className="flex align-middle justify-center">
            <LoadingIndicator />
          </div>
        )}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Race Name
              </th>
              <th scope="col" className="px-6 py-3">
                Winner
              </th>
            </tr>
          </thead>
          <tbody>
            {season &&
              season.map((race: Race, index) => {
                const driverGivenName = race.Results[0].Driver.givenName;
                const driverFamilyName = race.Results[0].Driver.familyName;

                const isChamp = champ === driverFamilyName;

                return (
                  <tr
                    key={index}
                    className={` border-b dark:bg-gray-800 dark:border-gray-700 ${isChamp ? "bg-red-200" : "bg-white"}`}
                  >
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {race.raceName}
                    </th>
                    <td className={`px-6 py-4 ${isChamp ? "font-bold" : ""}`}>
                      {driverGivenName} {driverFamilyName}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeasonTable;
