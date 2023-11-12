import { configureStore } from '@reduxjs/toolkit';
import { firestoreApi } from './firebaseApi';

export const store = configureStore({
    reducer: {
      [firestoreApi.reducerPath]: firestoreApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
          serializableCheck: false
        }).concat(firestoreApi.middleware);
    }
  });

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch