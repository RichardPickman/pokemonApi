export interface SinglePokemon {
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
    };
}

export type AllPokemonsResponse = {
    results: { name: string; url: string }[];
};
