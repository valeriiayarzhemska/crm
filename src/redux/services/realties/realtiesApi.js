import { api } from '../api';
import { links } from '../../../data/links';
import { generateUrlRealties } from '../../../utils/utils';

export const realtiesApi = api.injectEndpoints({
  endpoints: build => ({
    getRealties: build.query({
      query: ({ token, page, searchType }) => {
        let url = `${links.realties}${page ? `?page=${page}` : ''}`;

        if (searchType === 'me') {
          url = `${links.realties}?page=${page || 1}&${searchType}`;
        };

        const params = {
          url,
          headers: { Authorization: `Bearer ${token}`}
        };

        return params;
      },
      transformResponse: (responseData, meta, arg) => {
        const realtiesData = responseData?.data;

        if (realtiesData) {
          return responseData;
        } else {
          return {};
        }
      },
      providesTags: result =>
        result?.data 
          ? [
            ...result.data.map(({ id }) => ({ type: 'Realties', id })),
            { type: 'Realties', id: 'LIST' },
          ]
          : [{ type: 'Realties', id: 'LIST' }],
    }),
    getRealty: build.query({
      query: (token, id) => ({
        url: `${links.realties}/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const realtyData = responseData?.data;

        if (realtyData) {
          return realtyData;
        } else {
          return {};
        }
      },
      providesTags: (result, error, id) => [{ type: 'Realties', id }],
    }),
    addRealty: build.mutation({
      query({ token, data }) {
        return {
          url: links.realties,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Realties', id: 'LIST' }
          ]
          : '',
    }),
    addRealtyLike: build.mutation({
      query({ token, data }) {
        return {
          url: links.likes,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Clients', id: 'LIST' },
            { type: 'SearchRealties', id: 'LIST' },
            { type: 'SearchRealtiesMap', id: 'LIST' },
          ]
          : '',
    }),
    updateRealty: build.mutation({
      query({ token, id, data }) {
        return {
          url: `${links.realties}/${id}`,
          method: 'PATCH',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Realties', id }, { type: 'Realties', id: 'LIST' }
          ]
          : ''
    }),
    deleteRealty: build.mutation({
      query({ token, id }) {
        return {
          url: `${links.realties}/${id}`,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Realties', id }
          ]
          : ''
    }),
    deleteRealtyDocument: build.mutation({
      query({ token, id, document_id }) {
        return {
          url: `${links.realties}/${id}/documents/${document_id}`,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Realties', id }
          ]
          : ''
    }),
  }),
});

export const {
  useGetRealtiesQuery,
  useGetRealtyQuery,
  useAddRealtyMutation,
  useAddRealtyLikeMutation,
  useUpdateRealtyMutation,
  useDeleteRealtyMutation,
  useDeleteRealtyDocumentMutation,
} = realtiesApi;
