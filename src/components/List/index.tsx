import { Pokemon } from '../../types';
import Pokemons from '../Pokemons';
import Search from '../Search';

interface ListProps {
    isLoading: boolean;
    pokemons: Pokemon[];
    limit: number;
    offset: number;
    pages: number[];
    page: number;
    setLimit: (limit: number) => void;
    onSearch: (query: string) => void;
    getByPage: (num: number) => void;
    onChoose: (name: string) => void;
}

export const List = (props: ListProps) => {
    const {
        isLoading,
        pokemons,
        limit,
        pages,
        page,
        setLimit,
        onSearch,
        getByPage,
        onChoose,
    } = props;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Search limit={limit} onLimitChange={setLimit} onClick={onSearch} />
            {isLoading ? (
                <div className="loading" />
            ) : (
                <div
                    style={{
                        display: 'flex',
                        gap: '16px',
                        flexDirection: 'column',
                    }}
                >
                    <Pokemons pokemons={pokemons} onClick={onChoose} />
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '16px',
                        }}
                    >
                        {pages.map((item) => (
                            <div
                                key={item}
                                style={{
                                    padding: '1rem',
                                    border: '1px solid',
                                    cursor: 'pointer',
                                    borderColor:
                                        page === item ? 'white' : 'gray',
                                }}
                                onClick={() => getByPage(item)}
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
