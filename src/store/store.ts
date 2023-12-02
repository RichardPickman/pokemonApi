import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/controlled';

export const store = configureStore({
    reducer: {
        uncontrolled: formReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
