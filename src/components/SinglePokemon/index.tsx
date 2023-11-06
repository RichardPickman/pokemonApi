import { useLoaderData } from 'react-router-dom';
import { Pokemon } from '../../types';

export const SinglePokemon = () => {
    const { item } = useLoaderData() as { item: Pokemon };

    if (!item) {
        return null;
    }

    return (
        <div className="pokemon">
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
