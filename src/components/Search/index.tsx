import { useState } from 'react';
import Button from '../Button';
import Input from '../Input';

interface Props {
    limit: number;
    onClick: (input: string) => void;
    onLimitChange: (limit: number) => void;
}

const Search = ({ limit, onClick, onLimitChange }: Props) => {
    const [query, setQuery] = useState('');

    const handleClick = () => {
        onClick(query);
        saveToHistory();
    };

    const saveToHistory = () => localStorage.setItem('history', query);

    return (
        <section
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                }}
            >
                <Input onChange={setQuery} value={query || ''} />
                <Button onClick={handleClick}>Search</Button>
            </div>
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                }}
            >
                <label>Limit: </label>
                <input
                    type="number"
                    value={limit}
                    onChange={(event) =>
                        onLimitChange(Number(event.target.value))
                    }
                />
            </div>
        </section>
    );
};

export default Search;
