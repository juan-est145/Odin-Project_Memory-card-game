import { useState, useEffect } from 'react';
import { Cards, Score, Modal } from './components';
import { getPokemon, shuffle, playSound } from './auxiliaryFunctions';
import "./styles/App.css";

const selectedCards = [];

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    if (score !== 0)
      return;
    getPokemon().then((pokeArray) => {
      if (pokeArray)
        setPokemon(pokeArray);
    })
  }, [score]);

  //The purpose of the placeHolder div is that the h1 element stays centered
  return (
    <>
      <header>
        <div className='placeHolder'></div>
        <h1>Poke Card</h1>
        <Score score={score} highScore={bestScore}></Score>
      </header>
      <main>
        <Modal></Modal>
        <Cards
          cardList={pokemon}
          callBack={(e) => {
            playSound(e.currentTarget.dataset.sound);
            let mistake = handleGame(e.currentTarget.dataset.name, selectedCards, score, bestScore, setScore, setBestScore);
            if (!mistake)
              setPokemon(shuffle([...pokemon]));
          }}
        ></Cards>
      </main>
    </>
  )
}

function handleGame(currentCard, cardsSelected, score, highScore, scoreCallbck, highScoreCallbck) {
  if (cardsSelected.find((value) => value === currentCard)) {
    while (cardsSelected.length > 0)
      cardsSelected.pop();
    alert("You lose");
    if (score > highScore)
      highScoreCallbck(score);
    scoreCallbck(0);
    return (true);
  }
  cardsSelected.push(currentCard);
  scoreCallbck(score + 1);
  return (false);
}

export default App
