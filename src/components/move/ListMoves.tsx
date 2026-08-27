import { useState } from "react";
import type { Pokedex } from "../../types/Pokedex";
import type { Move } from "../../types/Move";
import { getMovebyName } from "../../services/PokemonSerice";
import { MoveCard } from "./MoveCard";
import { Pagination } from "../shared/Pagination";

interface Props {
  baseUrl: string;
  initialMoveList: Pokedex;
  initialMoves: Move[];
}

const PAGE_SIZE = 20;

export const ListMoves = ({ baseUrl, initialMoveList, initialMoves }: Props) => {
  const [moveList, setMoveList] = useState<Pokedex>(initialMoveList);
  const [moves, setMoves] = useState<Move[]>(initialMoves);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const goToPage = async (page: number) => {
    setLoading(true);
    try {
      const offset = (page - 1) * PAGE_SIZE;
      const res = await fetch(`${baseUrl}?offset=${offset}&limit=${PAGE_SIZE}`);
      const data: Pokedex = await res.json();
      const details = await Promise.all(
        data.results.map((move) => getMovebyName(move.name))
      );

      setMoveList(data);
      setMoves(details);
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(moveList.count / PAGE_SIZE);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {moves.map((move) => (
          <MoveCard key={move.name} move={move} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        disabled={loading}
      />
    </div>
  );
};
