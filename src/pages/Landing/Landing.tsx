import React, { ChangeEvent, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import './Landing.css';

import search from '../../assets/search.svg';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import PokeCard, { PokemonProps } from '../../components/PokeCard/PokeCard';
import { POKEMON_TYPES } from '../../utils';
import { getPokemons, PokemonRawDataProps, sanitizeRawData, sliceRawData } from '../../controllers/fetchController';
import { filterByType, sortFunctions } from '../../controllers/filterController';

function Landing() {
  const [pokemonsRaw, setPokemonsRaw] = useState<PokemonRawDataProps[]>();
  const [pokemons, setPokemons] = useState<PokemonProps[]>();
  const [currentPage, setCurrentPage] = useState(0);

  const [sortInput, setSortInput] = useState<string>('number_asc');
  const [filters, setFilters] = useState<string[]>([]);
  const national_numbers: string[] = [];

  useEffect(() => {
    getPokemons()
      .then(response => {
        console.log('a')
        setPokemonsRaw(response.results.sort((a: any, b: any) => sortFunctions(a, b, sortInput)));
        setCurrentPage(1);

        document.getElementsByClassName('content-pokedex')[0]
          .addEventListener('scroll', handleScroll);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, [filters, sortInput]);

  useEffect(() => {
    if (filters?.length === 0) {
      const slicedRawData = sliceRawData(pokemonsRaw || [], 50, currentPage);
      setPokemons(
        sanitizeRawData(slicedRawData, national_numbers)
          .sort((a: any, b: any) => sortFunctions(a, b, sortInput) || 0)
      );
    }
  }, [currentPage]);

  useEffect(() => {
    setPokemons(
      sanitizeRawData(pokemonsRaw || [], national_numbers)
        .filter(pokemon => filterByType(pokemon, filters || []))
        .sort((a: any, b: any) => sortFunctions(a, b, sortInput) || 0)
    );
  }, [filters, sortInput])

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
              <span className="switch"><ToggleSwitch /></span>
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
                />
              )
            })}
          </div>
        </div>

      </div>
    </>
  );
}

export default Landing;