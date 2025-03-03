import { api } from '../api';
import { links } from '../../../data/links';
import { generateUrlClients } from '../../../utils/utils';

export const clientsApi = api.injectEndpoints({
  endpoints: build => ({
    getClients: build.query({
      query: ({
        token,
        isPagination,
        page,
        perPage,
        activeSeachType, 
        searchQuery,
        status,
        budgetTo,
        urgencyType,
      }) => {
        let newUrl = generateUrlClients({
          baseUrl: links.clients,
          page,
          perPage,
          activeSeachType, 
          searchQuery,
          status,
          budgetTo,
          urgencyType,
        });

        const params = {
          url: newUrl,
          headers: { Authorization: `Bearer ${token}`}
        };

        return params;
      },
      transformResponse: (responseData, meta, arg) => {
        const clientsData = responseData?.data;

        if (clientsData) {
          return arg.isPagination ? responseData : clientsData;
        } else {
          return arg.isPagination ? {} : [];
        }
      },
      providesTags: result =>
        result?.data 
          ? [
            ...result.data.map(({ id }) => ({ type: 'Clients', id })),
            { type: 'Clients', id: 'LIST' },
          ]
          : [{ type: 'Clients', id: 'LIST' }],
    }),
    getClient: build.query({
      query: ({ token, id }) => ({
        url: `${links.clients}/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const clientData = responseData?.data?.client;

        if (clientData) {
          return clientData;
        } else {
          return {};
        }
      },
      providesTags: (result, error, id) => [{ type: 'Clients', id: 'ITEM' }],
    }),
    addClient: build.mutation({
      query({ token, data }) {
        return {
          url: links.clients,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Clients', id: 'LIST' }
          ]
          : '',
    }),
    updateClient: build.mutation({
      query({ token, id, data }) {
        return {
          url: `${links.clients}/update/${id}`,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Clients', id }
          ]
          : ''
    }),
    deleteClient: build.mutation({
      query({ token, id }) {
        return {
          url: `${links.clients}/${id}`,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Clients', id }
          ]
          : ''
    }),
    deleteClientDocument: build.mutation({
      query({ token, id, document_id }) {
        return {
          url: `${links.clients}/${id}/documents/${document_id}`,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Clients', id }
          ]
          : ''
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetClientQuery,
  useAddClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useDeleteClientDocumentMutation,
} = clientsApi;
