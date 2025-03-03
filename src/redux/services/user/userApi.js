import { api } from '../api';
import { links } from '../../../data/links';

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation({
      query: credentials => ({
        url: links.login,
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: build.mutation({
      query: token => ({
        url: links.logout,
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    register: build.mutation({
      query: credentials => ({
        url: links.register,
        method: 'POST',
        body: credentials,
      }),
    }),
    getUserInfo: build.mutation({
      query: token => ({
        url: `${links.auth}/me`,
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetUserInfoMutation,
} = userApi;
