import { ReactNode } from 'react';

interface Props {
    onClick: () => void;
    children: ReactNode;
}

const Button = ({ children, onClick }: Props) => (
    <button onClick={onClick}>{children}</button>
);

export default Button;
