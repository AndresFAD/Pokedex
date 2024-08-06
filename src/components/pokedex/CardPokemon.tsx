import { isConstructorDeclaration } from "typescript";
import { getPokemonbyName } from "../../services/PokemonSerice";
import { CapitalizeWord } from "../../lib/utils";
import { useEffect, useState } from "react";
import type { Pokemon } from "../../types/Pokemon";

export const  CardPokemon = ({ name }: { name: string }) => {
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    const getPokemon = async () => {
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      let data = await res.json();

      setPokemon(data);
    };
    getPokemon();
  }, []);
  

  const moveTypeColors = {
    normal: "hover:shadow-[#A8A878]",
    fire: "hover:shadow-[#F08030]",
    water: "hover:shadow-[#6890F0]",
    electric: "hover:shadow-[#F8D030]",
    grass: "hover:shadow-[#78C850]",
    ice: "hover:shadow-[#98D8D8]",
    fighting: "hover:shadow-[#C03028]",
    poison: "hover:shadow-[#A040A0]",
    ground: "hover:shadow-[#E0C068]",
    flying: "hover:shadow-[#A890F0]",
    psychic: "hover:shadow-[#F85888]",
    bug: "hover:shadow-[#A8B820]",
    rock: "hover:shadow-[#B8A038]",
    ghost: "hover:shadow-[#705898]",
    dragon: "hover:shadow-[#7038F8]",
    dark: "hover:shadow-[#705848]",
    steel: "hover:shadow-[#B8B8D0]",
    fairy: "hover:shadow-[#EE99AC]",
  };

  const getMoveTypeColor = (type) => moveTypeColors[type] || "";



  return (
    <>
      <a
        href={"/pokemon/" + name}
        className={` bg-white h-auto max-w-full rounded-lg text-center shadow-lg m-4 p-4 transition hover:scale-110 cursor-pointer ${getMoveTypeColor(pokemon?.types[0].type.name)}`}
      >
        <div className="flex justify-center">
          <img className="w-32" src={pokemon?.sprites.other?.["official-artwork"].front_default} />
        </div>
        <h2>
          {pokemon?.id} - {CapitalizeWord(name)}
        </h2>
      </a>
    </>
  );
};
