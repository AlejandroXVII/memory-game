import { pokemonList } from "./pokemonList";

test("Check that ship is create correctly", () => {
	expect(pokemonList(true)).toBe(true);
});
