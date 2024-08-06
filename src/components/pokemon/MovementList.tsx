import type { Pokemon } from "../../types/Pokemon";
import type { Move } from "../../types/Move";
import { getMove } from "../../services/PokemonSerice";
import { CapitalizeWord } from "../../lib/utils";
import { RowMove } from "../move/RowMove";

export const MovementList = ({ pokemon }: { pokemon: Pokemon }) => {

  console.log(pokemon.moves)

  return (
    <>
      <div className="flex justify-center font-semibold text-2xl">
        Movement List
      </div>
      <div className="flex flex-col m-10 border-2 border-gray-800 rounded-lg">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Power
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Accuracy
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  {pokemon.moves.map((move) => (
                      <RowMove key={move.move.name} name={move.move.name} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
