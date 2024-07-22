export default function Cards({ cardList, callBack }) {

}

function getPokemon() {
	const pokeRanges = {
		firstNumber: 252,
		lastNumber: 386
	};
	const values = randomIds(pokeRanges);
}

function randomIds(firstNumber, lastNumber ,numSelect = 12) {
	const allValues = [];
	for (let i = firstNumber; i <= lastNumber; i++)
		allValues.push(i);

	for (let currIndex = allValues.length - 1; currIndex > 0; currIndex--) {
		let randomIndex = Math.floor(Math.random() * currIndex);
		[allValues[currIndex], allValues[randomIndex]] = [allValues[randomIndex], allValues[currIndex]];
	}
	return (allValues.slice(0, numSelect));
}