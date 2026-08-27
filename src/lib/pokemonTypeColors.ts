export const TYPE_COLORS: Record<string, string> = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F0C838",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

const DARK_BACKGROUND_TYPES = new Set([
  "fighting",
  "poison",
  "ghost",
  "dragon",
  "dark",
]);

export const getTypeColor = (type?: string) =>
  (type && TYPE_COLORS[type]) || "#a3a3a3";

export const getTypeTextClass = (type?: string) =>
  type && DARK_BACKGROUND_TYPES.has(type) ? "text-white" : "text-gray-900";
