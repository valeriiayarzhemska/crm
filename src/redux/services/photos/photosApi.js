import { api } from '../api';
import { links } from '../../../data/links';

export const photosApi = api.injectEndpoints({
  endpoints: build => ({
    getPhotos: build.query({
      query: token => ({
        url: links.photos,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const photosData = responseData?.data;

        if (photosData) {
          return photosData;
        } else {
          return [];
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Photos', id })),
            { type: 'Photos', id: 'LIST' },
          ]
          : [{ type: 'Photos', id: 'LIST' }],
    }),
    getPhotosForRealty: build.query({
      query: ({ token, realty_id }) => ({
        url: `${links.photos}/${realty_id}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const photosData = responseData?.photos;

        if (photosData) {
          return photosData;
        } else {
          return {};
        }
      },
      providesTags: result =>
        result
          ? [
            ...Object.values(result).map(document => ({ type: 'Photos', id: document.id })),
            { type: 'Photos', id: 'LIST' },
          ]
          : [{ type: 'Photos', id: 'LIST' }],
    }),
    addPhotos: build.mutation({
      query({ token, realty_id, data }) {
        return {
          url: `${links.photos}/${realty_id}`,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Photos', id: 'LIST' },
            { type: 'RealtyPhotos', id: 'LIST' },
          ]
          : [],
    }),
    updatePhotos: build.mutation({
      query({ token, realty_id, data }) {
        return {
          url: `${links.photos}/${realty_id}/update`,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Photos', id },
            { type: 'RealtyPhotos', id },
          ]
          : [],
    }),
    deletePhoto: build.mutation({
      query({ token, id }) {
        return {
          url: `${links.photos}/${id}`,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, arg) =>
        !error
          ? [
            { type: 'Photos', id: 'LIST' },
            { type: 'RealtyPhotos', id: 'LIST' },
          ]
          : [],
    }),
    downloadPhotosForRealty: build.query({
      query: ({ token, realty_id }) => ({
        url: `${links.photos}/${realty_id}/download`,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

export const {
  useGetPhotosQuery,
  useGetPhotosForRealtyQuery,
  useAddPhotosMutation,
  useUpdatePhotosMutation,
  useDeletePhotoMutation,
  useDownloadPhotosForRealtyQuery,
} = photosApi;
