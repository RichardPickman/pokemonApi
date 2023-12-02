import { UncontrolledForm } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UncontrolledForm = {
    name: '',
    age: '',
    email: '',
    password: '',
    repeatPassword: '',
    gender: null,
    accept: false,
    picture: null,
    country: '',
};

const formSlice = createSlice({
    name: 'uncontrolled-user',
    initialState: initialState,
    reducers: {
        setValue: (
            state,
            action: { payload: { key: keyof UncontrolledForm; value: unknown } }
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
