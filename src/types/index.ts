export interface UncontrolledForm {
    name: string;
    age: string;
    email: string;
    password: string;
    repeatPassword: string;
    gender: 'male' | 'female' | null;
    accept: boolean;
    picture: File | null;
    country: string;
}
