import { InputWrapper } from '@/pages/uncontrolled-form/wrappers';
import { InputHTMLAttributes } from 'react';
import { ErrorParagraph } from './ErrorParagraph';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error: string;
    name: string;
};

const className =
    'color-white rounded border bg-transparent px-4 py-2 outline-none';

export const Input = (props: InputProps) => (
    <InputWrapper>
        <label htmlFor={props.name}>{props.label}</label>
        <input
            className={className}
            name={props.name}
            type={props.type || 'text'}
            placeholder="John Doe"
        />
        {!!props.error && <ErrorParagraph>{props.error}</ErrorParagraph>}
    </InputWrapper>
);
