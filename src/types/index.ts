export interface User {
    name: string;
    age: number;
    email: string;
    password: string;
    repeatPassword: string;
    gender: 'male' | 'female' | null;
    acceptTC: boolean;
    picture: File | null;
}
