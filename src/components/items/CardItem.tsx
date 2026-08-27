import { CapitalizeWord } from "../../lib/utils";
import type { Item } from "../../types/Item";

export const CardItem = ({ item }: { item: Item }) => {
  return (
    <a
      href={"/item/" + item.name}
      className="type-hover-card group relative flex flex-col items-center rounded-2xl bg-white shadow-sm hover:shadow-xl p-4 transition-shadow cursor-pointer"
      style={
        {
          background: "linear-gradient(135deg, #3b82f61a, #f59e0b1a)",
          "--type-color-a": "#3b82f6",
          "--type-color-b": "#f59e0b",
        } as React.CSSProperties
      }
    >
      <div className="flex justify-center">
        <img
          className="w-20 h-20 object-contain drop-shadow-md transition-transform group-hover:scale-110"
          src={item.sprites.default}
        />
      </div>
      <h2 className="mt-1 font-semibold text-gray-900 text-center">
        {CapitalizeWord(item.name)}
      </h2>
      <span className="mt-2 text-[10px] uppercase font-bold tracking-wide text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
        {item.category.name.replace(/-/g, " ")}
      </span>
    </a>
  );
};
