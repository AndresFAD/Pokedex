import { useEffect, useState } from "react";
import { getPokemonbyName } from "../../services/PokemonSerice";
import { CardPokemon } from "./CardPokemon";
import { Pagination } from "../shared/Pagination";
import type { Pokedex, Result } from "../../types/Pokedex";
import type { Pokemon } from "../../types/Pokemon";

interface Props {
  baseUrl: string;
  initialPokedex: Pokedex;
  initialPokemons: Pokemon[];
  allPokemonNames: Result[];
}

const PAGE_SIZE = 20;
const SEARCH_RESULTS_LIMIT = 24;
const SEARCH_DEBOUNCE_MS = 300;

export const ListPokedex = ({
  baseUrl,
  initialPokedex,
  initialPokemons,
  allPokemonNames,
}: Props) => {
  const [pokedex, setPokedex] = useState<Pokedex>(initialPokedex);
  const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons);
  const [currentPage, setCurrentPage] = useState(1);
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

  const goToPage = async (page: number) => {
    setLoading(true);
    try {
      const offset = (page - 1) * PAGE_SIZE;
      const res = await fetch(`${baseUrl}?offset=${offset}&limit=${PAGE_SIZE}`);
      const data: Pokedex = await res.json();
      const details = await Promise.all(
        data.results.map((pokemon) => getPokemonbyName(pokemon.name))
      );

      setPokedex(data);
      setPokemons(details);
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  const isSearching = debouncedQuery.length > 0;
  const visiblePokemons = isSearching ? searchResults : pokemons;
  const totalPages = Math.ceil(pokedex.count / PAGE_SIZE);

  return (
    <div>
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar Pokémon por nombre..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition"
          />
        </div>
      </div>

      {isSearching && searching && (
        <p className="text-center text-gray-500 mb-4">Buscando...</p>
      )}
      {isSearching && !searching && visiblePokemons.length === 0 && (
        <p className="text-center text-gray-500 mb-4">
          No se encontraron Pokémon para "{query}"
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {visiblePokemons.map((pokemon) => (
          <CardPokemon key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>

      {!isSearching && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          disabled={loading}
        />
      )}
    </div>
  );
};
