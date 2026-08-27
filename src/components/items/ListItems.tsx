import { useState } from "react";
import { CardItem } from "./CardItem";
import { getItembyName } from "../../services/PokemonSerice";
import type { Pokedex } from "../../types/Pokedex";
import type { Item } from "../../types/Item";

interface Props {
  initialItemList: Pokedex;
  initialItems: Item[];
}

export const ListItems = ({ initialItemList, initialItems }: Props) => {
  const [itemList, setItemList] = useState<Pokedex>(initialItemList);
  const [items, setItems] = useState<Item[]>(initialItems);
  const [loading, setLoading] = useState(false);

  const loadPage = async (pageUrl?: string) => {
    if (!pageUrl) return;
    setLoading(true);
    try {
      const res = await fetch(pageUrl);
      const data: Pokedex = await res.json();
      const details = await Promise.all(
        data.results.map((item) => getItembyName(item.name))
      );

      setItemList(data);
      setItems(details);
    } finally {
      setLoading(false);
    }
  };

  const pageButtonClass =
    "py-2.5 px-6 rounded-full bg-white border border-gray-200 shadow-sm font-medium text-gray-700 hover:border-red-300 hover:text-red-600 hover:shadow-md transition disabled:opacity-40 disabled:pointer-events-none";

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {items.map((item) => (
          <CardItem key={item.name} item={item} />
        ))}
      </div>
      <div className="flex justify-center gap-4 my-10">
        {itemList?.previous && (
          <button
            disabled={loading}
            onClick={() => loadPage(itemList.previous)}
            className={pageButtonClass}
          >
            ← Previous page
          </button>
        )}
        {itemList?.next && (
          <button
            disabled={loading}
            onClick={() => loadPage(itemList.next)}
            className={pageButtonClass}
          >
            Next Page →
          </button>
        )}
      </div>
    </div>
  );
};
