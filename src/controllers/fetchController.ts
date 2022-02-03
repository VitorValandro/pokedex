// Type of raw data from API
export type PokemonRawDataProps = {
  name: string;
  type: string[];
  national_number: string;
  evolution: {
    name: string | null;
  },
  sprites: {
    normal: string;
    large: string;
    animated: string;
  },
  total: number;
  hp: number;
  attack: number;
  defense: number;
  sp_atk: number;
  sp_def: number;
  speed: number;
}

export function* sliceRawData(data: PokemonRawDataProps[], range: number): IterableIterator<PokemonRawDataProps[]> {
  /*
  * This is a generator function to fake a pagination of API data.
  * It receives the raw fetched data and the range of slicing (how many elements per page)
  * and returns an Array with all elements in range.
  * In the next call of the generator (when user scrolls until the end) we add to the current Array of pokemons
  * the objects in next range.
  */

  let index = 0;
  let sliced_data: PokemonRawDataProps[] = [];
  while (true) {
    const data_fragment = data.slice(range * index, range * (index + 1));
    index++;
    yield [...sliced_data, ...data_fragment];
  }
}

export function filterRawData(pokemon: PokemonRawDataProps, index: number, identifier: string[]) {
  /*
  * This is a function to filter the Array data removing the duplicated pokemons.
  * It removes objects with same national_number, like Venusaur [003] that repeats twice in raw data.
  */

  identifier.push(pokemon.national_number);
  return identifier.indexOf(pokemon.national_number) === index;
}

export function cleanRawData(pokemon: PokemonRawDataProps) {
  /* 
    This is a map callback to clean the raw API data to a sanitized data
    that is passed to PokeCard component.
  */

  return {
    national_number: pokemon.national_number,
    spriteURL: pokemon.sprites.large,
    name: pokemon.name,
    types: pokemon.type
  }
}