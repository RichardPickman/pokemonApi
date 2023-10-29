import { AllPokemonsResponse, SinglePokemon } from './types';

const POKEMON_API = 'https://pokeapi.co/api/v2';

const headers: RequestInit = {
    method: 'GET',
    headers: {
        'Access-Control-Allow-Origin': 'https://pokeapi.co/',
    },
};

export const fetchCreature = async (
    pokemon: string
): Promise<SinglePokemon | undefined> => {
    const response = await fetch(`${POKEMON_API}/pokemon/${pokemon}`, headers);

    if (response.status === 404) {
        return;
    }

    return response.json();
};

export const fetchAllCreatures = async (): Promise<AllPokemonsResponse> =>
    await fetch(`${POKEMON_API}/pokemon?limit=20`, headers).then((res) =>
        res.json()
    );
