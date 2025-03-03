import { api } from '../api';
import { links } from '../../../data/links';

export const visitsApi = api.injectEndpoints({
  endpoints: build => ({
    getVisits: build.query({
      query: token => ({
        url: links.visits,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const visitsData = responseData?.data;

        if (visitsData) {
          return visitsData;
        } else {
          return [];
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Visits', id })),
            { type: 'Visits', id: 'LIST' },
          ]
          : [{ type: 'Visits', id: 'LIST' }],
    }),
    getRealtyVisits: build.query({
      query: ({ token, id }) => ({
        url: `${links.realty}/${id}/visits`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const visitsData = responseData?.data?.visits;

        if (visitsData) {
          return visitsData;
        } else {
          return [];
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'RealtyVisits', id })),
            { type: 'RealtyVisits', id: 'LIST' },
          ]
          : [{ type: 'RealtyVisits', id: 'LIST' }],
    }),
    getVisit: build.query({
      query: ({ token, id }) => ({
        url: `${links.visits}/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const visitData = responseData?.data;

        if (visitData) {
          return visitData;
        } else {
          return [];
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Visits', id })),
            { type: 'Visits', id: 'LIST' },
          ]
          : [{ type: 'Visits', id: 'LIST' }],
    }),
    addVisit: build.mutation({
      query({ token, realty_id, data }) {
        return {
          url: `${links.visits}/${realty_id}`,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) => !error ? [{ type: 'Visits', id: 'LIST' }, { type: 'RealtyVisits', id: 'LIST' }] : [],
    }),
    updateVisit: build.mutation({
      query({ token, id, data }) {
        return {
          url: `${links.visits}/${id}`,
          method: 'PUT',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) => !error ? [{ type: 'Visits', id }, { type: 'RealtyVisits', id }] : [],
    }),
    deleteVisit: build.mutation({
      query({ token, id }) {
        return {
          url: `${links.visits}/${id}`,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, arg) => !error ? [{ type: 'Visits', id: 'LIST' }, { type: 'RealtyVisits', id: 'LIST' }] : [],
    }),
  }),
});

export const {
  useGetVisitsQuery,
  useGetRealtyVisitsQuery,
  useGetVisitQuery,
  useAddVisitMutation,
  useUpdateVisitMutation,
  useDeleteVisitMutation,
} = visitsApi;
