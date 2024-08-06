import { useEffect, useState } from "react";
import { getPokemons } from "../../services/PokemonSerice";
import { CardPokemon } from "./CardPokemon";
import type { Pokedex } from "../../types/Pokedex";

export const ListPokedex = () => {
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
  );
  const [pokedex, setPokedex] = useState<Pokedex>();

  useEffect(() => {
    const getPokedex = async () => {
      let res = await fetch(url);
      let data = await res.json();

      setPokedex(data);
    };
    getPokedex();
  }, []);

  const previous = async () => {
    let res = await fetch(pokedex?.previous);
    let data = await res.json();

    setPokedex(data);
  };

  const next = async () => {
    let res = await fetch(pokedex?.next);
    let data = await res.json();

    setPokedex(data);
  };

  return (
    <div className="m-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokedex?.results.map((pokemon) => (
          <CardPokemon key={pokemon?.name} name={pokemon?.name} />
        ))}
      </div>
      <div className="flex justify-center gap-6 m-10">
        {pokedex?.previous && (
          <button
            onClick={() => previous()}
            className="py-3 px-4 rounded-lg bg-gray-400 font-medium"
          >
            Previous page
          </button>
        )}
        {pokedex?.next && (
          <button
            onClick={() => next()}
            className="py-3 px-4 rounded-lg bg-gray-400 font-medium"
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};
