import { useState, useEffect } from "react";
import "./App.css";
import { getArrayPokemonIDs, shuffleArray } from "./pokemonList";

function PokemonCards() {
	const [pokemonIDs, setPokemonIDs] = useState([5, 1, 2, 3, 4]);
	function shufflePokemon(e) {
		e.preventDefault();
		setPokemonIDs([...shuffleArray(pokemonIDs)]);
	}
	return (
		<div>
			{pokemonIDs.map((pokemon) => (
				<button onClick={shufflePokemon} key={pokemon}>
					{pokemon}
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

export default App;
