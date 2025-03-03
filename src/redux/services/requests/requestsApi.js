import { api } from '../api';
import { links } from '../../../data/links';

export const requestsApi = api.injectEndpoints({
  endpoints: build => ({
    getRequests: build.query({
      query: token => ({
        url: links.requests,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const requestsData = responseData?.data;

        if (requestsData) {
          return requestsData;
        } else {
          return [];
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Requests', id })),
            { type: 'Requests', id: 'LIST' },
          ]
          : [{ type: 'Requests', id: 'LIST' }],
    }),
    getRequest: build.query({
      query: ({ token, id }) => ({
        url: `${links.requests}/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const requestData = responseData?.data?.clientRequest;

        if (requestData) {
          return requestData;
        } else {
          return {};
        }
      },
      providesTags: (result, error, id) => [{ type: 'Requests', id: 'ITEM' }],
    }),
    addRequest: build.mutation({
      query({ token, data, client_id }) {
        return {
          url: `${links.requests}/${client_id}`,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Requests', id: 'LIST' },
            { type: 'Clients', id: 'LIST' }
          ]
          : ''
    }),
    updateRequest: build.mutation({
      query({ token, id, data }) {
        return {
          url: `${links.requests}/update/${id}`,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Requests', id },
            { type: 'Clients', id: 'LIST' }
          ] : ''
      ,
    }),
    deleteRequest: build.mutation({
      query({ token, id }) {
        return {
          url: `${links.requests}/${id}`,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Requests', id: 'LIST' },
            { type: 'Clients', id: 'LIST' }
          ] : ''
      ,
    }),
    deleteRequestDocument: build.mutation({
      query({ token, id, document_id }) {
        return {
          url: `${links.requests}/${id}/documents/${document_id}`,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Requests', id },
            { type: 'Clients', id: 'LIST' }
          ]
          : ''
    }),
  }),
});

export const {
  useGetRequestsQuery,
  useGetRequestQuery,
  useAddRequestMutation,
  useUpdateRequestMutation,
  useDeleteRequestMutation,
  useDeleteRequestDocumentMutation,
} = requestsApi;
