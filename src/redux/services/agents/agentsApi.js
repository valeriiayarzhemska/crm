import { api } from '../api';
import { links } from '../../../data/links';

export const agentsApi = api.injectEndpoints({
  endpoints: build => ({
    getAgents: build.query({
      query: token => ({
        url: links.agents,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const agentsData = responseData?.data;

        if (agentsData) {
          return agentsData;
        } else {
          return [];
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Agents', id })),
            { type: 'Agents', id: 'LIST' },
          ]
          : [{ type: 'Agents', id: 'LIST' }],
    }),
    getAgentsAssistants: build.query({ // assistants without current user
      query: token => ({
        url: links.agentsAssistants,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const agentsAssistantsData = responseData?.data;

        if (agentsAssistantsData) {
          return agentsAssistantsData;
        } else {
          return [];
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'AgentsAssistants', id })),
            { type: 'AgentsAssistants', id: 'LIST' },
          ]
          : [{ type: 'AgentsAssistants', id: 'LIST' }],
    }),
    getAgentsAssistantsWithUser: build.query({ // assistants with current user
      query: token => ({
        url: `${links.agents}-list`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const agentsAssistantsData = responseData?.data;

        if (agentsAssistantsData) {
          return agentsAssistantsData;
        } else {
          return [];
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'AgentsAssistantsUser', id })),
            { type: 'AgentsAssistantsUser', id: 'LIST' },
          ]
          : [{ type: 'AgentsAssistantsUser', id: 'LIST' }],
    }),
    addAgent: build.mutation({
      query({ token, data }) {
        return {
          url: links.agents,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: [{ type: 'Agents', id: 'LIST' }],
    }),
    updateAgent: build.mutation({
      query({ token, id, data }) {
        return {
          url: `${links.agents}/${id}`,
          method: 'PUT',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Agents', id }],
    }),
    deleteAgent: build.mutation({
      query({ token, id }) {
        return {
          url: `${links.agents}/${id}`,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: [{ type: 'Agents', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAgentsQuery,
  useGetAgentsAssistantsQuery,
  useGetAgentsAssistantsWithUserQuery,
  useAddAgentMutation,
  useDeleteAgentMutation,
} = agentsApi;
