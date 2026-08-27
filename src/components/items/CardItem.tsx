import { CapitalizeWord } from "../../lib/utils";
import type { Item } from "../../types/Item";

export const CardItem = ({ item }: { item: Item }) => {
  return (
    <a
      href={"/item/" + item.name}
      className="bg-white h-auto max-w-full rounded-lg text-center shadow-lg m-4 p-4 transition hover:scale-110 cursor-pointer"
    >
      <div className="flex justify-center">
        <img className="w-32" src={item.sprites.default} />
      </div>
      <h2>{CapitalizeWord(item.name)}</h2>
    </a>
  );
};
