import { useEffect, useState } from "react";
import type { Pokedex } from "../../types/Pokedex";
import { RowAbility } from "./RowAbility";

export const ListAbilities = () => {
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/ability?offset=0&limit=20"
  );
  const [abilities, setAbilities] = useState<Pokedex>();

  useEffect(() => {
    const getAbilities = async () => {
      let res = await fetch(url);
      let data = await res.json();

      setAbilities(data);
    };
    getAbilities();
  }, []);

  const previous = async () => {
    let res = await fetch(abilities?.previous);
    let data = await res.json();

    setAbilities(data);
  };

  const next = async () => {
    let res = await fetch(abilities?.next);
    let data = await res.json();

    setAbilities(data);
  };

  return (
    <>
      <div className="flex flex-col m-10 border-2 border-gray-800 rounded-lg">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  {abilities?.results.map((move) => (
                    <RowAbility key={move?.name} name={move?.name} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-6 m-10">
        {abilities?.previous && (
          <button
            onClick={() => previous()}
            className="py-3 px-4 rounded-lg bg-gray-400 font-medium"
          >
            Previous page
          </button>
        )}
        {abilities?.next && (
          <button
            onClick={() => next()}
            className="py-3 px-4 rounded-lg bg-gray-400 font-medium"
          >
            Next Page
          </button>
        )}
      </div>
    </>
  );
};
