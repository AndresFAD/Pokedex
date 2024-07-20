import type { Chain } from "../types/Chain";
import type { Pokedex } from "../types/Pokedex";
import type { Pokemon } from "../types/Pokemon";
import type { Move } from "../types/Move";
import type { Specie } from '../types/Specie';

const url = "https://pokeapi.co/api/v2/";

export const getPokemons = async () => {
    const res = await fetch(`${url}pokemon`);

    const pokedex: Pokedex = await res.json();
    return pokedex
} 

export const getMoves = async () => {
  const res = await fetch(`${url}move`);

  const pokedex: Pokedex = await res.json();
  return pokedex;
}; 

export const getPokemonbyName = async (name: string) => {
    const res = await fetch(`${url}/pokemon/${name}`);

    const pokemon: Pokemon = await res.json()
    return pokemon
}

export const getPokemonbyId = async (id: number) => {
  const res = await fetch(`${url}/pokemon/${id}`);

  const pokemon: Pokemon = await res.json();
  return pokemon;
};

export const getMovebyName = async (name: string) => {
  const res = await fetch(`${url}/move/${name}`);

  const move: Move = await res.json();
  return move;
};

export const getSpecie = async (url: string) => {
  const res = await fetch(url);

  const specie: Specie = await res.json();
  return specie;
};

export const getChain = async (url: string) => {
  const res = await fetch(url);

  const chain: Chain = await res.json();
  return chain;
};

export const getMove = async (url: string) => {
  const res = await fetch(url);

  const move: Move = await res.json();
  return move;
};

