import { Component } from 'react';
import { Pokemon } from '../../types';

interface Props {
    pokemons: Pokemon[];
}

export default class Pokemons extends Component<Props> {
    render() {
        return (
            <section className="pokemon_list">
                {this.props.pokemons.map((item) => (
                    <div key={item.name + item.description} className="pokemon">
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
    }
}
