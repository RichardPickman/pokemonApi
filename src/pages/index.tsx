import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import ErrorBoundary from '../components/Error';
import ErrorController from '../components/ErrorController';
import { List } from '../components/List';
import { SinglePokemon } from '../components/SinglePokemon';
import { Pokemon } from '../types';
import { fetchPokemons } from '../utils/pokemons';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const INITIAL_LIMIT = 5;

const App = ({ initialOffset, initialPokemons }: Props) => {
    const [isLoading, setLoading] = useState(false);
    const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons);
    const [currentPokemon, setPokemon] = useState<string | null>(null);
    const [limit, setLimit] = useState(INITIAL_LIMIT);
    const [offset, setOffset] = useState(initialOffset);
    const pages = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const [page, setPage] = useState(pages[0]);
    const router = useRouter();

    const changePath = useCallback(
        () =>
            router.push(
                `/?limit=${limit}&offset=${offset}&poke=${
                    currentPokemon || null
                }`
            ),
        [currentPokemon, limit, offset, router]
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
                    {currentPokemon && <SinglePokemon item={currentPokemon} />}
                </div>
            </main>
        </ErrorBoundary>
    );
};
export default App;

export const getServerSideProps = (async (context) => {
    const pokemons = await fetchPokemons('', INITIAL_LIMIT);
    const url = new URL(`http://localhost:3000${context.resolvedUrl}`);
    const offset = url.searchParams.get('offset') || 0;

    return {
        props: {
            initialPokemons: pokemons,
            initialOffset: Number(offset),
        },
    };
}) satisfies GetServerSideProps<{
    initialPokemons: Pokemon[];
    initialOffset: number;
}>;
