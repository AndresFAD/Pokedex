import { useState } from "react";
import { CardItem } from "./CardItem";
import { getItembyName } from "../../services/PokemonSerice";
import { Pagination } from "../shared/Pagination";
import type { Pokedex } from "../../types/Pokedex";
import type { Item } from "../../types/Item";

interface Props {
  baseUrl: string;
  initialItemList: Pokedex;
  initialItems: Item[];
}

const PAGE_SIZE = 20;

export const ListItems = ({ baseUrl, initialItemList, initialItems }: Props) => {
  const [itemList, setItemList] = useState<Pokedex>(initialItemList);
  const [items, setItems] = useState<Item[]>(initialItems);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const goToPage = async (page: number) => {
    setLoading(true);
    try {
      const offset = (page - 1) * PAGE_SIZE;
      const res = await fetch(`${baseUrl}?offset=${offset}&limit=${PAGE_SIZE}`);
      const data: Pokedex = await res.json();
      const details = await Promise.all(
        data.results.map((item) => getItembyName(item.name))
      );

      setItemList(data);
      setItems(details);
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(itemList.count / PAGE_SIZE);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {items.map((item) => (
          <CardItem key={item.name} item={item} />
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
