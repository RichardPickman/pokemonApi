import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { appLoader } from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { SinglePokemon } from './components/SinglePokemon/index.tsx';
import { fetchPokemons } from './utils/pokemons.ts';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
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

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
