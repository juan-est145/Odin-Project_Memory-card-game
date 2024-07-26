import { useState, useEffect } from 'react';
import { Cards, Score, Modal, StatusModal } from './components';
import { getPokemon, shuffle, playSound } from './auxiliaryFunctions';
import "./styles/App.css";

const selectedCards = [];
const totalCards = 12;

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [victory, setVictory] = useState(null);

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
        <StatusModal victory={victory} setVictory={setVictory}></StatusModal>
        <Cards
          cardList={pokemon}
          callBack={(e) => {
            playSound(e.currentTarget.dataset.sound);
            let gameOver = handleGame(e.currentTarget.dataset.name, selectedCards, score, bestScore, setScore, setBestScore, setVictory);
            if (!gameOver)
              setPokemon(shuffle([...pokemon]));
          }}
        ></Cards>
      </main>
    </>
  )
}

function handleGame(currentCard, cardsSelected, score, highScore, scoreCallbck, highScoreCallbck, setVictory) {
  let cardIsDuplicate = cardsSelected.find((value) => value === currentCard);

  if (cardIsDuplicate || score === totalCards - 1) {
    while (cardsSelected.length > 0)
      cardsSelected.pop();
    cardIsDuplicate ? setVictory(false) : setVictory(true);
    if (score > highScore && cardIsDuplicate)
      highScoreCallbck(score);
    else if (!cardIsDuplicate)
      highScoreCallbck(totalCards);
    scoreCallbck(0);
    return (true);
  }
  cardsSelected.push(currentCard);
  scoreCallbck(score + 1);
  return (false);
}

export default App
