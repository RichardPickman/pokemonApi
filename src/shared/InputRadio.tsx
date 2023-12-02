import { InputHTMLAttributes, MutableRefObject, useRef } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
    id?: string;
    onClick?: () => void;
    name?: string;
    checked?: boolean;
};

export const InputRadio = ({ name, value, id, onClick }: Props) => {
    const ref = useRef<HTMLInputElement>(null);

    return (
        <div
            onClick={onClick}
            className="relative h-8 w-16 cursor-pointer rounded-full"
        >
            <label
                htmlFor={id}
                className="absolute h-full w-full rounded-full bg-neutral-600 shadow-inner checked:bg-neutral-400"
            />
            <input
                id={id}
                ref={ref}
                name={name}
                type="radio"
                value={value}
                onClick={onClick}
                className="absolute left-0 h-8 w-8 cursor-pointer appearance-none rounded-full bg-neutral-300 outline-1 transition-all checked:left-8"
            />
        </div>
    );
};
