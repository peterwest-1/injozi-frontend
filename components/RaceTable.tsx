import { getChamps, getSeason } from "@/services/ergast.service";
import { StandingsList } from "@/types";
import { useEffect, useState } from "react";
import LoadingIndicator from "./LoadingIndicator";

import React from "react";

type Props = {
  selectYear: (name: string | undefined) => void;
};

const RaceTable = (props: Props) => {
  const [data, setData] = useState<StandingsList[]>();
  const [seasonSortingDescending, setSeasonSortingDescending] = useState<boolean>(false);

  useEffect(() => {
    const fetchChamps = async () => {
      const champs = await getChamps();
      setData(champs);
    };
    fetchChamps();
  }, []);

  const handleViewSeason = async (year: string) => {
    props.selectYear(year);
  };

  const handleSortBySeason = () => {
    setSeasonSortingDescending((seasonSortingDescending) => !seasonSortingDescending);

    if (!seasonSortingDescending) {
      setData([...data!].sort((a, b) => parseInt(b.season) - parseInt(a.season)));
    } else {
      setData([...data!].sort((a, b) => parseInt(a.season) - parseInt(b.season)));
    }
  };

  return (
    <>
      <div>
        {!data && <LoadingIndicator />}
        <table className="w-full text-sm  text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th onClick={handleSortBySeason} scope="col" className="px-6 py-3">
                Season {seasonSortingDescending ? <span>&#8595;</span> : <span>&#8593;</span>}
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                View Complete Season
              </th>
            </tr>
          </thead>
          <tbody>
            {!!data &&
              data.map((item: StandingsList, index) => (
                <tr key={index} className="bg-white border-b ">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.season}
                  </th>
                  <td className="px-6 py-4">
                    {item.DriverStandings[0].Driver.givenName}
                    <strong> {item.DriverStandings[0].Driver.familyName}</strong>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        handleViewSeason(item.season);
                      }}
                    >
                      {item.season}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>{" "}
    </>
  );
};

export default RaceTable;
