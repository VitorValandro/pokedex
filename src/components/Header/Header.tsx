import React from 'react';

import './Header.css';
import logo from '../../assets/pokeball.svg';
import synvia_icon from '../../assets/synvia-A.svg';
import exit_icon from '../../assets/exit.svg';

function Header() {
  return (
    <div className="header-container">
      <div className="header-content">
        <img src={logo} alt="Pokédex" />
        <h1>Pokédex</h1>
      </div>
      <div className="header-content">
        <img src={synvia_icon} alt="Synvia" />
        <img width="20" src={exit_icon} alt="Sair" />
      </div>
    </div>
  );
}

export default Header;