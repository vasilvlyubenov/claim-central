import { configureStore } from '@reduxjs/toolkit';
import { firestoreApi } from './firebaseApi';
import userSlice from '../features/user/userSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
    reducer: {
      [firestoreApi.reducerPath]: firestoreApi.reducer,
      user: userSlice
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
          serializableCheck: false
        }).concat(firestoreApi.middleware);
    }
  });

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch);