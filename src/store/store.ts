import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/controlled';
import usersReducer from './slices/users';

export const store = configureStore({
    reducer: {
        uncontrolled: formReducer,
        users: usersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
