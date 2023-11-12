import { useContext } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/Error';
import ErrorController from './components/ErrorController';
import { List } from './components/List';
import { SinglePokemon } from './components/SinglePokemon';
import { PaginationProvider } from './providers/Pagination';
import { PokemonProvider, PokemonState, appLoader } from './providers/Pokemons';
import { fetchPokemons } from './utils/pokemons';

const Page = () => {
    const { currentPokemon } = useContext(PokemonState);

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
                    <List />
                    {currentPokemon && <Outlet />}
                </div>
            </main>
        </ErrorBoundary>
    );
};

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <PaginationProvider>
                <PokemonProvider>
                    <Page />
                </PokemonProvider>
            </PaginationProvider>
        ),
        loader: appLoader,
        children: [
            {
                path: '/',
                element: <SinglePokemon />,
                loader: async ({ request }) => {
                    const url = new URL(request.url);
                    const poke = url.searchParams.get('poke') || '';
                    const result = await fetchPokemons(poke);

                    if (!result[0]) {
                        return { item: null };
                    }

                    return { item: result[0] };
                },
            },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
