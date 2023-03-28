import RaceTable from "@/components/RaceTable";
import SeasonTable from "@/components/SeasonTable";
import { getChampForYear } from "@/services/ergast.service";
import Head from "next/head";
import { useState } from "react";

const Home = () => {
  const [selectedYear, setSelectedYear] = useState<string | undefined | null>(null);
  const [champion, setChampion] = useState<string | undefined | null>(null);

  const callback = async (year: string | undefined) => {
    const champ = await getChampForYear(year!);
    setChampion(champ.familyName);
    setSelectedYear(year);
  };

  return (
    <>
      <Head>
        <title>F1 World Champs</title>
        <meta property="og:title" content="F1 World Champs" key="title" />
      </Head>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            F1 Insights
          </h1>
          <p className="my-4 text-2xl  tracking-tight text-gray-900 sm:text-4xl">World Champions</p>
        </div>
        <div className=" flex flex-row flex-grow justify-center  mx-32 ">
          <div className="w-full mt-16 sm:mt-20 lg:mt-24 px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <p className="my-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">World Champions</p>
            </div>
            <RaceTable selectYear={callback} />
          </div>
          <div className="w-full mt-16 sm:mt-20 lg:mt-24 px-8">
            {!selectedYear && !champion && (
              <p className="my-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Select a year from the column on the left
              </p>
            )}

            {selectedYear && champion && (
              <>
                <div className="mx-auto max-w-2xl lg:text-center">
                  <p className="my-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {selectedYear} - {champion}
                  </p>
                </div>
                <SeasonTable year={selectedYear} champ={champion} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
