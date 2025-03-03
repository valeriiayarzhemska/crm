import { api } from '../api';
import { links } from '../../../data/links';

export const collaborationsApi = api.injectEndpoints({
  endpoints: build => ({
    getCollaborations: build.query({
      query: token => ({
        url: links.collaborations,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const collaborationsData = responseData?.data;

        if (collaborationsData) {
          return collaborationsData;
        } else {
          return [];
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Collaborations', id })),
            { type: 'Collaborations', id: 'LIST' },
          ]
          : [{ type: 'Collaborations', id: 'LIST' }],
    }),
    getCollaborationsRealty: build.query({
      query: ({ token, realty_id }) => ({
        url: `${links.collaborations}/${realty_id}/agents`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const collaborationsData = responseData?.data[0];

        if (collaborationsData) {
          return {
            buyer_agent: collaborationsData?.buyer_agent,
            buyer_assistant: collaborationsData?.buyer_assistant,
          };
        } else {
          return {};
        }
      },
      providesTags: result => [{ type: 'Collaborations', id: 'LIST' }],
    }),
    addCollaboration: build.mutation({
      query({ token, data, realty_id }) {
        return {
          url: `${links.collaborations}/${realty_id}`,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: [{ type: 'Collaborations', id: 'LIST' }],
    }),
    updateCollaboration: build.mutation({
      query({ token, id, data }) {
        return {
          url: `${links.collaborations}/${id}`,
          method: 'PUT',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Collaborations', id }],
    }),
    deleteCollaboration: build.mutation({
      query({ token, id }) {
        return {
          url: `${links.collaborations}/${id}`,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: [{ type: 'Collaborations', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetCollaborationsQuery,
  useGetCollaborationsRealtyQuery,
  useAddCollaborationMutation,
  useDeleteCollaborationMutation,
} = collaborationsApi;
