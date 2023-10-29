import { fetchAllCreatures, fetchCreature } from './fetch';
import { SinglePokemon } from './types';

const getPokemonInfo = (pokemon: SinglePokemon) => ({
    name: pokemon.name,
    description: `Pokemon is ${pokemon.height}cm tall and ${pokemon.weight} gramms`,
    image: pokemon.sprites.front_default,
});

const getAllCreatures = async () => {
    const { results } = await fetchAllCreatures();
    const result = results.map(async (item) => {
        const pokemon = await fetchCreature(item.name);

        return getPokemonInfo(pokemon as SinglePokemon);
    });

    return Promise.all(result);
};

export const fetchPokemons = async (text: string) => {
    if (text) {
        const pokemon = await fetchCreature(text);

        if (!pokemon) {
            return [];
        }

        return [getPokemonInfo(pokemon)];
    } else {
        const pokemons = await getAllCreatures();

        return pokemons.filter(Boolean);
    }
};
