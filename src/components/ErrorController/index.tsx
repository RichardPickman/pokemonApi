import { Component } from 'react';

interface Props {}

interface State {
    isError: boolean;
}

export default class ErrorController extends Component<Props, State> {
    state = {
        isError: false,
    };

    invokeError = () => {
        this.setState(() => ({ isError: true }));
    };

    render() {
        if (this.state.isError) {
            throw new Error('This error is thrown on demand');
        }

        return <button onClick={this.invokeError}>Invoke error!</button>;
    }
}
