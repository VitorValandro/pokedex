import { PokemonProps } from "../components/PokeCard/PokeCard";

export function filterByType(pokemon: PokemonProps, types: string[]) {
  return pokemon.types.some(type => types.includes(type));
}