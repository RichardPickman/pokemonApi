import { Component } from 'react';
import './App.css';
import ErrorBoundary from './components/Error';
import ErrorController from './components/ErrorController';
import Search from './components/Search';
import { Pokemon } from './types';
import { fetchPokemons } from './utils/pokemons';
import Pokemons from './components/Pokemons';

interface Props {}
interface State {
    query: string;
    pokemons: Pokemon[];
    isLoading: boolean;
}

class App extends Component<Props, State> {
    state: State = {
        query: '',
        pokemons: [],
        isLoading: false,
    };

    constructor(props: Props) {
        super(props);
    }

    getPokemons = (query: string) => {
        this.setState((state) => ({ ...state, isLoading: true }));

        fetchPokemons(query).then((pokemons) =>
            this.setState(() => ({ pokemons, isLoading: false }))
        );
    };

    render() {
        return (
            <ErrorBoundary>
                <main>
                    <ErrorController />
                    <Search onClick={this.getPokemons} />
                    {this.state.isLoading ? (
                        <div className="loading" />
                    ) : (
                        <Pokemons pokemons={this.state.pokemons} />
                    )}
                </main>
            </ErrorBoundary>
        );
    }
}

export default App;
