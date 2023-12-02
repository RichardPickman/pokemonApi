import { User } from '@/types';
import { number, string } from 'yup';

export const validateUser = async (user: User) => {
    const name = string().uppercase().required();
    const email = string().email().required();
    const age = number().positive().required();
    const password = string().min(8).max(24);
    const repeatPassword = string().equals([user.repeatPassword]);
    const picture = user.picture as File;
    const isFileValid = picture.size < 200000;

    return {
        isNameValid: await name.isValid(user.name),
        isEmailValid: await email.isValid(user.email),
        isAgeValid: await age.isValid(user.age),
        isPasswordValid: await password.isValid(user.password),
        isPassesValid: await repeatPassword.isValid(user.repeatPassword),
        isFileValid,
    };
};

export const userDTO = (data: FormData) => ({
    name: data.get('name') as string,
    email: data.get('email') as string,
    age: data.get('age') as string,
    gender: data.get('gender') as 'male' | 'female' | null,
    acceptTC: !!data.get('acceptTC') as boolean,
    password: data.get('password') as string,
    repeatPassword: data.get('repeatPassword') as string,
    picture: data.get('picture') as File,
});
