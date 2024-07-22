import { useState, useEffect } from 'react';
import Cards from './cards';
import "./styles/App.css"

function App() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    getPokemon().then((pokeArray) => {
      if (pokeArray)
        setPokemon(pokeArray);
    })
  }, []);

  return (
    <>
      <h1>Estoy aquí</h1>
      <Cards
        cardList={pokemon}
        callBack={(e) => {
          const pokemonCry = new Audio(e.currentTarget.dataset.sound);
          alert(`You clicked on ${e.currentTarget.dataset.name}`);
          pokemonCry.play();
          setPokemon(shuffle([...pokemon]));
        }}
      ></Cards>
    </>
  )
}

async function getPokemon() {
  const pokeRanges = {
    firstNumber: 252,
    lastNumber: 386
  };
  const values = randomIds(pokeRanges.firstNumber, pokeRanges.lastNumber);
  try {
    const pokemonList = await Promise.all(values.map(async (element) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${element}/`, { mode: "cors" });
      if (!response.ok)
        throw new Error(`API request failed with code ${response.status}`);
      const pokeData = await response.json();
      return (new PokemonData(
        pokeData.id, pokeData.name.toUpperCase(), pokeData.sprites.front_default, pokeData.cries.latest));
    }));
    return (pokemonList);
  } catch (error) {
    console.error("Failed to fetch Pokemon data", error);
  }
}

function randomIds(firstNumber, lastNumber, numSelect = 12) {
  const allValues = [];
  for (let i = firstNumber; i <= lastNumber; i++)
    allValues.push(i);
  shuffle(allValues);
  return (allValues.slice(0, numSelect));
}

function shuffle(array) {
  for (let currIndex = array.length - 1; currIndex > 0; currIndex--) {
    let randomIndex = Math.floor(Math.random() * currIndex);
    [array[currIndex], array[randomIndex]] = [array[randomIndex], array[currIndex]];
  }
  return (array);
}

class PokemonData {
  constructor(id, name, img, sound) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.sound = sound;
  }
}

export default App
