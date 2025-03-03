import { configureStore } from '@reduxjs/toolkit';
import { api } from './services/api';

import userSlice from './features/user/userSlice';
import dashboardSlice from './features/dashboard/dashboardSlice';
import clientsSlice from './features/clients/clientsSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userSlice,
    dashboard: dashboardSlice,
    clients: clientsSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});
