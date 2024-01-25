import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function App() {
	const [img, setIMG] = useState(0);
	const [pokeName, setPokeName] = useState(0);
	async function getPokemon() {
		const response = await fetch(
			"https://pokeapi.co/api/v2/pokemon/" + getRandomInt(1000)
		);
		const pokemonData = await response.json();
		console.log(pokemonData);
		setIMG(pokemonData.sprites);
		setPokeName(pokemonData.name);
	}
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
			<h2>{pokeName}</h2>
			<h1>POKEMON</h1>
			<div className="card">
				<button onClick={() => getPokemon()}>
					picachu yo te elijo!
				</button>
			</div>
			<p className="read-the-docs">Click to get your pokemon</p>
		</>
	);
}

export default App;
