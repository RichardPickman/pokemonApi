import { useEffect, useState } from 'react';
import { Pokemon } from '../../types';
import { fetchPokemons } from '../../utils/pokemons';
import { useRouter } from 'next/router';

interface Props {
    item: string | null;
}

export const SinglePokemon = ({ item }: Props) => {
    const [poke, setPoke] = useState<Pokemon | null>(null);
    const router = useRouter();

    useEffect(() => {
        const getPokemon = async () => {
            if (!item) {
                return;
            }

            const result = await fetchPokemons(item);
            const pokemon = result[0] || null;

            setPoke(pokemon);
        };

        getPokemon();
    }, [item, router.asPath]);

    if (!poke) {
        return null;
    }

    return (
        <div className="pokemon">
            <div className="pokemon__media">
                <img src={poke.image} alt="Pokemon image" />
            </div>
            <div className="pokemon__info">
                <p>{poke.name}</p>
                <p>{poke.description}</p>
            </div>
        </div>
    );
};
