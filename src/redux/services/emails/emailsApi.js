import { api } from '../api';
import { links } from '../../../data/links';

export const emailsApi = api.injectEndpoints({
  endpoints: build => ({
    getEmails: build.query({
      query: token => ({
        url: links.emails,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const emailsData = responseData?.data;

        if (emailsData) {
          return emailsData;
        } else {
          return [];
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Emails', id })),
            { type: 'Emails', id: 'LIST' },
          ]
          : [{ type: 'Emails', id: 'LIST' }],
    }),
    getEmail: build.query({
      query: ({ token, id }) => ({
        url: `${links.emails}/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const emailsData = responseData?.data;

        if (emailsData) {
          return emailsData;
        } else {
          return {};
        }
      },
      providesTags: result =>
        result
          ? [
            ...Object.values(result).map(email => ({ type: 'Emails', id: email.id })),
            { type: 'Emails', id: 'LIST' },
          ]
          : [{ type: 'Emails', id: 'LIST' }],
    }),
    addEmails: build.mutation({
      query({ token, data }) {
        return {
          url: `${links.emails}/`,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
    }),
    createEmailPreview: build.mutation({
      query({ token, clientId, data }) {
        return {
          url: `${links.emails}/client/${clientId}/preview/`,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          responseHandler: 'text',
        };
      },
    }),
    updateEmail: build.mutation({
      query({ token, id, data }) {
        return {
          url: `${links.emails}/update/${id}`,
          method: 'PATCH',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Emails', id },
            { type: 'RealtyEmails', id },
          ]
          : [],
    }),
    deleteEmail: build.mutation({
      query({ token, id }) {
        return {
          url: `${links.emails}/${id}`,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, arg) =>
        !error
          ? [
            { type: 'Emails', id: 'LIST' },
          ]
          : [],
    }),
  }),
});

export const {
  useGetEmailsQuery,
  useGetEmailQuery,
  useAddEmailsMutation,
  useCreateEmailPreviewMutation,
  useUpdateEmailMutation,
  useDeleteEmailMutation,
} = emailsApi;
