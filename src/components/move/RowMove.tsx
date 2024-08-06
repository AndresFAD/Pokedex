import { useEffect, useState } from "react";
import { CapitalizeWord } from "../../lib/utils";
import { getMovebyName } from "../../services/PokemonSerice";
import type { Move } from "../../types/Move";

export const RowMove = ({ name }: { name: string }) => {
  const [move, setMove] = useState<Move>();

  useEffect(() => {
    const getMove = async () => {
      let res = await fetch(`https://pokeapi.co/api/v2/move/${name}`);
      let data = await res.json();

      setMove(data);
    };
    getMove();
  }, []);

  const moveTypeColors = {
    normal: "bg-[#A8A878]",
    fire: "bg-[#F08030]",
    water: "bg-[#6890F0]",
    electric: "bg-[#F8D030]",
    grass: "bg-[#78C850]",
    ice: "bg-[#98D8D8]",
    fighting: "bg-[#C03028] text-white",
    poison: "bg-[#A040A0] text-white",
    ground: "bg-[#E0C068]",
    flying: "bg-[#A890F0]",
    psychic: "bg-[#F85888]",
    bug: "bg-[#A8B820]",
    rock: "bg-[#B8A038]",
    ghost: "bg-[#705898] text-white",
    dragon: "bg-[#7038F8] text-white",
    dark: "bg-[#705848] text-white",
    steel: "bg-[#B8B8D0]",
    fairy: "bg-[#EE99AC]",
  };

  const getMoveTypeColor = (type) => moveTypeColors[type] || "";

  return (
    <>
      <tr className="hover:bg-gray-100">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
          <a href={`/moves/${name}`}>{CapitalizeWord(name)}</a>
        </td>
        {
          <>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              <span
                className={`py-1 px-5 rounded mx-3 shadow-lg ${getMoveTypeColor(
                  move?.type.name
                )}`}
              >
                {CapitalizeWord(move?.type.name)}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              {move?.power !== null ? move?.power : "N/A"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              {move?.accuracy !== null ? move?.accuracy : "N/A"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap flex justify-end text-sm font-medium">
              <img
                src={
                  move?.damage_class.name === "physical"
                    ? "https://images.wikidexcdn.net/mwuploads/wikidex/3/31/latest/20140504181227/Clase_f%C3%ADsico.gif"
                    : move?.damage_class.name === "special"
                    ? "https://images.wikidexcdn.net/mwuploads/wikidex/6/61/latest/20140504180925/Clase_especial.gif"
                    : "https://images.wikidexcdn.net/mwuploads/wikidex/0/06/latest/20141020094029/Clase_estado.gif"
                }
              />
            </td>
          </>
        }
      </tr>
    </>
  );
};
