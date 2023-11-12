import { useContext } from 'react';
import { PaginationState } from '../../providers/Pagination';
import { PokemonState } from '../../providers/Pokemons';
import Pokemons from '../Pokemons';
import Search from '../Search';

// interface ListProps {
//     isLoading: boolean;
//     pokemons: Pokemon[];
//     limit: number;
//     offset: number;
//     pages: number[];
//     page: number;
//     setLimit: (limit: number) => void;
//     onSearch: (query: string) => void;
//     getByPage: (num: number) => void;
//     onChoose: (name: string) => void;
// }

export const List = () => {
    const data = useContext(PokemonState);
    const pagination = useContext(PaginationState);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Search
                limit={pagination.limit}
                onLimitChange={pagination.onLimitChange}
                onClick={data.getPokemons}
            />
            {data.isLoading ? (
                <div className="loading" />
            ) : (
                <div
                    style={{
                        display: 'flex',
                        gap: '16px',
                        flexDirection: 'column',
                    }}
                >
                    <Pokemons
                        pokemons={data.pokemons}
                        onClick={data.onNewQuery}
                    />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '16px',
                        }}
                    >
                        {pagination.pages.map((item) => (
                            <div
                                key={item}
                                style={{
                                    padding: '1rem',
                                    border: '1px solid',
                                    cursor: 'pointer',
                                    borderColor:
                                        pagination.page === item
                                            ? 'white'
                                            : 'gray',
                                }}
                                onClick={() => data.getPokemonsByPage(item)}
                            >
                                {item + 1}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
