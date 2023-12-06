import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}
export const InputRadio = forwardRef<HTMLInputElement, InputProps>(
    ({ label, ...props }, ref) => (
        <div className="flex items-center justify-center gap-2">
            <div
                onClick={props.onClick}
                className="relative h-8 w-16 cursor-pointer rounded-full"
            >
                <div className="absolute h-full w-full rounded-full bg-neutral-600 shadow-inner checked:bg-neutral-400" />
                <input
                    ref={ref}
                    type="radio"
                    {...props}
                    className="absolute left-0 h-8 w-8 cursor-pointer appearance-none rounded-full bg-neutral-300 outline-1 transition-all checked:left-8"
                />
            </div>
            <label htmlFor={props.id}>{label}</label>
        </div>
    )
);

InputRadio.displayName = 'Input';
