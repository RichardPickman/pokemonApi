import { useState } from 'react';
import Button from '../Button';

const ErrorController = () => {
    const [isError, setError] = useState(false);

    if (isError) {
        throw new Error('This error is thrown on demand');
    }

    const onClick = () => setError(true);

    return <Button onClick={onClick}>Error!</Button>;
};

export default ErrorController;
