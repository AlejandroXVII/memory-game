import { useState, useEffect } from "react";
import "./App.css";
import { getArrayPokemonIDs, shuffleArray } from "./pokemonList";
export default App;

function PokemonCards() {
	const [pokemonIDs, setPokemonIDs] = useState([
		{ id: 5, name: "6" },
		{ id: 1, name: "7" },
		{ id: 2, name: "8" },
		{ id: 3, name: "9" },
		{ id: 4, name: "10" },
	]);
	const [sequence, setSequence] = useState([]);
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);

	function shufflePokemon(e) {
		e.preventDefault();
		setPokemonIDs([...shuffleArray(pokemonIDs)]);

		if (
			(sequence.findIndex((element) => element === e.target.innerText) ===
				-1) |
			(sequence.length === 0)
		) {
			setSequence([...sequence, e.target.innerText]);
			console.log(e.target.innerText);
			console.log(sequence);
		} else {
			setSequence([]);
		}
	}
	useEffect(() => {
		if (sequence.length === pokemonIDs.length) {
			console.log("you has win");
		}
	}, [sequence.length, pokemonIDs.length]);
	return (
		<div>
			{pokemonIDs.map((pokemon) => (
				<button onClick={shufflePokemon} key={pokemon.id}>
					{pokemon.name}
				</button>
			))}
		</div>
	);
}
function App() {
	const [img, setIMG] = useState(0);
	const [pokeName, setPokeName] = useState(0);
	const [id, setID] = useState(1);
	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				"https://pokeapi.co/api/v2/pokemon/" + id
			);
			const pokemonData = await response.json();
			setIMG(pokemonData.sprites);
			setPokeName(pokemonData.name);
		};
		fetchData().catch(console.error);
	}, [id]);
	return (
		<>
			<div>
				<img src={img.front_shiny} className="logo" alt="Vite logo" />
				<img
					src={img.front_default}
					className="logo react"
					alt="React logo"
				/>
			</div>
			<h2>
				{pokeName}: {id}
			</h2>
			<h1>POKEMON</h1>
			<div className="card">
				<button onClick={() => setID(getRandomInt(1000))}>
					picachu yo te elijo!
				</button>
				<button onClick={() => getArrayPokemonIDs(5)}>get IDs</button>
			</div>
			<p className="read-the-docs">Click to get your pokemon</p>
			<PokemonCards />
		</>
	);
}
