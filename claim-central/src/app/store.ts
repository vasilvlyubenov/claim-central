import { configureStore } from '@reduxjs/toolkit';
import { firebaseApi } from './firebaseApi';
import userSlice from '../features/user/userSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
    reducer: {
      [firebaseApi.reducerPath]: firebaseApi.reducer,
      user: userSlice
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
          serializableCheck: false
        }).concat(firebaseApi.middleware);
    }
  });

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch);