import { CapitalizeWord } from "../../lib/utils";
import { getTypeColor, getTypeTextClass } from "../../lib/pokemonTypeColors";
import type { Move } from "../../types/Move";

const DAMAGE_CLASS_ICON: Record<string, string> = {
  physical:
    "https://images.wikidexcdn.net/mwuploads/wikidex/3/31/latest/20140504181227/Clase_f%C3%ADsico.gif",
  special:
    "https://images.wikidexcdn.net/mwuploads/wikidex/6/61/latest/20140504180925/Clase_especial.gif",
  status:
    "https://images.wikidexcdn.net/mwuploads/wikidex/0/06/latest/20141020094029/Clase_estado.gif",
};

export const MoveCard = ({ move }: { move: Move }) => {
  const color = getTypeColor(move.type.name);

  return (
    <a
      href={`/moves/${move.name}`}
      className="type-hover-card flex flex-col rounded-2xl bg-white shadow-sm hover:shadow-xl p-5 transition-shadow cursor-pointer"
      style={
        {
          background: `linear-gradient(135deg, ${color}1a, transparent 60%)`,
          "--type-color-a": color,
          "--type-color-b": color,
        } as React.CSSProperties
      }
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-semibold text-lg text-gray-900">
          {CapitalizeWord(move.name)}
        </h2>
        <img
          className="w-6 h-6 shrink-0"
          src={DAMAGE_CLASS_ICON[move.damage_class.name]}
          title={move.damage_class.name}
        />
      </div>
      <span
        className={`self-start mt-2 text-[10px] uppercase font-bold tracking-wide px-2.5 py-0.5 rounded-full ${getTypeTextClass(
          move.type.name
        )}`}
        style={{ backgroundColor: color }}
      >
        {move.type.name}
      </span>
      <div className="flex gap-6 mt-4 text-sm text-gray-600">
        <div>
          <div className="text-xs text-gray-400 uppercase">Power</div>
          <div className="font-semibold">{move.power ?? "—"}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400 uppercase">Accuracy</div>
          <div className="font-semibold">{move.accuracy ?? "—"}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400 uppercase">PP</div>
          <div className="font-semibold">{move.pp}</div>
        </div>
      </div>
    </a>
  );
};
