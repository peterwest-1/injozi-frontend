import { Champion } from "@/pages";
import { getSeason } from "@/services/ergast.service";
import { Race } from "@/types";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "./LoadingIndicator";

type Props = {
  year: string;
  champ: Champion;
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
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="px-6 py-3"></th>
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

                const isChamp = champ.familyName === driverFamilyName;

                return (
                  <tr key={index} className={`  ${isChamp ? "border-f1-red border" : "border-t"}  `}>
                    <th
                      scope="row"
                      className={`w-1 py-4 font-medium text-gray-900 whitespace-nowrap  ${
                        isChamp ? "bg-f1-red" : "bg-white"
                      }`}
                    ></th>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
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
