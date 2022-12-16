import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import exampleCounter from '../features/example/exampleSlice';

export const store = configureStore({
  reducer: {
    example: exampleCounter,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
