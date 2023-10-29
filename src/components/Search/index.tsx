import { Component } from 'react';
import Button from '../Button';
import Input from '../Input';

interface Props {
    onClick: (input: string) => void;
}

interface State {
    query: string;
}

export default class Search extends Component<Props, State> {
    state: State = {
        query: localStorage.getItem('history') || '',
    };

    saveToHistory = () => {
        const query = this.state.query;

        localStorage.setItem('history', query);
    };

    handleClick = () => {
        this.props.onClick(this.state.query);

        this.saveToHistory();
    };

    componentDidMount(): void {
        if (this.state.query) {
            this.handleClick();
        }
    }

    render() {
        return (
            <section className="search">
                <div>
                    <Input
                        onChange={(query) =>
                            this.setState(() => ({ ...this.state, query }))
                        }
                        value={this.state.query || ''}
                    />
                    <Button onClick={this.handleClick} />
                </div>
            </section>
        );
    }
}
