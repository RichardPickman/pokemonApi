import { User } from '@/types';
import { mixed, number, string, ref } from 'yup';

const name = string().uppercase().required();
const email = string().email().required();
const age = number().positive().required();
const password = string().min(8).max(24);
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

export const validateUser = async (user: User) => {
    return {
        isNameValid: await name.isValid(user.name),
        isEmailValid: await email.isValid(user.email),
        isAgeValid: await age.isValid(user.age),
        isPasswordValid: await password.isValid(user.password),
        isPassesValid: user.password === user.repeatPassword,
        isFileValid: await picture.isValid(user.picture),
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
});
