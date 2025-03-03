import { api } from '../api';
import { links } from '../../../data/links';
import { dataTypes } from '../../../data/constants';
import { changePropertyName } from '../../../utils/data';
import { setStreetsNumbers } from '../../features/dashboard/dashboardSlice';

export const streetsNumberApi = api.injectEndpoints({
  endpoints: build => ({
    getStreetsNumber: build.query({
      query: () => ({
        url: links.streetsNumber,
      }),
      transformResponse: responseData => {
        const streetsNumberData = responseData?.data;

        if (streetsNumberData) {
          const newStreets = changePropertyName(streetsNumberData, dataTypes.streets);

          return newStreets;
        } else {
          return [];
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'StreetsNumber', id })),
            { type: 'StreetsNumber', id: 'LIST' },
          ]
          : [{ type: 'StreetsNumber', id: 'LIST' }],
    }),
    getStreetsNumberForStreet: build.query({
      query: ({ token, street_id, isSettingRedux }) => ({
        url: `${links.streets}/${street_id}/numbers`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const streetsNumberData = responseData?.data;

        if (streetsNumberData) {
          const newStreets = changePropertyName(streetsNumberData, dataTypes.streets);

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
          dispatch(setStreetsNumbers.pending());
  
          try {
            const { data } = await queryFulfilled;
  
            dispatch(setStreetsNumbers.fulfilled(data));
          } catch (e) {
            dispatch(setStreetsNumbers.rejected(e));
          }
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'StreetsNumber', id })),
            { type: 'StreetsNumber', id: 'CITY' },
          ]
          : [{ type: 'StreetsNumber', id: 'CITY' }],
    }),
    getStreetNumber: build.query({
      query: ({ token, id }) => ({
        url: `${links.streetsNumber}/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const streetsNumberData = responseData?.data;

        if (streetsNumberData?.street_number) {
          return streetsNumberData.street_number;
        } else {
          return {};
        }
      },
      providesTags: (result, error, id) => [{ type: 'StreetsNumber', id: 'ITEM' }],
    }),
    addStreetNumber: build.mutation({
      query({ token, data }) {
        return {
          url: links.streetsNumber,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'StreetsNumber', id: 'LIST' },
            { type: 'StreetsNumber', id: 'CITY' },
          ]
          : '',
    }),
    updateStreetNumber: build.mutation({
      query({ token, id, data }) {
        return {
          url: `${links.streetsNumber}/${id}`,
          method: 'PUT',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'StreetsNumber', id: 'LIST' },
            { type: 'StreetsNumber', id: 'CITY' },
          ]
          : '',
    }),
    deleteStreetNumber: build.mutation({
      query({ token, id }) {
        return {
          url: `${links.streetsNumber}/${id}`,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'StreetsNumber', id: 'LIST' },
            { type: 'StreetsNumber', id: 'CITY' },
          ]
          : '',
    }),
  }),
});

export const {
  useGetStreetsNumberQuery,
  useGetStreetsNumberForStreetQuery,
  useGetStreetNumberQuery,
  useAddStreetNumberMutation,
  useUpdateStreetNumberMutation,
  useDeleteStreetNumberMutation,
} = streetsNumberApi;
