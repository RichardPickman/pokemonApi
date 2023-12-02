import { ChildrenReveal } from '@/components/ChildrenReveal';
import { ErrorParagraph } from '@/components/ErrorParagraph';
import { RadioInput } from '@/components/RadioInput';
import { User } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ColumnWrapper, InputWrapper } from '../uncontrolled-form/wrappers';
import { RootState } from '@/store/store';
import { InputRadio } from '@/shared/InputRadio';

const className =
    'color-white rounded border bg-transparent px-4 py-2 outline-none';

type FormState = User & { picture: FileList | null };

const Page = () => {
    const { register, handleSubmit, formState } = useForm<FormState>();

    const onSubmit: SubmitHandler<FormState> = (data) => {
        console.log(data);
    };

    return (
        <ChildrenReveal>
            <div className="mb-6 flex w-full max-w-2xl items-start justify-start p-4">
                <Link href={'/'}>
                    <button className="border-b px-4 py-2 text-xl">Home</button>
                </Link>
            </div>
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col gap-4">
                    <ColumnWrapper>
                        <InputWrapper>
                            <label htmlFor="name">Name</label>
                            <input
                                className={className}
                                type="text"
                                placeholder="John Doe"
                                {...(register('name'), { required: true })}
                            />
                            {!!formState.errors.name && (
                                <ErrorParagraph>
                                    {formState.errors.name.message}
                                </ErrorParagraph>
                            )}
                        </InputWrapper>
                        <InputWrapper>
                            <label htmlFor="email">Email</label>
                            <input
                                className={className}
                                {...(register('email'), { required: true })}
                                type="text"
                                placeholder="johndoe@mail.com"
                            />
                            {!!formState.errors.email && (
                                <ErrorParagraph>
                                    {formState.errors.email.message}
                                </ErrorParagraph>
                            )}
                        </InputWrapper>
                    </ColumnWrapper>
                    <ColumnWrapper>
                        <InputWrapper>
                            <label htmlFor="age">Age</label>
                            <input
                                {...(register('age'), { required: true })}
                                className={className}
                                type="number"
                                placeholder=""
                            />
                            {!!formState.errors.age && (
                                <ErrorParagraph>
                                    {formState.errors.age.message}
                                </ErrorParagraph>
                            )}
                        </InputWrapper>
                        <InputWrapper>
                            <label htmlFor="gender">Gender</label>
                            <div className="flex justify-around gap-1">
                                <div className="flex items-center gap-4">
                                    <InputRadio
                                        {...(register('gender'),
                                        { required: true })}
                                        name="gender"
                                        type="radio"
                                        value="male"
                                    />
                                    <label htmlFor="genderMale"></label>
                                </div>
                                <div className="flex items-center gap-4">
                                    <InputRadio
                                        {...(register('gender'),
                                        { required: true })}
                                        name="gender"
                                        type="radio"
                                        value="male"
                                    />
                                    <label htmlFor="genderMale"></label>
                                </div>
                            </div>
                        </InputWrapper>
                    </ColumnWrapper>
                    <ColumnWrapper>
                        <InputWrapper>
                            <label htmlFor="password">Password</label>
                            <input
                                {...(register('password'), { min: 6, max: 24 })}
                                className={className}
                                type="password"
                                placeholder=""
                            />
                            {!!formState.errors.password && (
                                <ErrorParagraph>
                                    {formState.errors.password.message}
                                </ErrorParagraph>
                            )}
                        </InputWrapper>
                        <InputWrapper>
                            <label htmlFor="repeatPassword">
                                Repeat password
                            </label>
                            <input
                                {...register('repeatPassword')}
                                className={className}
                                type="password"
                                placeholder=""
                            />
                            {!!formState.errors.repeatPassword && (
                                <ErrorParagraph>
                                    {formState.errors.repeatPassword.message}
                                </ErrorParagraph>
                            )}
                        </InputWrapper>
                    </ColumnWrapper>
                    <div className="relative flex w-full flex-col justify-between gap-2">
                        <div className="relative flex aspect-video w-full items-center justify-center rounded border-2 border-dashed">
                            <input
                                {...register('picture')}
                                accept="image/png, image/jpeg"
                                type="file"
                                className={[className, 'border-none'].join(' ')}
                            />
                        </div>
                        {!!formState.errors.picture && (
                            <ErrorParagraph>
                                {formState.errors.picture.message}
                            </ErrorParagraph>
                        )}
                    </div>
                    <ColumnWrapper>
                        <div className="flex gap-2">
                            <input
                                {...register('acceptTC')}
                                className={['h-6 w-6 rounded border'].join(' ')}
                                id="acceptTC"
                                type="checkbox"
                                placeholder=""
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
        </ChildrenReveal>
    );
};

export default Page;
