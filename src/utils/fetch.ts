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

export const fetchAllCreatures = async (limit?: number, offset?: number) => {
    const params = new URLSearchParams(
        `limit=${limit || 20}&offset=${offset || 0}`
    );

    const url = `${POKEMON_API}/pokemon?${params}`;

    return (await fetch(url, headers).then((res) =>
        res.json()
    )) as Promise<AllPokemonsResponse>;
};
