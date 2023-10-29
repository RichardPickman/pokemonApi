import { Component } from 'react';

interface Props {
    onChange: (input: string) => void;
    value: string;
}

export default class Input extends Component<Props> {
    render() {
        return (
            <input
                onChange={(event) =>
                    this.props.onChange(event.target.value.trim().toLowerCase())
                }
                value={this.props.value}
            />
        );
    }
}
