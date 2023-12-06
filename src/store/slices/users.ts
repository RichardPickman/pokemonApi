import { User } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: { users: User[] } = {
    users: [],
};

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        addUser: (state, action) => {
            const payload = action.payload;

            return {
                users: [...state.users, payload],
            };
        },
    },
});

export const { addUser } = usersSlice.actions;

export default usersSlice.reducer;
