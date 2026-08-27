import { CapitalizeWord } from "../../lib/utils";
import { getTypeColor, getTypeTextClass } from "../../lib/pokemonTypeColors";
import type { Pokemon } from "../../types/Pokemon";

export const CardPokemon = ({ pokemon }: { pokemon: Pokemon }) => {
  const typeA = pokemon.types[0]?.type.name;
  const typeB = pokemon.types[1]?.type.name ?? typeA;
  const colorA = getTypeColor(typeA);
  const colorB = getTypeColor(typeB);
  const paddedId = String(pokemon.id).padStart(4, "0");

  return (
    <a
      href={"/pokemon/" + pokemon.name}
      className="type-hover-card group relative flex flex-col items-center rounded-2xl bg-white shadow-sm hover:shadow-xl p-4 transition-shadow cursor-pointer"
      style={
        {
          background: `linear-gradient(135deg, ${colorA}1a, ${colorB}1a)`,
          "--type-color-a": colorA,
          "--type-color-b": colorB,
        } as React.CSSProperties
      }
    >
      <span className="absolute top-3 right-4 font-mono text-xs text-gray-400">
        #{paddedId}
      </span>
      <div className="flex justify-center">
        <img
          className="w-28 h-28 object-contain drop-shadow-md transition-transform group-hover:scale-110"
          src={pokemon.sprites.other?.["official-artwork"].front_default ?? undefined}
        />
      </div>
      <h2 className="mt-1 font-semibold text-gray-900">
        {CapitalizeWord(pokemon.name)}
      </h2>
      <div className="flex gap-1.5 mt-2">
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            className={`text-[10px] uppercase font-bold tracking-wide px-2.5 py-0.5 rounded-full ${getTypeTextClass(
              type.type.name
            )}`}
            style={{ backgroundColor: getTypeColor(type.type.name) }}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </a>
  );
};
