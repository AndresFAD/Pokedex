import { useState } from "react";
import type { Pokedex } from "../../types/Pokedex";
import type { Ability } from "../../types/Ability";
import { getAbilitybyName } from "../../services/PokemonSerice";
import { RowAbility } from "./RowAbility";

interface Props {
  initialAbilityList: Pokedex;
  initialAbilities: Ability[];
}

export const ListAbilities = ({ initialAbilityList, initialAbilities }: Props) => {
  const [abilityList, setAbilityList] = useState<Pokedex>(initialAbilityList);
  const [abilities, setAbilities] = useState<Ability[]>(initialAbilities);
  const [loading, setLoading] = useState(false);

  const loadPage = async (pageUrl?: string) => {
    if (!pageUrl) return;
    setLoading(true);
    try {
      const res = await fetch(pageUrl);
      const data: Pokedex = await res.json();
      const details = await Promise.all(
        data.results.map((ability) => getAbilitybyName(ability.name))
      );

      setAbilityList(data);
      setAbilities(details);
    } finally {
      setLoading(false);
    }
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
                  {abilities.map((ability) => (
                    <RowAbility key={ability.name} ability={ability} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-6 m-10">
        {abilityList?.previous && (
          <button
            disabled={loading}
            onClick={() => loadPage(abilityList.previous)}
            className="py-3 px-4 rounded-lg bg-gray-400 font-medium disabled:opacity-50"
          >
            Previous page
          </button>
        )}
        {abilityList?.next && (
          <button
            disabled={loading}
            onClick={() => loadPage(abilityList.next)}
            className="py-3 px-4 rounded-lg bg-gray-400 font-medium disabled:opacity-50"
          >
            Next Page
          </button>
        )}
      </div>
    </>
  );
};
