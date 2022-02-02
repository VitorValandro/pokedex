import React from 'react';
import Header from './components/Header/Header';
import './Landing.css';

import search from './assets/search.svg';
import ToggleSwitch from './components/ToggleSwitch/ToggleSwitch';

const POKEMON_TYPES = [
  'bug', 'dark', 'dragon', 'eletric', 'fairy', 'fighter', 'fire', 'flying', 'steel',
  'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'water'
];


function Landing() {
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
          <div className="content-pokedex"></div>
        </div>

      </div>
    </>
  );
}

export default Landing;
