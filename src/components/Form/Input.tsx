import { InputHTMLAttributes, forwardRef } from 'react';
import { ErrorParagraph } from '../ErrorParagraph';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const className =
    'color-white rounded border bg-transparent px-4 py-2 outline-none';

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, ...props }, ref) => (
        <div className="flex flex-col gap-1 overflow-hidden">
            <label htmlFor={props.id}>{label}</label>
            <input ref={ref} className={className} {...props} />
            {!!props.error && <ErrorParagraph>{props.error}</ErrorParagraph>}
        </div>
    )
);

Input.displayName = 'Input';
