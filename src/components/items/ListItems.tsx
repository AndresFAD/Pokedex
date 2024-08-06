import { useEffect, useState } from "react";
import { CardItem } from "./CardItem";
import type { Pokedex } from "../../types/Pokedex";

export const ListItems = () => {
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/item?offset=0&limit=20"
  );
  const [items, setItems] = useState<Pokedex>();

  useEffect(() => {
    const getItems = async () => {
      let res = await fetch(url);
      let data = await res.json();

      setItems(data);
    };
    getItems();
  }, []);

  const previous = async () => {
    let res = await fetch(items?.previous);
    let data = await res.json();

    setItems(data);
  };

  const next = async () => {
    let res = await fetch(items?.next);
    let data = await res.json();

    setItems(data);
  };

  return (
    <div className="m-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items?.results.map((item) => (
          <CardItem key={item?.name} name={item?.name} />
        ))}
      </div>
      <div className="flex justify-center gap-6 m-10">
        {items?.previous && (
          <button
            onClick={() => previous()}
            className="py-3 px-4 rounded-lg bg-gray-400 font-medium"
          >
            Previous page
          </button>
        )}
        {items?.next && (
          <button
            onClick={() => next()}
            className="py-3 px-4 rounded-lg bg-gray-400 font-medium"
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};
