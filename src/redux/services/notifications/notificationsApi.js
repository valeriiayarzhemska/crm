import { api } from '../api';
import { links } from '../../../data/links';

export const notificationsApi = api.injectEndpoints({
  endpoints: build => ({
    getNotifications: build.query({
      query: ({ token }) => ({
        url: links.notifications,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        if (responseData?.data) {
          return responseData;
        } else {
          return {};
        }
      },
      providesTags: result =>
        result && result?.data
          ? [
            ...result.data.map(({ id }) => ({ type: 'Notifications', id })),
            { type: 'Notifications', id: 'LIST' },
          ]
          : [{ type: 'Notifications', id: 'LIST' }],
    }),
    getNotificationsByPage: build.query({
      query: ({ token, page }) => ({
        url: page ? `${links.notifications}?page=${page}` : links.notifications,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        if (responseData?.data) {
          return responseData;
        } else {
          return {};
        }
      },
      providesTags: result =>
        result && result?.data
          ? [
            ...result.data.map(({ id }) => ({ type: 'Notifications', id: 'ITEM' })),
            { type: 'Notifications', id: 'ITEM' },
          ]
          : [{ type: 'Notifications', id: 'ITEM' }],
    }),
    readAllNotifications: build.mutation({
      query({ token }) {
        return {
          url: `${links.notifications}/read-all`,
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Notifications', id: 'LIST' },
            { type: 'Notifications', id: 'ITEM' },
          ]
          : [],
    }),
    readNotification: build.mutation({
      query({ token, id }) {
        return {
          url: `${links.notifications}/${id}/read`,
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Notifications', id: 'ITEM' },
            { type: 'Notifications', id: 'LIST' },
          ]
          : [],
    }),
    unreadNotification: build.mutation({
      query({ token, id }) {
        return {
          url: `${links.notifications}/${id}/unread`,
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error
          ? [
            { type: 'Notifications', id: 'ITEM' },
            { type: 'Notifications', id: 'LIST' },
          ]
          : [],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetNotificationsByPageQuery,
  useReadAllNotificationsMutation,
  useReadNotificationMutation,
  useUnreadNotificationMutation,
} = notificationsApi;
