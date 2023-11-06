import { useCallback, useEffect, useState } from 'react';
import {
    LoaderFunction,
    Outlet,
    useLoaderData,
    useNavigate,
} from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/Error';
import ErrorController from './components/ErrorController';
import { Pokemon } from './types';
import { fetchPokemons } from './utils/pokemons';
import { List } from './components/List';

interface Loader {
    initialPokemons: Pokemon[];
    initialOffset: number;
}

const INITIAL_LIMIT = 5;

const App = () => {
    const { initialPokemons, initialOffset } = useLoaderData() as Loader;
    const [isLoading, setLoading] = useState(false);
    const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons);
    const [currentPokemon, setPokemon] = useState<string | null>(null);
    const [limit, setLimit] = useState(INITIAL_LIMIT);
    const [offset, setOffset] = useState(initialOffset);
    const pages = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const [page, setPage] = useState(pages[0]);
    const navigate = useNavigate();

    const changePath = useCallback(
        () =>
            navigate(
                `/?limit=${limit}&offset=${offset}&poke=${
                    currentPokemon || null
                }`
            ),
        [currentPokemon, limit, navigate, offset]
    );

    const getPokemons = async (query: string) => {
        setLoading(true);
        const poks = await fetchPokemons(query, limit, offset);

        setPokemons(poks);
        setOffset(offset + poks.length);
        setLoading(false);
    };

    const getPokemonsByPage = async (page: number) => {
        setLoading(true);
        setPage(page);
        const poks = await fetchPokemons('', limit, page * limit);

        setPokemons(poks);
        setOffset(page * limit);
        setLoading(false);
    };

    useEffect(() => {
        setOffset(0);
        setPage(0);
    }, [limit]);

    useEffect(() => {
        changePath();
    }, [changePath, pokemons]);

    return (
        <ErrorBoundary>
            <main>
                <ErrorController />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <List
                        isLoading={isLoading}
                        pokemons={pokemons}
                        limit={limit}
                        offset={offset}
                        pages={pages}
                        page={page}
                        setLimit={setLimit}
                        onSearch={getPokemons}
                        getByPage={getPokemonsByPage}
                        onChoose={(pok) => setPokemon(pok)}
                    />
                    {currentPokemon && <Outlet />}
                </div>
            </main>
        </ErrorBoundary>
    );
};
export default App;

export const appLoader: LoaderFunction = async ({ request }) => {
    const pokemons = await fetchPokemons('', INITIAL_LIMIT);
    const url = new URL(request.url);
    const offset = url.searchParams.get('offset') || 0;

    return {
        initialPokemons: pokemons,
        initialOffset: offset,
    };
};
