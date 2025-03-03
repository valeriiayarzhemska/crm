import { createSelector } from '@reduxjs/toolkit';
import { api } from '../api';
import { links } from '../../../data/links';
import { dataTypes } from '../../../data/constants';
import { changePropertyName } from '../../../utils/data';
import { setStreets, setStreetsSearch } from '../../features/dashboard/dashboardSlice';

export const streetsApi = api.injectEndpoints({
  endpoints: build => ({
    getStreets: build.query({
      query: () => ({
        url: links.streets,
      }),
      transformResponse: responseData => {
        const streetsData = responseData?.data;

        if (streetsData) {
          const newStreets = changePropertyName(streetsData, dataTypes.streets);

          return newStreets;
        } else {
          return [];
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Streets', id })),
            { type: 'Streets', id: 'LIST' },
          ]
          : [{ type: 'Streets', id: 'LIST' }],
    }),
    getStreetsForCity: build.query({
      query: ({ token, city_id, isSettingRedux }) => ({
        url: `${links.cities}/${city_id}/streets`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const streetsData = responseData?.data;

        if (streetsData) {
          const newStreets = changePropertyName(streetsData, dataTypes.streets);

          return newStreets;
        } else {
          return [];
        }
      },
      async onQueryStarted(
        arg,
        { dispatch, queryFulfilled }
      ) {
        if (arg.isSettingRedux) {
          dispatch(setStreets.pending());
  
          try {
            const { data } = await queryFulfilled;
  
            dispatch(setStreets.fulfilled(data));
          } catch (e) {
            dispatch(setStreets.rejected(e));
          }
        }

        if (arg.isCityArray) {
          dispatch(setStreetsSearch.pending());
  
          try {
            const { data } = await queryFulfilled;
  
            await dispatch(setStreetsSearch.fulfilled(data));
          } catch (e) {
            dispatch(setStreetsSearch.rejected(e));
          }
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Streets', id })),
            { type: 'Streets', id: 'CITY' },
          ]
          : [{ type: 'Streets', id: 'CITY' }],
    }),
    getStreet: build.query({
      query: ({ token, id }) => ({
        url: `${links.streets}/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const streetsData = responseData?.data;

        if (streetsData?.street) {
          return streetsData.street;
        } else {
          return {};
        }
      },
      providesTags: (result, error, id) => [{ type: 'Streets', id: 'ITEM' }],
    }),
    addStreet: build.mutation({
      query({ token, data }) {
        return {
          url: links.streets,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Streets', id: 'LIST' },
            { type: 'Streets', id: 'CITY' },
          ]
          : '',
    }),
    updateStreet: build.mutation({
      query({ token, id, data }) {
        return {
          url: `${links.streets}/${id}`,
          method: 'PUT',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Streets', id: 'LIST' },
            { type: 'Streets', id: 'CITY' },
          ]
          : '',
    }),
    deleteStreet: build.mutation({
      query({ token, id }) {
        return {
          url: `${links.streets}/${id}`,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Streets', id: 'LIST' },
            { type: 'Streets', id: 'CITY' },
          ]
          : '',
    }),
  }),
});

export const {
  useGetStreetsQuery,
  useGetStreetsForCityQuery,
  useGetStreetQuery,
  useAddStreetMutation,
  useUpdateStreetMutation,
  useDeleteStreetMutation,
} = streetsApi;
