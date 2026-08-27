import { useEffect, useState } from "react";
import { getPokemonbyName } from "../../services/PokemonSerice";
import { CardPokemon } from "./CardPokemon";
import type { Pokedex, Result } from "../../types/Pokedex";
import type { Pokemon } from "../../types/Pokemon";

interface Props {
  initialPokedex: Pokedex;
  initialPokemons: Pokemon[];
  allPokemonNames: Result[];
}

const SEARCH_RESULTS_LIMIT = 24;
const SEARCH_DEBOUNCE_MS = 300;

export const ListPokedex = ({
  initialPokedex,
  initialPokemons,
  allPokemonNames,
}: Props) => {
  const [pokedex, setPokedex] = useState<Pokedex>(initialPokedex);
  const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => setDebouncedQuery(query.trim().toLowerCase()),
      SEARCH_DEBOUNCE_MS
    );
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setSearchResults([]);
      setSearching(false);
      return;
    }

    let cancelled = false;
    const matches = allPokemonNames
      .filter((pokemon) => pokemon.name.includes(debouncedQuery))
      .slice(0, SEARCH_RESULTS_LIMIT);

    setSearching(true);
    Promise.all(matches.map((pokemon) => getPokemonbyName(pokemon.name))).then(
      (details) => {
        if (!cancelled) {
          setSearchResults(details);
          setSearching(false);
        }
      }
    );

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, allPokemonNames]);

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

  const isSearching = debouncedQuery.length > 0;
  const visiblePokemons = isSearching ? searchResults : pokemons;

  return (
    <div className="m-4">
      <div className="flex justify-center mb-6">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar Pokémon por nombre..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {isSearching && searching && (
        <p className="text-center text-gray-500 mb-4">Buscando...</p>
      )}
      {isSearching && !searching && visiblePokemons.length === 0 && (
        <p className="text-center text-gray-500 mb-4">
          No se encontraron Pokémon para "{query}"
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visiblePokemons.map((pokemon) => (
          <CardPokemon key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>

      {!isSearching && (
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
      )}
    </div>
  );
};
