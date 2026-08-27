import { useState } from "react";
import type { Pokedex } from "../../types/Pokedex";
import type { Ability } from "../../types/Ability";
import { getAbilitybyName } from "../../services/PokemonSerice";
import { AbilityCard } from "./AbilityCard";

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

  const pageButtonClass =
    "py-2.5 px-6 rounded-full bg-white border border-gray-200 shadow-sm font-medium text-gray-700 hover:border-red-300 hover:text-red-600 hover:shadow-md transition disabled:opacity-40 disabled:pointer-events-none";

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {abilities.map((ability) => (
          <AbilityCard key={ability.name} ability={ability} />
        ))}
      </div>
      <div className="flex justify-center gap-4 my-10">
        {abilityList?.previous && (
          <button
            disabled={loading}
            onClick={() => loadPage(abilityList.previous)}
            className={pageButtonClass}
          >
            ← Previous page
          </button>
        )}
        {abilityList?.next && (
          <button
            disabled={loading}
            onClick={() => loadPage(abilityList.next)}
            className={pageButtonClass}
          >
            Next Page →
          </button>
        )}
      </div>
    </div>
  );
};
