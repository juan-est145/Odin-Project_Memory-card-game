import { useEffect, useRef } from "react";
import { playSound, areSoundsActive, stopAllSounds } from "./auxiliaryFunctions";
import "./styles/components.css"

export function Cards({ cardList, callBack }) {
	return (
		<section className="cardsContainer">
			{cardList.map((element) => {
				let name = element.name.charAt(0) + element.name.slice(1).toLowerCase();

				return (<button
					key={element.id}
					data-name={name}
					data-sound={element.sound}
					className="card"
					onClick={callBack}
					tabIndex="0">
					<h3>{element.name}</h3>
					<img
						src={element.img}
						alt={`Front facing sprite of ${name}`} />
				</button>)
			}
			)}
		</section>);
}

export function Score({ score, highScore }) {
	return (
		<div className="scores">
			<span>Score: {score}</span>
			<span>Best score: {highScore}</span>
		</div>
	)
}

export function Modal() {
	const dialogRef = useRef(null);
	useEffect(() => {
		if (dialogRef.current) {
			dialogRef.current.showModal();
		}
	}, []);
	return (
		<dialog ref={dialogRef} className="startDialog" onClick={(e) => {
			if (!areSoundsActive() && e.target.tagName !== "BUTTON")
				playSound("sounds/menuSong.flac")
		}}>
			<section className="modalText">
				<h1>Welcome to the Poke-card game</h1>
				<h4>(Please, click anywhere but the close button to play music)</h4>
				<img src="../images/pokemon-sapphire-kyogre.gif" alt="Pokemon sapphire gif"/>
				<p>
					In this game, you must click on all the pokemon without clicking
					on any one of them more than once. Everytime you click on
					a pokemon, the cards will re-shuffle so as to make it a challenge.
					If you click on a previously clicked character, you will lose and the
					game will bring new pokemon.
				</p>
				<p>Good luck!</p>
			</section>
			<button className="exitBtn" onClick={() => {
				if (dialogRef.current) {
					stopAllSounds();
					playSound("sounds/closeSound.mp3")
					dialogRef.current.close();
				}
			}}>X</button>
		</dialog>
	)
}