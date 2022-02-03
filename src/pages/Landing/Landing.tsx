import React, { ChangeEvent, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import './Landing.css';

import search from '../../assets/search.svg';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import PokeCard, { PokemonProps } from '../../components/PokeCard/PokeCard';
import { POKEMON_TYPES } from '../../utils';
import { getPokemons, PokemonRawDataProps, sanitizeRawData, sliceRawData } from '../../controllers/fetchController';
import { filterByType, searchPokemon, sortFunctions } from '../../controllers/filterController';
import Footer from '../../components/Footer/Footer';

function Landing() {
  const [data, setData] = useState<PokemonRawDataProps[]>([]);
  const [pokemonsRaw, setPokemonsRaw] = useState<PokemonProps[]>();
  const [pokemons, setPokemons] = useState<PokemonProps[]>();
  const [currentPage, setCurrentPage] = useState(0);

  const [sortLiked, setSortLiked] = useState<boolean>(false);
  const [sortInput, setSortInput] = useState<string>('number_asc');
  const [searchInput, setSearchInput] = useState<string>('');
  const [filters, setFilters] = useState<string[]>([]);
  const national_numbers: string[] = [];

  useEffect(() => {
    /*
    * This is the Fetch effect. It raises only one time per loading and
    * stores the raw data, so we can manipulate the API data without make a new request. 
    */
    getPokemons()
      .then(response => {
        setData(response.results); // store the response in data state

        // event listener for infinite scroll feature
        document.getElementsByClassName('content-pokedex')[0]
          .addEventListener('scroll', handleScroll);

        setCurrentPage(1);
        setCurrentPage(2);
      })
      // error handling
      .catch(error => {
        console.log(error.message);
      });
  }, []);


  useEffect(() => {
    // Effect to manipulate the raw data (sort all and search all)
    let pokemons = sanitizeRawData(data, national_numbers)
      .sort((a: any, b: any) => sortFunctions(a, b, sortInput) || 0)
      .filter((pokemon: any) => searchPokemon(pokemon, searchInput))

    if (sortLiked) {
      // to filter just the liked pokemons
      pokemons = pokemons.filter((pokemon) => { return pokemon.liked })
    }

    setPokemonsRaw(pokemons)

    setCurrentPage(1); // call the render use effect
  }, [data, filters, sortInput, searchInput, sortLiked]);


  useEffect(() => {
    // Render effect for infinite list (no filters applied)
    if (filters?.length === 0) {
      // Each page has fifty pokemons
      const slicedRawData = sliceRawData(pokemonsRaw || [], 50, currentPage);

      // Clean all data before render
      let pokemons =
        slicedRawData
          .filter(pokemon => searchPokemon(pokemon, searchInput))
          .sort((a: any, b: any) => sortFunctions(a, b, sortInput) || 0)

      setPokemons(pokemons);
    }
  }, [currentPage, searchInput]);


  useEffect(() => {
    // Render effect for type filters
    if (filters.length > 0) {

      // Clean all data before render
      let pokemons =
        pokemonsRaw
          ?.filter(pokemon => filterByType(pokemon, filters || []))
          .filter(pokemon => searchPokemon(pokemon, searchInput))
          .sort((a: any, b: any) => sortFunctions(a, b, sortInput) || 0)

      setPokemons(pokemons);
    }
  }, [filters, sortInput, searchInput])


  const handleScroll = () => {
    // Function to manage the infinite scroll in pokemons list
    const infiniteScrollElement = document.getElementsByClassName('content-pokedex')[0];

    // When user scrolled 75% of the list, render more elements
    if (
      infiniteScrollElement.scrollTop >= infiniteScrollElement.scrollHeight * 0.75
      && filters?.length === 0) {
      // Increment the fake pagination to get more pokemons
      setCurrentPage(currentPage => currentPage + 1);
    }
  }


  const handleSetFilter = (type: string, buttonIndex: number) => {
    const buttonElement = document.getElementsByClassName('filter-types-button')[buttonIndex];

    // if type already is in filters
    if (filters?.includes(type)) {
      buttonElement.classList.remove('button-selected');
      filters.splice(filters?.indexOf(type), 1); // remove from filters
      setFilters([...filters]);

      if (filters.length === 0) {
        // if filters are cleared, render the infinite scroll list
        setCurrentPage(0);
      }
      return;
    }

    buttonElement.classList.add('button-selected');
    // add type to filters
    setFilters([...filters || [], type])
  }


  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortInput(e.target.value);
    setCurrentPage(0);
  }


  const handleSearch = (text: string) => {
    setSearchInput(text);
    setCurrentPage(0);
  }


  const handleSortLiked = () => {
    setSortLiked(!sortLiked);
    setCurrentPage(0);
  }

  return (
    <>
      <Header />
      <div className="landing-container">

        <div className="landing-search-container">
          <div className="landing-search-input">
            <input
              type="search"
              id="poke-search"
              name="search"
              placeholder='Pesquisar por nome ou número'
              autoComplete='off'
              onChange={e => (handleSearch(e.target.value.toLowerCase()))}
            >
            </input>
            <img src={search} alt="" />
          </div>

          <div className="landing-search-order">
            <label htmlFor="order_by">Ordenar por</label>
            <select
              name="order_by"
              id="poke_order"
              onChange={e => handleSort(e)}
            >
              <option value='number_asc'>Menor número primeiro</option>
              <option value='number_desc'>Maior número primeiro</option>
              <option value='name_asc'>A - Z</option>
              <option value='name_desc'>Z - A</option>
            </select>
          </div>
        </div>

        <div className="landing-content">
          <div className="content-filters">
            <div className="filter-container">
              <span>Filtrar por tipo</span>
              <div className="filter-types">
                {POKEMON_TYPES.map((type, index) => {
                  return (
                    <button
                      className="filter-types-button"
                      onClick={() => { handleSetFilter(type, index) }}
                      key={index}
                    >
                      {type}
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="filter-container">
              <span>Filtrar Favoritos</span>
              <span className="switch">
                <ToggleSwitch onClick={handleSortLiked} />
              </span>
            </div>
          </div>
          <div className="content-pokedex">
            {pokemons?.map((pokemon: PokemonProps, index: number) => {
              return (
                <PokeCard
                  key={index}
                  national_number={pokemon.national_number}
                  spriteURL={pokemon.spriteURL}
                  name={pokemon.name}
                  types={pokemon.types}
                  liked={pokemon.liked}
                />
              )
            })}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Landing;