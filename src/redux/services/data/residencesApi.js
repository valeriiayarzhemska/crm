import { api } from '../api';
import { links } from '../../../data/links';
import { setResidences, setResidencesSearch } from '../../features/dashboard/dashboardSlice';
import { changePropertyName } from '../../../utils/data';
import { dataTypes } from '../../../data/constants';

export const residencesApi = api.injectEndpoints({
  endpoints: build => ({
    getResidences: build.query({
      query: token => ({
        url: links.residences,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const residencesData = responseData?.data;

        if (residencesData) {
          return residencesData;
        } else {
          return [];
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Residences', id })),
            { type: 'Residences', id: 'LIST' },
          ]
          : [{ type: 'Residences', id: 'LIST' }],
    }),
    getResidencesForCity: build.query({
      query: ({ token, city_id, isSettingRedux, isCityArray }) => ({
        url: `${links.residences}/${city_id}/residences`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const residencesData = responseData?.data;

        if (residencesData) {
          return residencesData;
        } else {
          return [];
        }
      },
      async onQueryStarted(
        arg,
        { dispatch, queryFulfilled }
      ) {
        if (arg.isSettingRedux) {
          dispatch(setResidences.pending());
  
          try {
            const { data } = await queryFulfilled;
  
            await dispatch(setResidences.fulfilled(data));
          } catch (e) {
            dispatch(setResidences.rejected(e));
          }
        }

        if (arg.isCityArray) {
          dispatch(setResidencesSearch.pending());
  
          try {
            const { data } = await queryFulfilled;
            
            const newResidences = await changePropertyName(data, dataTypes.residences);

            dispatch(setResidencesSearch.fulfilled(newResidences));
          } catch (e) {
            dispatch(setResidencesSearch.rejected(e));
            console.log('error residences: ', e);
          }
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Residences', id })),
            { type: 'Residences', id: 'CITY' },
          ]
          : [{ type: 'Residences', id: 'CITY' }],
    }),
    getResidence: build.query({
      query: ({ token, id }) => ({
        url: `${links.residences}/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const residenceData = responseData?.data;

        if (residenceData?.residence) {
          return residenceData.residence;
        } else {
          return {};
        }
      },
      providesTags: (result, error, id) => [{ type: 'Residences', id: 'ITEM' }],
    }),
    addResidence: build.mutation({
      query({ token, data }) {
        return {
          url: links.residences,
          method: 'POST',
          body: (data),
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Residences', id: 'LIST' },
            { type: 'Residences', id: 'CITY' },
          ]
          : '',
    }),
    updateResidence: build.mutation({
      query({ token, id, data }) {
        return {
          url: `${links.residences}/update/${id}`,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Residences', id },
            { type: 'Residences', id: 'CITY' },
            { type: 'Residences', id: 'ITEM' }
          ] : ''
    }),
    deleteResidence: build.mutation({
      query({ token, id }) {
        return {
          url: `${links.residences}/${id}`,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Residences', id: 'LIST' },
            { type: 'Residences', id: 'CITY' },
          ]
          : ''
    }),
  }),
});

export const {
  useGetResidencesQuery,
  useGetResidenceQuery,
  useGetResidencesForCityQuery,
  useAddResidenceMutation,
  useUpdateResidenceMutation,
  useDeleteResidenceMutation,
} = residencesApi;
