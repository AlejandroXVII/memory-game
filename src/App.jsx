import { useState, useEffect, useRef } from "react";
import "./App.css";
import winGif from "./assets/win.gif";
import { getArrayPokemonIDs, shuffleArray } from "./pokemonList";
export default App;

function PokemonCards(prob) {
	function shufflePokemon(e) {
		if (
			(prob.sequence.findIndex(
				(element) => element === e.target.innerText
			) ===
				-1) |
			(prob.sequence.length === 0)
		) {
			prob.setSequence([...prob.sequence, e.target.innerText]);
			prob.setScore(prob.score + 1);
			e.preventDefault();

			prob.buttonsRef.current.className = "cardsContainer cardEffect";
			setTimeout(() => {
				if (!prob.showModal)
					prob.buttonsRef.current.className = "cardsContainer";
			}, 2000);
			setTimeout(() => {
				prob.setPokemonList([...shuffleArray(prob.pokemonList)]);
				e.target.blur();
			}, 1000);
		} else {
			prob.setSequence([]);
			prob.setScore(0);
			e.target.className = "wrongCard";
			setTimeout(() => {
				e.target.className = "";
			}, 500);
		}
	}

	return (
		<div className="cardsContainer" ref={prob.buttonsRef}>
			{prob.pokemonList.map((pokemon) => (
				<button
					onClick={shufflePokemon}
					key={pokemon.id}
					style={{ backgroundImage: `url(${pokemon.img})` }}
				>
					<p>{pokemon.name}</p>
				</button>
			))}
		</div>
	);
}
function App() {
	const [pokemonArray, setPokemonArray] = useState([]);
	const [id, setID] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [score, setScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);
	const [pokemonList, setPokemonList] = useState([]);
	const [difficulty, setDifficulty] = useState("none");
	const [sequence, setSequence] = useState([]);
	const buttonsRef = useRef(null);

	useEffect(() => {
		//get the id and add the pokemon to the list
		if (id === 0) return;
		const fetchData = async () => {
			const response = await fetch(
				"https://pokeapi.co/api/v2/pokemon/" + id
			);
			const pokemonData = await response.json();
			setPokemonList([
				...pokemonList,
				{
					id: id,
					name: pokemonData.name,
					img: pokemonData.sprites.front_default,
				},
			]);
		};
		pokemonArray.pop();
		fetchData().catch(console.error);
	}, [id]);

	useEffect(() => {
		//compare the prob.sequence size and the pokemon list size to check if the player won
		if ((sequence.length === pokemonList.length) & (sequence.length > 0)) {
			setShowModal(true);
			buttonsRef.current.className = "cardsContainer winAnimation";
		}
	}, [sequence.length, pokemonList.length]);

	useEffect(() => {
		if (pokemonArray.length > 0) {
			setID(pokemonArray[pokemonArray.length - 1]);
		}
	}, [pokemonArray.length]);

	useEffect(() => {
		if (score > bestScore) {
			setBestScore(score);
		}
	}, [score]);

	useEffect(() => {
		//set the size of the amount of card depending of the difficulty
		let cardsNum = 0;
		if (difficulty === "easy") {
			cardsNum = 6;
		}
		if (difficulty === "normal") {
			cardsNum = 12;
		}
		if (difficulty === "hard") {
			cardsNum = 24;
		}
		setPokemonArray(getArrayPokemonIDs(cardsNum));
	}, [difficulty]);
	function closeModal(e) {
		e.preventDefault();
		setShowModal(false);
		setPokemonArray([]);
		setScore(0);
		setID(0);
		setPokemonList([]);
		setDifficulty("none");
		setSequence([]);
		buttonsRef.current.className = "cardsContainer";
	}
	return (
		<>
			<h1>POKEMON</h1>
			<h2>MEMORY GAME</h2>
			<div className="card">
				<button
					onClick={() =>
						difficulty === "none" ? setDifficulty("easy") : null
					}
					style={
						difficulty === "easy"
							? { backgroundColor: "rgb(87, 252, 95)" }
							: null
					}
				>
					Easy
				</button>
				<button
					onClick={() =>
						difficulty === "none" ? setDifficulty("normal") : null
					}
					style={
						difficulty === "normal"
							? { backgroundColor: "rgb(252, 186, 87)" }
							: null
					}
				>
					Normal
				</button>
				<button
					onClick={() =>
						difficulty === "none" ? setDifficulty("hard") : null
					}
					style={
						difficulty === "hard"
							? { backgroundColor: "rgb(252, 87, 87)" }
							: null
					}
				>
					Hard
				</button>
			</div>
			<p className="Score">Score: {score}</p>
			<p className="Score">Best score: {bestScore}</p>
			<PokemonCards
				score={score}
				setScore={setScore}
				pokemonList={pokemonList}
				setPokemonList={setPokemonList}
				setBestScore={setBestScore}
				setShowModal={setShowModal}
				sequence={sequence}
				setSequence={setSequence}
				buttonsRef={buttonsRef}
			/>
			{showModal ? (
				<dialog open>
					<h1>CONGRATULATION</h1>
					<img src={winGif} alt="" />
					<h3>You have win!</h3>
					<button onClick={closeModal}>Play Again</button>
				</dialog>
			) : null}
		</>
	);
}
