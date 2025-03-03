import { api } from '../api';
import { links } from '../../../data/links';

export const mandateApi = api.injectEndpoints({
  endpoints: build => ({
    getMandates: build.query({
      query: token => ({
        url: links.mandates,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const mandateData = responseData?.data;

        if (mandateData) {
          return mandateData;
        } else {
          return [];
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Mandate', id })),
            { type: 'Mandate', id: 'LIST' },
          ]
          : [{ type: 'Mandate', id: 'LIST' }],
    }),
    getMandatesForRealty: build.query({
      query: ({ token, realty_id }) => ({
        url: `${links.mandates}/${realty_id}/list-mandates`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const mandateData = responseData;

        if (mandateData) {
          return mandateData;
        } else {
          return [];
        }
      },
      providesTags: result =>
        result?.data
          ? [
            ...result.data.map(({ id }) => ({ type: 'MandateRealty', id })),
            { type: 'MandateRealty', id: 'LIST' },
          ]
          : [{ type: 'MandateRealty', id: 'LIST' }],
    }),
    addMandates: build.mutation({
      query({ token, realty_id, data }) {
        return {
          url: `${links.mandates}/${realty_id}`,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Mandates', id: 'LIST' },
            { type: 'MandateRealty', id: 'LIST' },
          ]
          : [],
    }),
    updateMandates: build.mutation({
      query({ token, mandate_id, data }) {
        return {
          url: `${links.mandates}/${mandate_id}`,
          method: 'PUT',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Mandates', id },
            { type: 'MandateRealty', id },
          ]
          : [],
    }),
    deleteMandate: build.mutation({
      query({ token, id }) {
        return {
          url: `${links.mandates}/${id}`,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, arg) =>
        !error
          ? [
            { type: 'Mandates', id: 'LIST' },
            { type: 'MandateRealty', id: 'LIST' },
          ]
          : [],
    }),
  }),
});

export const {
  useGetMandatesQuery,
  useGetMandatesForRealtyQuery,
  useAddMandatesMutation,
  useUpdateMandatesMutation,
  useDeleteMandateMutation,
} = mandateApi;
