import { useEffect, useRef } from "react";
import { playSound, areSoundsActive, stopAllSounds } from "./auxiliaryFunctions";
import "./styles/components.css"

export function Cards({ cardList, callBack }) {
	return (
		<section className="cardsContainer">
			{cardList.map((element) => {
				let name = element.name.charAt(0) + element.name.slice(1).toLowerCase();

				return (<div
					key={element.id}
					data-name={name}
					data-sound={element.sound}
					className="card"
					onClick={callBack}>
					<h3>{element.name}</h3>
					<img
						src={element.img}
						alt={`Front facing sprite of ${name}`} />
				</div>)
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
		<dialog ref={dialogRef} onClick={(e) => {
			if (!areSoundsActive() && e.target.tagName !== "BUTTON")
				playSound("assets/menuSong.flac")
		}}>
			<h1>Hola caracola</h1>
			<button onClick={() => {
				if (dialogRef.current) {
					stopAllSounds();
					dialogRef.current.close();
				}
			}}>Close me</button>
		</dialog>
	)
}