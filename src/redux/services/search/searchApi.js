import { api } from '../api';
import { links } from '../../../data/links';

export const searchApi = api.injectEndpoints({
  endpoints: build => ({
    getSearchRealties: build.query({
      query: ({ token, search_type, search_query, search_query_request, search_filters, sort_by, page }) => {
        const searchType = search_type ? `search_type=${search_type}` : 'search_type=1';
        let newUrl = `${links.search}${search_query
          ? `?search_query=${search_query}&${searchType}`
          : `?${searchType}`}`;

        if (search_filters && search_filters.length > 0) {
          newUrl = `${links.search}${search_filters}`;
        };

        if (sort_by) {
          newUrl += `&sort_by=${sort_by}`;
        }

        if (search_query_request) {
          newUrl += `&search_query_request=${search_query_request}`;
        }

        if (page) {
          newUrl += `&page=${page}`;
        }

        const params = {
          url: newUrl,
          headers: { Authorization: `Bearer ${token}` }
        };

        return params;
      },
      transformResponse: responseData => {
        const searchData = responseData?.data;

        if (searchData) {
          return searchData;
        } else {
          return {};
        }
      },
      providesTags: result =>
        result?.realties
          ? [
            ...result.realties.map(({ id }) => ({ type: 'SearchRealties', id })),
            { type: 'SearchRealties', id: 'LIST' },
          ]
          : [{ type: 'SearchRealties', id: 'LIST' }],
    }),
    getSearchRealtiesMap: build.query({
      query: ({ token, search_query, search_filters }) => {
        let newUrl = `${links.searchMap}${search_query ? `?search_query=${search_query}` : ''}`;

        if (search_filters && search_filters.length > 0) {
          newUrl = `${links.searchMap}${search_filters}`;
        };

        const params = {
          url: newUrl,
          headers: { Authorization: `Bearer ${token}` }
        };

        return params;
      },
      transformResponse: (responseData, meta, arg) => {
        const realtiesData = responseData?.data?.markers;

        if (realtiesData) {
          return realtiesData;
        } else {
          return [];
        }
      },
      providesTags: result =>
        result?.data?.markers
          ? [
            ...result.data.markers.map(({ id }) => ({ type: 'SearchRealtiesMap', id })),
            { type: 'SearchRealtiesMap', id: 'LIST' },
          ]
          : [{ type: 'SearchRealtiesMap', id: 'LIST' }],
    }),
    getSearchInputRealties: build.query({
      query: ({ token, search_query }) => {
        let newUrl = `${links.search}${search_query ? `?search_query=${search_query}&search_type=1` : '?search_type=1'}`;

        const params = {
          url: newUrl,
          headers: { Authorization: `Bearer ${token}` }
        };

        return params;
      },
      transformResponse: responseData => {
        const searchData = responseData?.data;

        if (searchData) {
          return searchData;
        } else {
          return {};
        }
      },
      providesTags: result =>
        result?.realties
          ? [
            ...result.realties.map(({ id }) => ({ type: 'SearchRealtiesInput', id })),
            { type: 'SearchRealtiesInput', id: 'LIST' },
          ]
          : [{ type: 'SearchRealtiesInput', id: 'LIST' }],
    }),
    getSearchFiltersData: build.query({
      query: token => ({
        url: links.filters,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const filtersData = responseData?.data;

        if (filtersData) {
          return filtersData;
        } else {
          return {};
        }
      },
    }),
  }),
});

export const {
  useGetSearchRealtiesQuery,
  useGetSearchRealtiesMapQuery,
  useGetSearchInputRealtiesQuery,
  useGetSearchFiltersDataQuery,
} = searchApi;
