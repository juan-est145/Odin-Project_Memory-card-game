import { useState, useEffect } from 'react';
import { Cards, Score } from './components';
import { getPokemon, shuffle } from './generatePokemon';
import "./styles/App.css";

const selectedCards = [];

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    getPokemon().then((pokeArray) => {
      if (pokeArray)
        setPokemon(pokeArray);
    })
  }, []);

  return (
    <>
      <header>
        <h1>Estoy aquí</h1>
        <Score score={score} highScore={bestScore}></Score>
      </header>
      <Cards
        cardList={pokemon}
        callBack={(e) => {
          playSound(e.currentTarget.dataset.sound);
          //alert(`You clicked on ${e.currentTarget.dataset.name}`);
          handleGame(e.currentTarget.dataset.name, selectedCards, score, bestScore, setScore, setBestScore);
          setPokemon(shuffle([...pokemon]));
        }}
      ></Cards>
    </>
  )
}

function playSound(src) {
  const sound = new Audio(src);
  sound.play();
}

function handleGame(currentCard, cardsSelected, score, highScore, scoreCallbck, highScoreCallbck) {
  if (cardsSelected.find((value) => value === currentCard)) {
    while (cardsSelected.length > 0)
      cardsSelected.pop();
    alert("You lose");
    if (score > highScore)
      highScoreCallbck(score);
    scoreCallbck(0);
    return;
  }
  cardsSelected.push(currentCard);
  scoreCallbck(score + 1);
}



export default App
