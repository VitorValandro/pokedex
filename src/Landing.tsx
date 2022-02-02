import React from 'react';
import Header from './components/Header/Header';
import './Landing.css';

import search from './assets/search.svg';

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
      </div>
    </>
  );
}

export default Landing;
