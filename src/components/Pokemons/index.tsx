import { Pokemon } from '../../types';

interface Props {
    pokemons: Pokemon[];
    onClick: (poke: string) => void;
}

const Pokemons = ({ pokemons, onClick }: Props) => {
    return (
        <section className="pokemon_list">
            {pokemons.map((item) => (
                <div
                    key={item.name + item.description}
                    className="pokemon"
                    test-id={item.name + item.description}
                    onClick={() => onClick(item.name)}
                >
                    <div className="pokemon__media">
                        <img src={item.image} alt="Pokemon image" />
                    </div>
                    <div className="pokemon__info">
                        <p>{item.name}</p>
                        <p>{item.description}</p>
                    </div>
                </div>
            ))}
        </section>
    );
};
export default Pokemons;
