import { useLoaderData } from 'react-router-dom';
import { Pokemon } from '../../types';
import { useContext } from 'react';
import { PokemonState } from '../../providers/Pokemons';

export const SinglePokemon = () => {
    const { onNewQuery } = useContext(PokemonState);
    const { item } = useLoaderData() as { item: Pokemon };

    if (!item) {
        return null;
    }

    return (
        <div className="pokemon" style={{ position: 'relative' }}>
            <div
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    width: '10px',
                    height: '10px',
                    padding: '1rem',
                    cursor: 'pointer',
                }}
                onClick={() => onNewQuery(null)}
            >
                x
            </div>
            <div className="pokemon__media">
                <img src={item.image} alt="Pokemon image" />
            </div>
            <div className="pokemon__info">
                <p>{item.name}</p>
                <p>{item.description}</p>
            </div>
        </div>
    );
};
