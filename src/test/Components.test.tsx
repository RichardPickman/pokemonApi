import { render, waitFor } from '@testing-library/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorController from '../components/ErrorController';
import Input from '../components/Input';
import { List } from '../components/List';
import Pokemons from '../components/Pokemons';
import Search from '../components/Search';
import { SinglePokemon } from '../components/SinglePokemon';
import { PaginationProvider } from '../providers/Pagination';
import { PokemonProvider } from '../providers/Pokemons';

const pokemons = [
    {
        name: 'Bulbasaur',
        description: 'Pokemon is 7cm tall and 69 gramms',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
    {
        name: 'Ivysaur',
        description: 'Pokemon is 10cm tall and 130 gramms',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
    },
    {
        name: 'Venusaur',
        description: 'Pokemon is 20cm tall and 1000 gramms',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
    },
];

test('loads and displays Input component', async () => {
    const result = render(<Input value="Test" onChange={() => {}} />);

    expect(result.getByDisplayValue('Test')).toBeTruthy();
});

test('loads and displays Pokemon list', async () => {
    const pokemons = [
        {
            image: 'https://asd.com/asd.png',
            name: 'Name1',
            description: 'Test1',
        },
        {
            image: 'https://asd.com/asd.png',
            name: 'Name2',
            description: 'Test2',
        },
        {
            image: 'https://asd.com/asd.png',
            name: 'Name3',
            description: 'Test3',
        },
    ];
    const result = render(<Pokemons pokemons={pokemons} onClick={() => {}} />);

    const test1 = result.getByText('Name1');
    const test2 = result.getByText('Name2');
    const test3 = result.getByText('Name3');

    expect(test1).toBeTruthy();
    expect(test2).toBeTruthy();
    expect(test3).toBeTruthy();
});

test('loads and displays Search component', async () => {
    const result = render(
        <Search limit={1} onLimitChange={() => {}} onClick={() => {}} />
    );

    expect(result).toBeTruthy();
});

test('loads and displays Error button', async () => {
    const result = render(<ErrorController />);

    expect(result.getByText('Error!')).toBeTruthy();
});

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <PokemonProvider>
                <List />
            </PokemonProvider>
        ),
        loader: async () => {
            return { initialPokemons: pokemons, initialOffset: 0 };
        },
    },
]);

test('loads and displays List component', async () => {
    const result = render(<RouterProvider router={router} />);

    waitFor(() => expect(result.getByText('Bulbasaur')).toBeTruthy());
    waitFor(() => expect(result.getByText('Ivysaur')).toBeTruthy());
    waitFor(() => expect(result.getByText('Venusaur')).toBeTruthy());
});

const paginationRouter = createBrowserRouter([
    {
        path: '/',
        element: (
            <PaginationProvider>
                <SinglePokemon />
            </PaginationProvider>
        ),
        loader: async () => {
            return { item: pokemons[0] };
        },
    },
]);

test('loads and displays Single Pokemon component', async () => {
    const result = render(<RouterProvider router={paginationRouter} />);

    waitFor(() => expect(result.getByText('Bulbasaur')).toBeTruthy());
});

test("test clicking the pokemon to open it's card", async () => {
    const result = render(<RouterProvider router={router} />);

    waitFor(() => {
        const pokemon = result.getByTestId(
            'BulbasaurPokemon is 7cm tall and 69 gramms'
        );

        pokemon.click();

        expect(result.getByText('Bulbazaur')).toBeTruthy();
    });
});
