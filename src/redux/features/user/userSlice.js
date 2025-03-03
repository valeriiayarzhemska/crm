import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../services/user/userApi';

import { getCookie } from '../../../utils/utils';

const userToken = getCookie('token') ? getCookie('token') : null;

const initialState = {
  user: null,
  token: userToken,
  isLoading: false,
  loginError: null,
  userInfo: null,
  userInfoError: null,
};

export const setUser = createAsyncThunk(
  'user/setUser',
  async payload => payload
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(userApi.endpoints.login.matchPending, (state, action) => {
        state.loginError = null;
      })
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.loginError = null;
        state.token = action.payload.access_token;
      })
      .addMatcher(userApi.endpoints.login.matchRejected, (state, action) => {
        console.log('login rejected', action);
        state.loginError = action.payload;
      })

      .addMatcher(userApi.endpoints.logout.matchPending, (state, action) => {
        state.loginError = null;
      })
      .addMatcher(userApi.endpoints.logout.matchFulfilled, (state, action) => {
        state.loginError = null;
        state.token = null;
      })
      .addMatcher(userApi.endpoints.logout.matchRejected, (state, action) => {
        console.log('logout rejected', action);
        state.loginError = action.payload;
      })

      .addMatcher(userApi.endpoints.getUserInfo.matchFulfilled, (state, action) => {
        state.userInfoError = null;
        state.userInfo = action.payload;
      })
      .addMatcher(userApi.endpoints.getUserInfo.matchRejected, (state, action) => {
        console.log('getUserInfo rejected', action);
        state.userInfoError = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
