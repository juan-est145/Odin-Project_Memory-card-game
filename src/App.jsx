import { useState } from 'react'
import Cards from './cards';

function App() {
  return (<Cards
    cardList={getPokemon()}
    callBack={() => onclick(alert("Hola"))}
  ></Cards>);
}

async function getPokemon() {
  const pokeRanges = {
    firstNumber: 252,
    lastNumber: 386
  };
  const values = randomIds(pokeRanges.firstNumber, pokeRanges.lastNumber);
  try {
    const pokemonList = await Promise.all(values.map(async (element) => {
      const response = await fetch(`https://pokeapi.co/api/v2/ability/${element}/`, { mode: "cors" });
      if (!response.ok)
        throw new Error(`API request failed with code ${response.status}`);
      const pokeData = await response.json();
      return (new PokemonData(pokeData.id, pokeData.name, pokeData.sprites.front_default));
    }));
    console.log(pokemonList); //Erase this later
    return (pokemonList);
  } catch (error) {
    console.error("Failed to fetch Pokemon data", error);
  }
}

function randomIds(firstNumber, lastNumber, numSelect = 12) {
  const allValues = [];
  for (let i = firstNumber; i <= lastNumber; i++)
    allValues.push(i);

  for (let currIndex = allValues.length - 1; currIndex > 0; currIndex--) {
    let randomIndex = Math.floor(Math.random() * currIndex);
    [allValues[currIndex], allValues[randomIndex]] = [allValues[randomIndex], allValues[currIndex]];
  }
  return (allValues.slice(0, numSelect));
}

class PokemonData {
  constructor(id, name, img) {
    this.id = id;
    this.name = name;
    this.img = img;
  }
}

export default App
