import { Component, ReactNode } from 'react';

interface State {
    hasError: boolean;
    message: string;
}

interface Props {
    children: ReactNode;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, message: '' };
    }

    componentDidCatch(error: Error): void {
        console.log('This is error!');
        this.setState(() => ({ hasError: true, message: error.message }));
    }

    render() {
        if (this.state.hasError) {
            return <div className="error">{this.state.message}</div>;
        }

        return this.props.children;
    }
}
