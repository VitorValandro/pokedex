import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import './Landing.css';

import search from '../../assets/search.svg';
import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch';
import PokeCard from '../../components/PokeCard/PokeCard';
import { POKEMON_TYPES } from '../../utils';
import { sliceRawData } from '../../controllers/fetchController';

const pokemons = [
  {
    national_number: "001",
    spriteURL: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
    name: "Bulbasaur",
    types: [
      "Grass",
      "Poison"
    ]
  },
];

function Landing() {
  useEffect(() => {
    getPokemons()
      .then(response => {
        console.log(sliceRawData(response.results, 50).next());
      })
      .catch(error => {
        console.log(error.message);
      })
  }, []);

  async function getPokemons() {
    // Async function to fetch the pokemons API and get the raw data
    const response: Response = await fetch('https://unpkg.com/pokemons@1.1.0/pokemons.json');

    // Handle errors
    if (!response.ok) {
      throw new Error(`An error has occured while fetching API: ${response.status}`);
    }

    // Return json
    const pokemons = await response.json();
    return pokemons;
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
            {pokemons.map((pokemon, index) => {
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
