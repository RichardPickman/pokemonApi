import { ChildrenReveal } from '@/components/ChildrenReveal';
import { setValue } from '@/store/slices/controlled';
import { RootState } from '@/store/store';
import { UncontrolledForm } from '@/types';
import { validateEmail, validatePassword } from '@/utils';
import { m } from 'framer-motion';
import { ChangeEvent, FormEvent, ReactNode, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ColumnWrapper = ({ children }: { children: ReactNode }) => (
    <div className="grid grid-cols-2 items-center justify-center gap-2">
        {children}
    </div>
);

const InputWrapper = ({ children }: { children: ReactNode }) => (
    <div className="grid grid-rows-3 flex-col gap-1">{children}</div>
);

const ErrorParagraph = ({ children }: { children: ReactNode }) => (
    <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-red-600"
    >
        {children}
    </m.p>
);

const Page = () => {
    const uncontrolled = useSelector((state: RootState) => state.uncontrolled);

    const dispatch = useDispatch();
    const [errors, setErrors] = useState({
        passwordError: '',
        repeatPasswordError: '',
        emailError: '',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const key = event.target.id as keyof UncontrolledForm;
        const value = event.target.value;

        dispatch(setValue({ key, value }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isPassValid = validatePassword(uncontrolled.password);
        const isPassesSame =
            uncontrolled.repeatPassword === uncontrolled.password;
        const isEmailValid = validateEmail(uncontrolled.email);

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

    const inputClassName =
        'color-white rounded border bg-transparent px-4 py-2 outline-none';

    return (
        <ChildrenReveal>
            <div className="flex h-screen w-screen items-center justify-center">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
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
                                <label htmlFor="gender">Gender</label>
                                <div
                                    id="gender"
                                    className="flex justify-between gap-1"
                                >
                                    <div className="flex gap-4">
                                        <input
                                            id="genderMale"
                                            className="w-4"
                                            type="radio"
                                            onChange={() =>
                                                dispatch(
                                                    setValue({
                                                        key: 'gender',
                                                        value: 'male',
                                                    })
                                                )
                                            }
                                            checked={
                                                uncontrolled.gender === 'male'
                                            }
                                        />
                                        <label htmlFor="genderMale">Male</label>
                                    </div>
                                    <div className="flex gap-4">
                                        <input
                                            id="genderFemale"
                                            className="w-4"
                                            type="radio"
                                            onChange={() =>
                                                dispatch(
                                                    setValue({
                                                        key: 'gender',
                                                        value: 'female',
                                                    })
                                                )
                                            }
                                            checked={
                                                uncontrolled.gender === 'female'
                                            }
                                        />
                                        <label htmlFor="genderFemale">
                                            Female
                                        </label>
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
                        <button
                            type="submit"
                            className="mt-12 rounded border bg-slate-800 px-2 py-1 disabled:opacity-80"
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
