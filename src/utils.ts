/* 
The COLORS constant keep all colors of application tracked.
When adding a new color, add it to this array and nothing will break.
*/
export const COLORS: { [key: string]: string } = {
  "font": "#333333",
  "dark-gray": "#828282",
  "gray": "#cccccc",
  "light-gray": "#F2F2F2",
  "red": "#E2350D",
  "white": "#FFFFFF",

  "fire": "#EE7F33",
  "normal": "#A9A778",
  "water": "#6890F0",
  "grass": "#78C84F",
  "ice": "#98D8D7",
  "poison": "#A040A1",
  "ground": "#E0C069",
  "flying": "#A790EF",
  "bug": "#A8B821",
  "rock": "#B6A037",
  "ghost": "#705797",
  "dragon": "#724EF9",
  "dark": "#6F5848",
  "steel": "#B8B8D0",
  "fairy": "#F4C8E2",
  "psychic": "#E95587",
  "electric": "#F8CF32",
  "fighting": "#C03228",
}

/* 
The POKEMON_TYPES constant keep all pokemon's types of application tracked.
When adding a new type, add it to this array and nothing will break.
*/
export const POKEMON_TYPES = [
  'Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 'Flying', 'Steel',
  'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Water'
];

export async function checkImage(url: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) throw await response.json();
    return true;
  }
  catch (e) {
    return false;
  }
}