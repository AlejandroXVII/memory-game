import { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [img, setIMG] = useState(0);
	const [pokeName, setPokeName] = useState(0);
	const [id, setID] = useState(1);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				"https://pokeapi.co/api/v2/pokemon/" + id
			);
			const pokemonData = await response.json();
			console.log(pokemonData);
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
			</div>
			<p className="read-the-docs">Click to get your pokemon</p>
		</>
	);
}

export default App;
