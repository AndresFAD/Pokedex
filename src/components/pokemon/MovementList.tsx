import type { Move } from "../../types/Move";
import { MoveCard } from "../move/MoveCard";

export const MovementList = ({ moves }: { moves: Move[] }) => {
  return (
    <div className="rounded-2xl bg-white shadow-sm p-6 mt-8">
      <h2 className="font-semibold text-xl text-gray-900 mb-4">Movimientos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {moves.map((move) => (
          <MoveCard key={move.name} move={move} />
        ))}
      </div>
    </div>
  );
};
