import { PokemonProps } from "../components/PokeCard/PokeCard";

export function filterByType(pokemon: PokemonProps, types: string[]) {
  return pokemon.types.some(type => types.includes(type));
}

export function sortFunctions(a: PokemonProps, b: PokemonProps, key: string) {
  switch (key) {
    case "number_asc":
      return sortByNumber(a, b, false);
    case "number_desc":
      return sortByNumber(a, b, true);
    case "name_asc":
      return sortByName(a, b, false);
    case "name_desc":
      return sortByName(a, b, true);
  }
}

export function searchPokemon(pokemon: PokemonProps, text: string) {
  return (
    pokemon.name.toLowerCase().search(text) !== -1
    || pokemon.national_number.search(text) !== -1
  )
}

function sortByNumber(a: PokemonProps, b: PokemonProps, descending: boolean) {
  if (a.national_number < b.national_number) {
    return descending ? 1 : -1;
  }
  if (a.national_number > b.national_number) {
    return descending ? -1 : 1;
  }
  return 0;
}

function sortByName(a: PokemonProps, b: PokemonProps, descending: boolean) {
  if (a.name > b.name) {
    return descending ? -1 : 1;
  }
  if (a.name < b.name) {
    return descending ? 1 : -1;
  }
  return 0;
}