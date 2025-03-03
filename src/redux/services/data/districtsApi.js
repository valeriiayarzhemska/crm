import { api } from '../api';
import { links } from '../../../data/links';
import { changePropertyName } from '../../../utils/data';
import { dataTypes } from '../../../data/constants';
import { setDistricts } from '../../features/dashboard/dashboardSlice';

export const districtsApi = api.injectEndpoints({
  endpoints: build => ({
    getDistricts: build.query({
      query: () => ({
        url: links.districts,
      }),
      transformResponse: responseData => {
        const districtsData = responseData?.data;

        if (districtsData) {
          const newDistrictsData = changePropertyName(districtsData, dataTypes.districts);

          return newDistrictsData;
        } else {
          return [];
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Districts', id })),
            { type: 'Districts', id: 'LIST' },
          ]
          : [{ type: 'Districts', id: 'LIST' }],
    }),
    getDistrictsForCity: build.query({
      query: ({ token, city_id, isSettingRedux }) => ({
        url: `${links.cities}/${city_id}/districts`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const districtsData = responseData?.data;

        if (districtsData) {
          const newDistrictsData = changePropertyName(districtsData, dataTypes.districts);

          return newDistrictsData;
        } else {
          return [];
        }
      },
      async onQueryStarted(
        arg,
        { dispatch, queryFulfilled }
      ) {
        if (arg.isSettingRedux) {
          dispatch(setDistricts.pending());
  
          try {
            const { data } = await queryFulfilled;
  
            dispatch(setDistricts.fulfilled(data));
          } catch (e) {
            dispatch(setDistricts.rejected(e));
          }
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Districts', id })),
            { type: 'Districts', id: 'CITY' },
          ]
          : [{ type: 'Districts', id: 'CITY' }],
    }),
    getDistrict: build.query({
      query: ({ token, id }) => ({
        url: `${links.districts}/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const districtsData = responseData?.data;

        if (districtsData?.district) {
          return districtsData.district;
        } else {
          return {};
        }
      },
      providesTags: (result, error, id) => [{ type: 'Districts', id: 'ITEM' }],
    }),
    addDistrict: build.mutation({
      query({ token, data }) {
        return {
          url: links.districts,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Districts', id: 'LIST' },
            { type: 'Districts', id: 'CITY' },
          ]
          : '',
    }),
    updateDistrict: build.mutation({
      query({ token, id, data }) {
        return {
          url: `${links.districts}/${id}`,
          method: 'PUT',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Districts', id: 'LIST' },
            { type: 'Districts', id: 'CITY' },
          ]
          : '',
    }),
    deleteDistrict: build.mutation({
      query({ token, id }) {
        return {
          url: `${links.districts}/${id}`,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Districts', id: 'LIST' },
            { type: 'Districts', id: 'CITY' },
          ]
          : '',
    }),
  }),
});

export const {
  useGetDistrictsQuery,
  useGetDistrictsForCityQuery,
  useGetDistrictQuery,
  useAddDistrictMutation,
  useUpdateDistrictMutation,
  useDeleteDistrictMutation,
} = districtsApi;
