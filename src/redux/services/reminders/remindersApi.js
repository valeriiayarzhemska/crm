import { api } from '../api';
import { links } from '../../../data/links';

export const remindersApi = api.injectEndpoints({
  endpoints: build => ({
    getReminders: build.query({
      query: ({ token, type, page }) => {
        let newUrl = `${links.reminders}${type ? `?type=${type}` : '?type=0'}`;

        if (page) {
          newUrl += `&page=${page}`;
        }

        const params = {
          url: newUrl,
          headers: { Authorization: `Bearer ${token}` },
        };

        return params;
      },
      transformResponse: responseData => {
        const remindersData = responseData;

        if (remindersData) {
          return remindersData;
        } else {
          return {};
        }
      },
      providesTags: result =>
        result?.data
          ? [
            ...result.data.map(({ id }) => ({ type: 'Reminders', id })),
            { type: 'Reminders', id: 'LIST' },
          ]
          : [{ type: 'Reminders', id: 'LIST' }],
    }),
    getRemindersCounter: build.query({
      query: ({ token }) => {
        let newUrl = `${links.reminders}-counter`;

        const params = {
          url: newUrl,
          headers: { Authorization: `Bearer ${token}` },
        };

        return params;
      },
      transformResponse: responseData => {
        const remindersData = responseData;

        if (remindersData) {
          return remindersData;
        } else {
          return {};
        }
      },
      providesTags: result =>
        result
          ? [result].map(({ id }) => ({ type: 'Reminders', id }, { type: 'Reminders', id: 'LIST' }))
          : [{ type: 'Reminders', id: 'LIST' }],
    }),
    getReminder: build.query({
      query: ({ token, id }) => ({
        url: `${links.reminders}/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const reminderData = responseData?.data;

        if (reminderData) {
          return reminderData;
        } else {
          return {};
        }
      },
      providesTags: (result, error, id) => [{ type: 'Reminders', id: 'ITEM' }],
    }),
    finishReminder: build.mutation({
      query: ({ token, id }) => ({
        url: `${links.reminders}/${id}/finish`,
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: (result, error, { id }) =>
        !error ? [{ type: 'Reminders', id: 'LIST' }, { type: 'Reminders', id }] : '',
    }),
    addReminderRealty: build.mutation({
      query({ token, data, id }) {
        return {
          url: `${links.reminders}/realty/${id}`,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error ? [{ type: 'Reminders', id: 'LIST' }, { type: 'Reminders', id }] : '',
    }),
    addReminderClientRequest: build.mutation({
      query({ token, data, id }) {
        return {
          url: `${links.reminders}/client-request/${id}`,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error ? [{ type: 'Reminders', id: 'LIST' }, { type: 'Reminders', id }] : '',
    }),
    updateReminder: build.mutation({
      query({ token, id, data }) {
        return {
          url: `${links.reminders}/${id}`,
          method: 'PUT',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error ? [{ type: 'Reminders', id: 'LIST' }, { type: 'Reminders', id }] : '',
    }),
    deleteReminder: build.mutation({
      query({ token, id }) {
        return {
          url: `${links.reminders}/${id}`,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error ? [{ type: 'Reminders', id: 'LIST' }, { type: 'Reminders', id }] : '',
    }),
    rescheduleReminder: build.mutation({
      query({ token, id, time }) {
        return {
          url: `${links.reminders}/${id}/reschedule/${time}`,
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error ? [{ type: 'Reminders', id: 'LIST' }, { type: 'Reminders', id }] : '',
    }),
  }),
});

export const {
  useGetRemindersQuery,
  useGetRemindersCounterQuery,
  useGetReminderQuery,
  useFinishReminderMutation,
  useAddReminderRealtyMutation,
  useAddReminderClientRequestMutation,
  useUpdateReminderMutation,
  useDeleteReminderMutation,
  useRescheduleReminderMutation,
} =
  remindersApi;
