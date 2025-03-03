import { api } from '../api';
import { links } from '../../../data/links';

export const videosApi = api.injectEndpoints({
  endpoints: build => ({
    getVideos: build.query({
      query: token => ({
        url: links.videos,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const videosData = responseData?.data;

        if (videosData) {
          return videosData;
        } else {
          return [];
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Videos', id })),
            { type: 'Videos', id: 'LIST' },
          ]
          : [{ type: 'Videos', id: 'LIST' }],
    }),
    getVideosForRealty: build.query({
      query: ({ token, realty_id }) => ({
        url: `${links.videos}/${realty_id}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const videosData = responseData?.data;

        if (videosData) {
          return videosData;
        } else {
          return {};
        }
      },
      providesTags: result =>
        result
          ? [
            ...Object.values(result).map(document => ({ type: 'Videos', id: document.id })),
            { type: 'Videos', id: 'LIST' },
          ]
          : [{ type: 'Videos', id: 'LIST' }],
    }),
    addVideo: build.mutation({
      query({ token, realty_id, data }) {
        return {
          url: `${links.videos}/${realty_id}`,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Videos', id: 'LIST' },
            { type: 'RealtyVideos', id: 'LIST' },
          ]
          : [],
    }),
    /* updateVideo: build.mutation({
      query({ token, realty_id, data }) {
        return {
          url: `${links.videos}/${realty_id}/update`,
          method: 'PATCH',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Videos', id },
            { type: 'RealtyVideos', id },
          ]
          : [],
    }), */
    deleteVideo: build.mutation({
      query({ token, id }) {
        return {
          url: `${links.videos}/${id}`,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, arg) =>
        !error
          ? [
            { type: 'Videos', id: 'LIST' },
            { type: 'RealtyVideos', id: 'LIST' },
          ]
          : [],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideosForRealtyQuery,
  useAddVideoMutation,
  //useUpdateVideoMutation,
  useDeleteVideoMutation,
} = videosApi;
