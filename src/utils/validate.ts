import { countries } from '@/constants/countries';
import {
    ACCEPT_TC_ERROR,
    AGE_ERROR,
    EMAIL_ERROR,
    NAME_ERROR,
    PASSWORD_ERROR,
} from '@/constants/errors';
import { User } from '@/types';
import { mixed, number, string, ref, object, bool } from 'yup';

const name = string()
    .required('name is required')
    .matches(/^[A-Z]/, NAME_ERROR);
const email = string().email().required(EMAIL_ERROR);
const age = number().max(120).positive().required(AGE_ERROR);
const password = string()
    .min(6)
    .max(24)
    .required()
    .matches(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])/,
        PASSWORD_ERROR
    );
const picture = mixed<File>()
    .test(
        'fileSize',
        'The image size should not be more than 5MB',
        (file) => !file || file.size <= 200000 // 200 MB in bytes
    )
    .test(
        'fileType',
        'Unsupported file type',
        (file) => !!file && ['image/png', 'image/jpeg'].includes(file.type)
    )
    .required('Image is required');

const acceptTC = bool().oneOf([true], ACCEPT_TC_ERROR).required();
const country = string().oneOf(countries).default('None');

export const validationSchema = object({
    name: name,
    email: email,
    age: age,
    gender: string().required('gender is required').oneOf(['male', 'female']),
    password: password,
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
    acceptTC: acceptTC,
    country: country,
});
export const validateUser = async (user: User) => {
    return {
        isNameValid: await name.isValid(user.name),
        isEmailValid: await email.isValid(user.email),
        isAgeValid: await age.isValid(user.age),
        isPasswordValid: await password.isValid(user.password),
        isPassesValid: user.password === user.repeatPassword,
        isFileValid: await picture.isValid(user.picture),
        isAcceptValid: await acceptTC.isValid(user.acceptTC),
    };
};

export const userDTO = (data: FormData) => ({
    name: data.get('name') as string,
    email: data.get('email') as string,
    age: Number(data.get('age')),
    gender: data.get('gender') as 'male' | 'female' | null,
    acceptTC: !!data.get('acceptTC') as boolean,
    password: data.get('password') as string,
    repeatPassword: data.get('repeatPassword') as string,
    picture: data.get('picture') as File,
    country: data.get('country') as (typeof countries)[number],
});
