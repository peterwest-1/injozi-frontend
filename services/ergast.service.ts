import { Driver, Race, StandingsList, StandingsTable } from "@/types";

export const getChamps = async () => {
  const response = await fetch("https://ergast.com/api/f1/driverStandings/1.json?limit=18&offset=55");
  const json = await response.json();
  const standingsList = json.MRData.StandingsTable.StandingsLists as StandingsList[];
  return standingsList;
};

export const getSeason = async (year: string) => {
  const url = `https://ergast.com/api/f1/${parseInt(year)}/results/1.json`;
  const response = await fetch(url);
  const json = await response.json();
  const races = json.MRData.RaceTable.Races as Race[];
  return races;
};

export const getChampForYear = async (year: string) => {
  const offset = parseInt(year) - 1950;
  const url = `https://ergast.com/api/f1/driverStandings/1.json?limit=1&offset=${offset}`;

  //TODO: Find proper way to get champ for specific year
  const response = await fetch(url);
  const json = await response.json();
  const champ = json.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver as Driver;

  return {
    givenName: champ.givenName,
    familyName: champ.familyName,
  };
};
