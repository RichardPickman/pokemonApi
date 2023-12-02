import { User } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: User = {
    name: '',
    age: '',
    email: '',
    password: '',
    repeatPassword: '',
    gender: null,
    acceptTC: false,
    picture: null,
};

const formSlice = createSlice({
    name: 'uncontrolled-user',
    initialState: initialState,
    reducers: {
        setValue: (
            state,
            action: { payload: { key: keyof User; value: unknown } }
        ) => {
            const key = action.payload.key;
            const value = action.payload.value;

            return {
                ...state,
                [key]: value,
            };
        },
    },
});

export const { setValue } = formSlice.actions;

export default formSlice.reducer;
