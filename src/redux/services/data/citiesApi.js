import { api } from '../api';
import { links } from '../../../data/links';
import { changePropertyName, findCityByCountry } from '../../../utils/data';
import { dataTypes } from '../../../data/constants';
import { setCities, setSelectCities } from '../../features/dashboard/dashboardSlice';

export const citiesApi = api.injectEndpoints({
  endpoints: build => ({
    getCities: build.query({
      query: ({ country_id, isSettingRedux }) => ({
        url: `${links.auth}/cities`,
      }),
      transformResponse: (responseData, meta, arg) => {
        const citiesData = responseData?.data;

        if (citiesData) {
          let newCities = [];

          if (arg?.country_id) {
            newCities = findCityByCountry(citiesData, arg.country_id);
          } else {
            newCities = changePropertyName(citiesData, dataTypes.cities);
          }
          
          return newCities;
        } else {
          return [];
        }
      },
      async onQueryStarted(
        arg,
        { dispatch, queryFulfilled }
      ) {
        if (arg.isSettingRedux) {
          dispatch(setSelectCities.pending());
  
          try {
            const { data } = await queryFulfilled;
  
            dispatch(setSelectCities.fulfilled(data));
          } catch (e) {
            dispatch(setSelectCities.rejected(e));
          }
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Cities', id })),
            { type: 'Cities', id: 'LIST' },
          ]
          : [{ type: 'Cities', id: 'LIST' }],
    }),
    getCitiesForCountry: build.query({
      query: ({ country_id, isSettingRedux }) => ({
        url: `${links.auth}/${country_id}/cities`,
      }),
      transformResponse: responseData => {
        const citiesData = responseData;

        if (citiesData?.cities) {
          const newCities = changePropertyName(citiesData.cities, dataTypes.cities);

          return newCities;
        } else {
          return [];
        }
      },
      async onQueryStarted(
        arg,
        { dispatch, queryFulfilled }
      ) {
        if (arg.isSettingRedux) {
          dispatch(setCities.pending());
  
          try {
            const { data } = await queryFulfilled;
  
            dispatch(setCities.fulfilled(data));
          } catch (e) {
            dispatch(setCities.rejected(e));
          }
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Cities', id })),
            { type: 'Cities', id: 'COUNTRY' },
          ]
          : [{ type: 'Cities', id: 'COUNTRY' }],
    }),
    getCity: build.query({
      query: ({ token, id }) => ({
        url: `${links.cities}/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const citiesData = responseData.data;

        if (citiesData?.city) {
          return citiesData.city;
        } else {
          return {};
        }
      },
      providesTags: (result, error, id) => [{ type: 'Cities', id: 'ITEM' }],
    }),
    addCity: build.mutation({
      query({ token, data }) {
        return {
          url: links.cities,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Cities', id: 'LIST' },
            { type: 'Cities', id: 'COUNTRY' },
          ]
          : '',
    }),
    updateCity: build.mutation({
      query({ token, id, data }) {
        return {
          url: `${links.cities}/${id}`,
          method: 'PUT',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Cities', id: 'LIST' },
            { type: 'Cities', id: 'COUNTRY' },
            { type: 'Cities', id: 'ITEM' }
          ]
          : '',
    }),
    deleteCity: build.mutation({
      query({ token, id }) {
        return {
          url: `${links.cities}/${id}`,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Cities', id: 'LIST' },
            { type: 'Cities', id: 'COUNTRY' },
          ]
          : '',
    }),
  }),
});

export const {
  useGetCitiesQuery,
  useGetCitiesForCountryQuery,
  useGetCityQuery,
  useAddCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
} = citiesApi;
