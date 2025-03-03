import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiUrl = process.env.REACT_APP_API_URL;
export const urlDev = process.env.REACT_APP_DEV_URL;
export const urlProd = process.env.REACT_APP_PROD_URL;

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: headers => {
      headers.set('Accept', 'application/json');

      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    'User',
    'Clients',
    'Client',
    'Request',
    'Requests',
    'Visit',
    'Visits',
    'RealtyVisits',
    'Realties',
    'Realty',
    'Agents',
    'AgentsAssistants',
    'AgentsAssistantsUser',
    'Countries',
    'Cities',
    'Districts',
    'Streets',
    'Residences',
    'SearchRealties',
    'Documents',
    'Photos',
    'Reminders',
    'RemindersCounters',
    'Emails',
  ],
});
