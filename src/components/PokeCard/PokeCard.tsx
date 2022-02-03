import React, { useState } from 'react';
import { COLORS } from '../../utils';

import './PokeCard.css';
import likeIcon from '../../assets/like.svg';
import likeSolidIcon from '../../assets/like-solid.svg';

export type PokemonProps = {
  national_number: string;
  spriteURL: string;
  name: string;
  types: string[];
  liked?: boolean;
}

function PokeCard({ national_number, spriteURL, name, types, liked }: PokemonProps) {
  const [hovering, setHovering] = useState<boolean>(false);
  const [likedState, setLikedState] = useState<boolean>(liked || false);

  const handleFavorite = (id: string) => {
    if (localStorage.getItem(id)) {
      setLikedState(false);
      localStorage.removeItem(id);
      return;
    }
    localStorage.setItem(id, name);
    setLikedState(true);
  }

  return (
    <div
      className="pokecard-container"
      id={national_number}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {(hovering || likedState) &&
        <div className="favorite-icon" onClick={() => handleFavorite(national_number)}>
          <img src={likedState ? likeSolidIcon : likeIcon} alt='like' />
        </div>
      }

      <div className="pokecard-image">
        <img src={spriteURL} alt={name} />
      </div>
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