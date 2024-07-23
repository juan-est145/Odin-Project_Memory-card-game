const currentSounds = new Set();

export async function getPokemon() {
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

export function shuffle(array) {
	for (let currIndex = array.length - 1; currIndex > 0; currIndex--) {
		let randomIndex = Math.floor(Math.random() * currIndex);
		[array[currIndex], array[randomIndex]] = [array[randomIndex], array[currIndex]];
	}
	return (array);
}

export function playSound(src) {
	const sound = new Audio(src);
	currentSounds.add(sound);
	sound.play().catch(error => {
		console.error("Error playing sound:", error);
		currentSounds.delete(sound);
	});
	sound.onended(() => currentSounds.delete(sound));
}

export function areSoundsActive() {
	if (currentSounds.size > 0)
		return (true);
	return (false);
}

export function stopAllSounds () {
	if (currentSounds.size <= 0)
		return ;
	currentSounds.forEach((element) => {
		element.pause();
	});
	currentSounds.clear();
}

class PokemonData {
	constructor(id, name, img, sound) {
		this.id = id;
		this.name = name;
		this.img = img;
		this.sound = sound;
	}
}