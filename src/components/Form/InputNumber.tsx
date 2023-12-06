import { InputHTMLAttributes, forwardRef } from 'react';
import { ErrorParagraph } from '../ErrorParagraph';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error: string;
}

const className =
    'color-white rounded border bg-transparent px-4 py-2 outline-none';

export const InputText = forwardRef<HTMLInputElement, InputProps>(
    ({ label, ...props }, ref) => (
        <>
            <label
                htmlFor={props.id}
                className="absolute h-full w-full rounded-full bg-neutral-600 shadow-inner checked:bg-neutral-400"
            >
                {label}
            </label>
            <input ref={ref} className={className} {...props} />
            {!!props.error && <ErrorParagraph>{props.error}</ErrorParagraph>}
        </>
    )
);

InputText.displayName = 'InputText';
