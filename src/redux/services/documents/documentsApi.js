import { api } from '../api';
import { links } from '../../../data/links';

export const documentsApi = api.injectEndpoints({
  endpoints: build => ({
    getDocuments: build.query({
      query: token => ({
        url: links.documents,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const documentsData = responseData?.data;

        if (documentsData) {
          return documentsData;
        } else {
          return [];
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Documents', id })),
            { type: 'Documents', id: 'LIST' },
          ]
          : [{ type: 'Documents', id: 'LIST' }],
    }),
    getDocumentsForRealty: build.query({
      query: ({ token, id }) => ({
        url: `${links.documents}/${id}/list-docs`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const documentsData = responseData?.data;

        if (documentsData) {
          return documentsData;
        } else {
          return {};
        }
      },
      providesTags: result =>
        result
          ? [
            ...Object.values(result).map(document => ({ type: 'Documents', id: document.id })),
            { type: 'Documents', id: 'LIST' },
          ]
          : [{ type: 'Documents', id: 'LIST' }],
    }),
    addDocuments: build.mutation({
      query({ token, realty_id, data }) {
        return {
          url: `${links.documents}/${realty_id}`,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Documents', id: 'LIST' },
            { type: 'RealtyDocuments', id: 'LIST' },
          ]
          : [],
    }),
    updateDocument: build.mutation({
      query({ token, id, data }) {
        return {
          url: `${links.documents}/${id}/update-name`,
          method: 'PATCH',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Documents', id },
            { type: 'RealtyDocuments', id },
          ]
          : [],
    }),
    updateDocumentCategory: build.mutation({
      query({ token, data }) {
        return {
          url: `${links.documents}/category/update`,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Documents', id },
            { type: 'RealtyDocuments', id },
          ]
          : [],
    }),
    deleteDocument: build.mutation({
      query({ token, id }) {
        return {
          url: `${links.documents}/${id}`,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, arg) =>
        !error
          ? [
            { type: 'Documents', id: 'LIST' },
            { type: 'RealtyDocuments', id: 'LIST' },
          ]
          : [],
    }),
    downloadDocument: build.query({
      query: ({ token, id }) => ({
        url: `${links.documents}/${id}/download`,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

export const {
  useGetDocumentsQuery,
  useGetDocumentsForRealtyQuery,
  useAddDocumentsMutation,
  useUpdateDocumentMutation,
  useUpdateDocumentCategoryMutation,
  useDeleteDocumentMutation,
  useDownloadDocumentQuery,
} = documentsApi;
