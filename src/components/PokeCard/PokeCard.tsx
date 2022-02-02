import React from 'react';
import { COLORS } from '../../utils';

import './PokeCard.css';

type PokemonProps = {
  national_number: string;
  spriteURL: string;
  name: string;
  types: string[];
}

function PokeCard({ national_number, spriteURL, name, types }: PokemonProps) {
  return (
    <div className="pokecard-container">
      <img width="125" src={spriteURL} alt={name} />
      <span className="pokecard-number">{`Nº ${national_number}`}</span>
      <span className="pokecard-name">{name}</span>
      <div className="pokecard-type">
        {types.map(type => {
          return (
            <span style={{ backgroundColor: COLORS[type.toLowerCase()] }} key={type}>{type}</span>
          )
        })}
      </div>
    </div>
  );
}

export default PokeCard;