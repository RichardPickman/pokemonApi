import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import { Pokemon } from '../types';
import { fetchPokemons } from '../utils/pokemons';
import { PaginationState } from './Pagination';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';

interface PokemonsContext {
    isLoading: boolean;
    queries: string[];
    pokemons: Pokemon[];
    currentPokemon: string | null;
    onNewQuery: (data: string | null) => void;
    getPokemons: (query: string) => void;
    getPokemonsByPage: (page: number) => void;
}

interface Loader {
    initialPokemons: Pokemon[];
    initialOffset: number;
}

export const PokemonState = createContext<PokemonsContext>({
    isLoading: false,
    queries: [],
    pokemons: [],
    currentPokemon: null,
    onNewQuery: () => {},
    getPokemons: () => {},
    getPokemonsByPage: () => {},
});

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
    const loader = useLoaderData() as Loader;
    const { limit, offset, onOffsetChange, onPageChange } =
        useContext(PaginationState);
    const [isLoading, setLoading] = useState(false);
    const [queries, setQueries] = useState<string[]>([]);
    const [pokemons, setPokemons] = useState<Pokemon[]>(loader.initialPokemons);
    const [currentPokemon, setPokemon] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleHistory = useCallback(
        (query: string) => setQueries([...queries, query]),
        [queries]
    );

    const getPokemons = useCallback(
        async (query: string) => {
            setLoading(true);
            const poks = await fetchPokemons(query, limit, offset);

            setPokemons(poks);
            onOffsetChange(offset + poks.length);
            setLoading(false);

            handleHistory(query);
        },
        [handleHistory, limit, offset, onOffsetChange]
    );

    const getPokemonsByPage = async (page: number) => {
        setLoading(true);
        onPageChange(page);
        const poks = await fetchPokemons('', limit, page * limit);

        setPokemons(poks);
        onOffsetChange(page * limit);
        setLoading(false);
    };

    useEffect(() => {
        navigate(
            `/?limit=${limit}&offset=${offset}&poke=${currentPokemon || null}`
        );
    }, [currentPokemon, limit, navigate, offset]);

    return (
        <PokemonState.Provider
            value={{
                isLoading,
                queries,
                pokemons,
                currentPokemon,
                onNewQuery: (data: string | null) => setPokemon(data),
                getPokemons,
                getPokemonsByPage,
            }}
        >
            {children}
        </PokemonState.Provider>
    );
};

export const appLoader: LoaderFunction = async ({ request }) => {
    const pokemons = await fetchPokemons('', 20);
    const url = new URL(request.url);
    const offset = url.searchParams.get('offset') || 0;

    return {
        initialPokemons: pokemons,
        initialOffset: offset,
    };
};
