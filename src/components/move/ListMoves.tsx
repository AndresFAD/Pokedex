import { useState } from "react";
import type { Pokedex } from "../../types/Pokedex";
import type { Move } from "../../types/Move";
import { getMovebyName } from "../../services/PokemonSerice";
import { MoveCard } from "./MoveCard";

interface Props {
  initialMoveList: Pokedex;
  initialMoves: Move[];
}

export const ListMoves = ({ initialMoveList, initialMoves }: Props) => {
  const [moveList, setMoveList] = useState<Pokedex>(initialMoveList);
  const [moves, setMoves] = useState<Move[]>(initialMoves);
  const [loading, setLoading] = useState(false);

  const loadPage = async (pageUrl?: string) => {
    if (!pageUrl) return;
    setLoading(true);
    try {
      const res = await fetch(pageUrl);
      const data: Pokedex = await res.json();
      const details = await Promise.all(
        data.results.map((move) => getMovebyName(move.name))
      );

      setMoveList(data);
      setMoves(details);
    } finally {
      setLoading(false);
    }
  };

  const pageButtonClass =
    "py-2.5 px-6 rounded-full bg-white border border-gray-200 shadow-sm font-medium text-gray-700 hover:border-red-300 hover:text-red-600 hover:shadow-md transition disabled:opacity-40 disabled:pointer-events-none";

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {moves.map((move) => (
          <MoveCard key={move.name} move={move} />
        ))}
      </div>
      <div className="flex justify-center gap-4 my-10">
        {moveList?.previous && (
          <button
            disabled={loading}
            onClick={() => loadPage(moveList.previous)}
            className={pageButtonClass}
          >
            ← Previous page
          </button>
        )}
        {moveList?.next && (
          <button
            disabled={loading}
            onClick={() => loadPage(moveList.next)}
            className={pageButtonClass}
          >
            Next Page →
          </button>
        )}
      </div>
    </div>
  );
};
