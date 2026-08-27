import { useState } from "react";
import type { Pokedex } from "../../types/Pokedex";
import type { Ability } from "../../types/Ability";
import { getAbilitybyName } from "../../services/PokemonSerice";
import { AbilityCard } from "./AbilityCard";
import { Pagination } from "../shared/Pagination";

interface Props {
  baseUrl: string;
  initialAbilityList: Pokedex;
  initialAbilities: Ability[];
}

const PAGE_SIZE = 20;

export const ListAbilities = ({
  baseUrl,
  initialAbilityList,
  initialAbilities,
}: Props) => {
  const [abilityList, setAbilityList] = useState<Pokedex>(initialAbilityList);
  const [abilities, setAbilities] = useState<Ability[]>(initialAbilities);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const goToPage = async (page: number) => {
    setLoading(true);
    try {
      const offset = (page - 1) * PAGE_SIZE;
      const res = await fetch(`${baseUrl}?offset=${offset}&limit=${PAGE_SIZE}`);
      const data: Pokedex = await res.json();
      const details = await Promise.all(
        data.results.map((ability) => getAbilitybyName(ability.name))
      );

      setAbilityList(data);
      setAbilities(details);
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(abilityList.count / PAGE_SIZE);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {abilities.map((ability) => (
          <AbilityCard key={ability.name} ability={ability} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        disabled={loading}
      />
    </div>
  );
};
