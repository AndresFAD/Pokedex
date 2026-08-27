import { useState } from "react";
import { getPokemonbyName } from "../../services/PokemonSerice";
import { CardPokemon } from "./CardPokemon";
import type { Pokedex } from "../../types/Pokedex";
import type { Pokemon } from "../../types/Pokemon";

interface Props {
  initialPokedex: Pokedex;
  initialPokemons: Pokemon[];
}

export const ListPokedex = ({ initialPokedex, initialPokemons }: Props) => {
  const [pokedex, setPokedex] = useState<Pokedex>(initialPokedex);
  const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons);
  const [loading, setLoading] = useState(false);

  const loadPage = async (pageUrl?: string) => {
    if (!pageUrl) return;
    setLoading(true);
    try {
      const res = await fetch(pageUrl);
      const data: Pokedex = await res.json();
      const details = await Promise.all(
        data.results.map((pokemon) => getPokemonbyName(pokemon.name))
      );

      setPokedex(data);
      setPokemons(details);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon) => (
          <CardPokemon key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <div className="flex justify-center gap-6 m-10">
        {pokedex?.previous && (
          <button
            disabled={loading}
            onClick={() => loadPage(pokedex.previous)}
            className="py-3 px-4 rounded-lg bg-gray-400 font-medium disabled:opacity-50"
          >
            Previous page
          </button>
        )}
        {pokedex?.next && (
          <button
            disabled={loading}
            onClick={() => loadPage(pokedex.next)}
            className="py-3 px-4 rounded-lg bg-gray-400 font-medium disabled:opacity-50"
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};
