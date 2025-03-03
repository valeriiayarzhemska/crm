import { api } from '../api';
import { links } from '../../../data/links';

export const contactsApi = api.injectEndpoints({
  endpoints: build => ({
    getContacts: build.query({
      query: token => ({
        url: links.contacts,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const contactsData = responseData?.data;

        if (contactsData) {
          return contactsData;
        } else {
          return [];
        }
      },
      providesTags: result =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Contacts', id })),
            { type: 'Contacts', id: 'LIST' },
          ]
          : [{ type: 'Contacts', id: 'LIST' }],
    }),
    getContact: build.query({
      query: ({ token, id }) => ({
        url: `${links.contacts}/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      transformResponse: responseData => {
        const contactData = responseData?.data;

        if (contactData?.owner) {
          return contactData.owner;
        } else {
          return {};
        }
      },
      providesTags: (result, error, id) => [{ type: 'Contacts', id: 'ITEM' }],
    }),
    addContact: build.mutation({
      query({ token, data }) {
        return {
          url: links.contacts,
          method: 'POST',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error ? [{ type: 'Contacts', id: 'LIST' }] : '',
    }),
    updateContact: build.mutation({
      query({ token, id, data }) {
        return {
          url: `${links.contacts}/${id}`,
          method: 'PUT',
          body: data,
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error ? [{ type: 'Contacts', id: 'ITEM' }, { type: 'Contacts', id: 'LIST' }] : '',
    }),
    deleteContact: build.mutation({
      query({ token, id }) {
        return {
          url: `${links.contacts}/${id}`,
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        };
      },
      invalidatesTags: (result, error, { id }) =>
        !error ? [{ type: 'Contacts', id: 'LIST' }] : '',
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useAddContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactsApi;
