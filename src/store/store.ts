import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/users';
import countriesReducer from './slices/countries';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        countries: countriesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
