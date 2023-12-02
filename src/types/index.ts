export interface User {
    name: string;
    age: string;
    email: string;
    password: string;
    repeatPassword: string;
    gender: 'male' | 'female' | null;
    acceptTC: boolean;
    picture: File | null;
}
