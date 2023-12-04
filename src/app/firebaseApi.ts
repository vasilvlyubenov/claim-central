import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const firebaseApi = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ['User', 'Claim'],
  endpoints: () => ({}),
});