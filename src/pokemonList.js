export function getArrayPokemonIDs(num = 6, max = 1000) {
	if (num > max)
		throw new Error("first argument not can be bigger than the second");
	let pokemonIDList = [];
	for (let index = 0; index < num; index++) {
		let newID = getRandomInt(max);

		if (
			(pokemonIDList.findIndex((element) => element === newID) === -1) |
			(pokemonIDList.length === 0)
		) {
			pokemonIDList.push(newID);
		} else {
			index -= 1;
		}
	}
	console.log(pokemonIDList);
	return pokemonIDList;
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

export function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}
