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

  return (
    <div className="m-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <CardItem key={item.name} item={item} />
        ))}
      </div>
      <div className="flex justify-center gap-6 m-10">
        {itemList?.previous && (
          <button
            disabled={loading}
            onClick={() => loadPage(itemList.previous)}
            className="py-3 px-4 rounded-lg bg-gray-400 font-medium disabled:opacity-50"
          >
            Previous page
          </button>
        )}
        {itemList?.next && (
          <button
            disabled={loading}
            onClick={() => loadPage(itemList.next)}
            className="py-3 px-4 rounded-lg bg-gray-400 font-medium disabled:opacity-50"
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};
