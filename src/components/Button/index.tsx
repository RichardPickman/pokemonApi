import { Component } from 'react';

interface Props {
    onClick: () => void;
}

export default class Button extends Component<Props> {
    render() {
        return <button onClick={this.props.onClick}>Search</button>;
    }
}
