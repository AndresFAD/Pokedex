import { useEffect, useState } from "react";
import { CapitalizeWord } from "../../lib/utils";
import { getMovebyName } from "../../services/PokemonSerice";
import type { Move } from "../../types/Move";
import type { Ability } from "../../types/Ability";

export const RowAbility = ({ name }: { name: string }) => {
  const [abilitiy, setAbility] = useState<Ability>();

  useEffect(() => {
    const getAbility = async () => {
      let res = await fetch(`https://pokeapi.co/api/v2/ability/${name}`);
      let data = await res.json();

      setAbility(data);
    };
    getAbility();
  }, []);

  return (
    <>
      <tr className="hover:bg-gray-100">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
          <a href={`/ability/${name}`}>{CapitalizeWord(name)}</a>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
          {abilitiy?.flavor_text_entries.filter(ar => ar.language.name === "en")[0].flavor_text}
        </td>
      </tr>
    </>
  );
};
