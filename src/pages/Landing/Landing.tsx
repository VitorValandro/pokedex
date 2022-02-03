import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import './Landing.css';

import search from '../../assets/search.svg';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import PokeCard, { PokemonProps } from '../../components/PokeCard/PokeCard';
import { POKEMON_TYPES } from '../../utils';
import { getPokemons, PokemonRawDataProps, sanitizeRawData, sliceRawData } from '../../controllers/fetchController';

function Landing() {
  const [pokemonsRaw, setPokemonsRaw] = useState<PokemonRawDataProps[]>();
  const [pokemons, setPokemons] = useState<PokemonProps[]>();
  const [currentPage, setCurrentPage] = useState(0);
  const national_numbers: string[] = [];

  useEffect(() => {
    getPokemons()
      .then(response => {
        setPokemonsRaw(response.results);
        setCurrentPage(1);
        //setPokemons(sanitizeRawData(sliceRawData(response.results, 50, currentPage), national_numbers));

        document.getElementsByClassName('content-pokedex')[0]
          .addEventListener('scroll', handleScroll);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    const slicedRawData = sliceRawData(pokemonsRaw || [], 50, currentPage)
    setPokemons(sanitizeRawData(slicedRawData, national_numbers));
  }, [currentPage]);

  const handleScroll = () => {
    const infiniteScrollElement = document.getElementsByClassName('content-pokedex')[0];
    if (infiniteScrollElement.scrollTop >= infiniteScrollElement.scrollHeight * 0.75) {
      setCurrentPage(currentPage => currentPage + 1);
    }

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
            <select name="order_by" id="poke_order">
              <option defaultValue={1}>Menor número primeiro</option>
              <option>Ordem alfabética</option>
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
                    <button className="filter-types-button" key={index}>{type}</button>
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
