import { api } from '../api';
import { links } from '../../../data/links';

export const agentResultsApi = api.injectEndpoints({
  endpoints: build => ({
    getAgentResults: build.query({
      query: ({ token, start_date, end_date }) => ({
        url: `${links.agentsResults}?start_date=${start_date}&end_date=${end_date}`,
        headers: { Authorization: `Bearer ${token}`}
      }),
      transformResponse: (responseData, meta, arg) => {
        const agentResultsData = responseData;

        if (agentResultsData) {
          return agentResultsData;
        } else {
          return {};
        }
      },
    }),
  }),
});

export const {
  useGetAgentResultsQuery,
} = agentResultsApi;
