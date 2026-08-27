import { CapitalizeWord } from "../../lib/utils";
import type { Ability } from "../../types/Ability";

export const RowAbility = ({ ability }: { ability: Ability }) => {
  return (
    <tr className="hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
        <a href={`/ability/${ability.name}`}>{CapitalizeWord(ability.name)}</a>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
        {
          ability.flavor_text_entries.filter(
            (entry) => entry.language.name === "en"
          )[0]?.flavor_text
        }
      </td>
    </tr>
  );
};
