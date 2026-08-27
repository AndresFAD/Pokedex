import { CapitalizeWord } from "../../lib/utils";
import type { Ability } from "../../types/Ability";

export const AbilityCard = ({ ability }: { ability: Ability }) => {
  const description = ability.flavor_text_entries.filter(
    (entry) => entry.language.name === "en"
  )[0]?.flavor_text;

  return (
    <a
      href={`/ability/${ability.name}`}
      className="flex flex-col rounded-2xl bg-white shadow-sm hover:shadow-xl border-2 border-transparent hover:border-red-200 p-5 transition-all hover:-translate-y-1 cursor-pointer"
    >
      <h2 className="font-semibold text-lg text-gray-900">
        {CapitalizeWord(ability.name)}
      </h2>
      <p className="mt-2 text-sm text-gray-600 line-clamp-3">
        {description ?? "Sin descripción disponible."}
      </p>
    </a>
  );
};
