import { isConstructorDeclaration } from "typescript";
import { CapitalizeWord } from "../../lib/utils";
import { useEffect, useState } from "react";
import type { Item } from "../../types/Item";

export const CardItem = ({ name }: { name: string }) => {
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    const getItem = async () => {
      let res = await fetch(`https://pokeapi.co/api/v2/item/${name}`);
      let data = await res.json();

      setItem(data);
    };
    getItem();
  }, []);

  return (
    <>
      <a
        href={"/item/" + name}
        className={` bg-white h-auto max-w-full rounded-lg text-center shadow-lg m-4 p-4 transition hover:scale-110 cursor-pointer`}
      >
        <div className="flex justify-center">
          <img
            className="w-32"
            src={item?.sprites.default}
          />
        </div>
        <h2>
           {CapitalizeWord(name)}
        </h2>
      </a>
    </>
  );
};
