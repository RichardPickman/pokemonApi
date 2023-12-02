import {
    ColumnWrapper,
    InputWrapper,
} from '@/pages/uncontrolled-form/wrappers';
import { InputRadio } from '@/shared/InputRadio';
import { ErrorParagraph } from './ErrorParagraph';
import { FormEvent, useRef } from 'react';
import { Input } from './Input';
import { RadioInput } from './RadioInput';

export const Form = ({
    handleSubmit,
    errors,
}: {
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    errors: { [k: string]: string };
}) => {
    const gender = useRef<'male' | 'female' | null>(null);

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                <ColumnWrapper>
                    <Input error={errors.nameError} label="Name" name="name" />
                    <Input
                        error={errors.ageError}
                        label="Age"
                        type="number"
                        name="age"
                    />
                </ColumnWrapper>
                <ColumnWrapper>
                    <Input
                        error={errors.emailError}
                        label="Email"
                        name="email"
                    />
                    <InputWrapper>
                        <label htmlFor="gender">Gender</label>
                        <div className="flex justify-around gap-1">
                            <RadioInput
                                checked={gender.current === 'male'}
                                label="M"
                                onClick={() => (gender.current = 'male')}
                            />
                            <RadioInput
                                checked={gender.current === 'male'}
                                label="M"
                                onClick={() => (gender.current = 'female')}
                            />
                        </div>
                    </InputWrapper>
                </ColumnWrapper>
                <ColumnWrapper>
                    <Input
                        error={errors.passwordError}
                        label="Password"
                        name="password"
                        type="password"
                    />
                    <Input
                        error={errors.repeatPasswordError}
                        label="Repeat password"
                        name="password"
                        type="password"
                    />
                </ColumnWrapper>
                <div className="relative flex w-full flex-col justify-between gap-2">
                    <div className="relative flex aspect-video w-full items-center justify-center rounded border-2 border-dashed">
                        <input
                            accept="image/png, image/jpeg"
                            name="picture"
                            type="file"
                        />
                    </div>
                    {!!errors.fileErrors && (
                        <ErrorParagraph>{errors.fileErrors}</ErrorParagraph>
                    )}
                </div>
                <ColumnWrapper>
                    <div className="flex gap-2">
                        <input
                            id="acceptTC"
                            name="acceptTC"
                            type="checkbox"
                            className=" h-6 w-6 rounded border"
                        />
                        <label htmlFor="acceptTC">accept T&C</label>
                    </div>
                </ColumnWrapper>
                <button
                    type="submit"
                    className="rounded border bg-slate-800 px-2 py-1 disabled:opacity-80"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};
