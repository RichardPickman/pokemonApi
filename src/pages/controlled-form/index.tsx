import { ChildrenReveal } from '@/components/ChildrenReveal';
import { ErrorParagraph } from '@/components/ErrorParagraph';
import { Input } from '@/components/Form/Input';
import { InputRadio } from '@/components/Form/Radio';
import { ColumnWrapper, InputWrapper } from '@/components/Wrappers';
import { addUser } from '@/store/slices/users';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { bool, mixed, number, object, ref, string } from 'yup';

type FormState = {
    name: string;
    email: string;
    age: number;
    gender: string;
    password: string;
    repeatPassword: string;
    picture: FileList;
    acceptTC: NonNullable<boolean | undefined>;
};

const validationSchema = object({
    name: string()
        .required('name is required')
        .matches(/^[A-Z]/, 'User  should start with uppercase'),
    email: string().email().required('email is required'),
    age: number().max(120).positive().required('age is required'),
    gender: string().required('gender is required').oneOf(['male', 'female']),
    password: string()
        .min(6)
        .max(24)
        .required()
        .matches(
            /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])/,
            'Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character'
        ),
    repeatPassword: string()
        .required('Repeat password is required')
        .oneOf([ref('password')], 'Passwords must match!'),
    picture: mixed<FileList>()
        .required()
        .test(
            'fileSize',
            'The image size should not be more than 200MB',
            (files) => !!files[0] && files[0].size <= 200000
        )
        .test(
            'fileType',
            'Unsupported file type',
            (files) =>
                !!files[0] &&
                ['image/png', 'image/jpeg'].includes(files[0].type)
        )
        .required('Image is required'),
    acceptTC: bool().oneOf([true], 'You must agree to TC').required(),
});

const Page = () => {
    const dispatch = useDispatch();
    const navigate = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormState>({
        resolver: yupResolver(validationSchema),
    });

    const isSubmitAvailable = Object.keys(errors).length === 0;

    const onSubmit: SubmitHandler<FormState> = (data) => {
        if (isSubmitAvailable) {
            const img = data.picture[0];
            dispatch(addUser({ ...data, picture: img }));

            navigate.push('/');
        }
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
                <div className="flex max-w-2xl flex-col gap-4">
                    <ColumnWrapper>
                        <Input
                            className="color-white rounded border bg-transparent px-4 py-2 outline-none"
                            label="Name"
                            {...register('name')}
                            error={errors.name?.message}
                        />
                        <Input
                            className="color-white rounded border bg-transparent px-4 py-2 outline-none"
                            label="Age"
                            {...register('age')}
                            type="number"
                            error={errors.age?.message}
                        />
                    </ColumnWrapper>
                    <ColumnWrapper>
                        <Input
                            className="color-white rounded border bg-transparent px-4 py-2 outline-none"
                            label="Email"
                            {...register('email')}
                            error={errors.email?.message}
                        />
                        <InputWrapper>
                            <label htmlFor="gender">Gender</label>
                            <div className="flex justify-around gap-1">
                                <InputRadio
                                    className="color-white rounded border bg-transparent px-4 py-2 outline-none"
                                    label="M"
                                    {...register('gender')}
                                    value="male"
                                    checked
                                />
                                <InputRadio
                                    className="color-white rounded border bg-transparent px-4 py-2 outline-none"
                                    label="F"
                                    {...register('gender')}
                                    value="female"
                                />
                            </div>
                        </InputWrapper>
                    </ColumnWrapper>
                    <ColumnWrapper>
                        <Input
                            label="Password"
                            type="password"
                            {...register('password')}
                            error={errors.password?.message}
                        />
                        <Input
                            label="Repeat password"
                            type="password"
                            {...register('repeatPassword')}
                            error={errors.repeatPassword?.message}
                        />
                    </ColumnWrapper>
                    <div className="relative flex w-full flex-col justify-between gap-2">
                        <div className="relative flex aspect-video w-full items-center justify-center rounded border-2 border-dashed">
                            <input
                                accept="image/png, image/jpeg"
                                {...register('picture')}
                                type="file"
                            />
                        </div>
                        {!!errors.picture?.message && (
                            <ErrorParagraph>
                                {errors.picture?.message}
                            </ErrorParagraph>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2">
                            <input
                                {...register('acceptTC')}
                                type="checkbox"
                                className=" h-6 w-6 rounded border"
                            />
                            <label htmlFor="acceptTC">accept T&C</label>
                        </div>
                        {!!errors.acceptTC?.message && (
                            <ErrorParagraph>
                                {errors.acceptTC?.message}
                            </ErrorParagraph>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="rounded border bg-slate-800 px-2 py-1 disabled:opacity-80"
                        disabled={!isSubmitAvailable}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </ChildrenReveal>
    );
};

export default Page;
