import { Race, StandingsList, StandingsTable } from "@/types";

export const getChamps = async () => {
  const response = await fetch("https://ergast.com/api/f1/driverStandings/1.json?limit=18&offset=55");
  const json = await response.json();
  const list = json.MRData.StandingsTable.StandingsLists as StandingsList[];
  return list;
};

export const getSeason = async (year: string) => {
  const response = await fetch(`https://ergast.com/api/f1/${parseInt(year)}/results/1.json`);
  const json = await response.json();
  const list = json.MRData.RaceTable.Races as Race[];
  return list;
};
