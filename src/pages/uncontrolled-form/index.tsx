import { ChildrenReveal } from '@/components/ChildrenReveal';
import { InputRadio } from '@/shared/InputRadio';
import { setValue } from '@/store/slices/controlled';
import { RootState } from '@/store/store';
import { UncontrolledForm } from '@/types';
import { validateEmail, validatePassword } from '@/utils';
import { m } from 'framer-motion';
import Link from 'next/link';
import { ChangeEvent, FormEvent, ReactNode, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ColumnWrapper = ({ children }: { children: ReactNode }) => (
    <div className="grid grid-cols-2 items-start justify-center gap-2">
        {children}
    </div>
);

const InputWrapper = ({ children }: { children: ReactNode }) => (
    <div className="flex flex-col gap-1">{children}</div>
);

const ErrorParagraph = ({ children }: { children: ReactNode }) => (
    <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xs text-red-600"
    >
        {children}
    </m.p>
);

const validate = (uncontrolled: RootState['uncontrolled']) => ({
    isPassValid: validatePassword(uncontrolled.password),
    isPassesSame: uncontrolled.repeatPassword === uncontrolled.password,
    isEmailValid: validateEmail(uncontrolled.email),
});

const Page = () => {
    const uncontrolled = useSelector((state: RootState) => state.uncontrolled);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({
        passwordError: '',
        repeatPasswordError: '',
        emailError: '',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        const key = id as keyof UncontrolledForm;

        dispatch(setValue({ key, value }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { isPassValid, isPassesSame, isEmailValid } =
            validate(uncontrolled);

        setErrors({
            passwordError: !isPassValid ? 'Password is not valid' : '',
            repeatPasswordError: !isPassesSame
                ? 'Password is not the same'
                : '',
            emailError: !isEmailValid ? 'Email is not  valid' : '',
        });

        if (isPassValid && isPassesSame && isEmailValid) {
            alert(`Your data: ${JSON.stringify(uncontrolled)}`);
        }
    };

    const handleAccept = () => <div></div>;

    const inputClassName =
        'color-white rounded border bg-transparent px-4 py-2 outline-none';

    return (
        <ChildrenReveal>
            <div className="flex h-auto w-screen flex-col items-center justify-center">
                <div className="mb-6 flex w-full max-w-2xl items-start justify-start p-4">
                    <Link href={'/'}>
                        <button className="border-b px-4 py-2 text-xl">
                            Home
                        </button>
                    </Link>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <ColumnWrapper>
                            <InputWrapper>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    className={inputClassName}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    value={uncontrolled.name}
                                />
                            </InputWrapper>
                            <InputWrapper>
                                <label htmlFor="name">Email</label>
                                <input
                                    id="email"
                                    className={inputClassName}
                                    onChange={handleChange}
                                    value={uncontrolled.email}
                                    placeholder="johndoe@mail.com"
                                />
                                {!!errors.emailError && (
                                    <ErrorParagraph>
                                        Email is not valid
                                    </ErrorParagraph>
                                )}
                            </InputWrapper>
                        </ColumnWrapper>
                        <ColumnWrapper>
                            <InputWrapper>
                                <label htmlFor="age">Age</label>
                                <input
                                    id="age"
                                    type="number"
                                    className={inputClassName}
                                    onChange={handleChange}
                                    value={uncontrolled.age}
                                />
                            </InputWrapper>
                            <InputWrapper>
                                <label>Gender</label>
                                <div className="flex justify-around gap-1">
                                    <div className="flex items-center gap-4">
                                        <InputRadio
                                            isChecked={
                                                uncontrolled.gender === 'male'
                                            }
                                            onClick={() =>
                                                dispatch(
                                                    setValue({
                                                        key: 'gender',
                                                        value: 'male',
                                                    })
                                                )
                                            }
                                        />
                                        <label htmlFor="genderMale">M</label>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <InputRadio
                                            isChecked={
                                                uncontrolled.gender === 'female'
                                            }
                                            onClick={() =>
                                                dispatch(
                                                    setValue({
                                                        key: 'gender',
                                                        value: 'female',
                                                    })
                                                )
                                            }
                                        />
                                        <label htmlFor="genderFemale">F</label>
                                    </div>
                                </div>
                                <div></div>
                            </InputWrapper>
                        </ColumnWrapper>
                        <ColumnWrapper>
                            <InputWrapper>
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    className={inputClassName}
                                    onChange={handleChange}
                                    value={uncontrolled.password}
                                />
                                {!!errors.passwordError && (
                                    <ErrorParagraph>
                                        Password is not valid
                                    </ErrorParagraph>
                                )}
                            </InputWrapper>
                            <InputWrapper>
                                <label htmlFor="repeatPassword">
                                    Repeat password
                                </label>
                                <input
                                    id="repeatPassword"
                                    className={inputClassName}
                                    onChange={handleChange}
                                    type="password"
                                />
                                {!!errors.repeatPasswordError && (
                                    <ErrorParagraph>
                                        Password is not the same
                                    </ErrorParagraph>
                                )}
                            </InputWrapper>
                        </ColumnWrapper>
                        <div className="relative flex w-full justify-between">
                            {uncontrolled.picture ? (
                                <div className="relative h-full w-full">
                                    <p>{uncontrolled.picture.name}</p>
                                    <div
                                        className="z-3 absolute right-2 top-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded border bg-slate-600"
                                        onClick={() =>
                                            dispatch(
                                                setValue({
                                                    key: 'picture',
                                                    value: null,
                                                })
                                            )
                                        }
                                    >
                                        X
                                    </div>
                                </div>
                            ) : (
                                <div className="relative flex aspect-video w-full items-center justify-center rounded border-2 border-dashed">
                                    <input
                                        id="picture"
                                        type="file"
                                        className="absolute h-full w-full opacity-0"
                                        onChange={(event) =>
                                            dispatch(
                                                setValue({
                                                    key: 'picture',
                                                    value: event.target.files
                                                        ? event.target.files[0]
                                                        : null,
                                                })
                                            )
                                        }
                                    />
                                    <p>Click me!</p>
                                </div>
                            )}
                        </div>
                        <ColumnWrapper>
                            <div className="flex gap-2">
                                <input
                                    id="accept"
                                    type="checkbox"
                                    className="relative h-6 w-6 appearance-none rounded border bg-neutral-700"
                                    onChange={handleChange}
                                    checked={uncontrolled.accept}
                                />
                                {uncontrolled.accept && (
                                    <div className="absolute h-5 w-5">x</div>
                                )}
                                <label htmlFor="accept">accept T&C</label>
                                {!!errors.passwordError && (
                                    <ErrorParagraph>
                                        Password is not valid
                                    </ErrorParagraph>
                                )}
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
            </div>
        </ChildrenReveal>
    );
};

export default Page;
