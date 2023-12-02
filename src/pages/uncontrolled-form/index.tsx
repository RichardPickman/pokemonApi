import { ChildrenReveal } from '@/components/ChildrenReveal';
import { addUser } from '@/store/slices/users';
import { userDTO, validateUser } from '@/utils/validate';
import { m } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, ReactNode, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '@/components/Form/Input';
import { InputRadio } from '@/components/Form/Radio';
import { ColumnWrapper, InputWrapper } from '@/components/Wrappers';

const ErrorParagraph = ({ children }: { children: ReactNode }) => (
    <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xs text-red-600"
    >
        {children}
    </m.p>
);

const Page = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const gender = useRef<'male' | 'female' | null>(null);
    const dispatch = useDispatch();
    const navigate = useRouter();
    const [errors, setErrors] = useState({
        nameError: '',
        emailError: '',
        ageError: '',
        passwordError: '',
        repeatPasswordError: '',
        fileErrors: '',
    });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const outputs = new FormData(formRef.current || undefined);

        const data = userDTO(outputs);

        const {
            isNameValid,
            isEmailValid,
            isAgeValid,
            isPasswordValid,
            isPassesValid,
            isFileValid,
        } = await validateUser(data);

        setErrors({
            nameError: !isNameValid ? 'Name is not  valid' : '',
            emailError: !isEmailValid ? 'Email is not  valid' : '',
            ageError: !isAgeValid ? 'Age is required!' : '',
            passwordError: !isPasswordValid ? 'Password is not valid' : '',
            repeatPasswordError: !isPassesValid
                ? 'Password is not the same'
                : '',
            fileErrors: !isFileValid ? 'File is too large' : '',
        });

        if (
            isNameValid &&
            isEmailValid &&
            isAgeValid &&
            isPasswordValid &&
            isPassesValid &&
            isFileValid
        ) {
            dispatch(addUser({ ...data }));

            navigate.push('/');
        }
    };

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
                <form
                    ref={formRef}
                    className="flex max-w-xl flex-col gap-4"
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-4">
                        <ColumnWrapper>
                            <Input
                                className="color-white rounded border bg-transparent px-4 py-2 outline-none"
                                label="Name"
                                name="name"
                                error={errors.nameError}
                            />
                            <Input
                                className="color-white rounded border bg-transparent px-4 py-2 outline-none"
                                label="Age"
                                name="age"
                                type="number"
                                error={errors.ageError}
                            />
                        </ColumnWrapper>
                        <ColumnWrapper>
                            <Input
                                className="color-white rounded border bg-transparent px-4 py-2 outline-none"
                                label="Email"
                                name="email"
                                error={errors.emailError}
                            />
                            <InputWrapper>
                                <label htmlFor="gender">Gender</label>
                                <div className="flex justify-around gap-1">
                                    <InputRadio
                                        className="color-white rounded border bg-transparent px-4 py-2 outline-none"
                                        label="M"
                                        name="gender"
                                        value="male"
                                    />
                                    <InputRadio
                                        className="color-white rounded border bg-transparent px-4 py-2 outline-none"
                                        label="F"
                                        name="gender"
                                        value="female"
                                    />
                                </div>
                            </InputWrapper>
                        </ColumnWrapper>
                        <ColumnWrapper>
                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                error={errors.passwordError}
                            />
                            <Input
                                label="Repeat password"
                                type="password"
                                name="repeatPassword"
                                error={errors.repeatPasswordError}
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
                                <ErrorParagraph>
                                    {errors.fileErrors}
                                </ErrorParagraph>
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
            </div>
        </ChildrenReveal>
    );
};

export default Page;
