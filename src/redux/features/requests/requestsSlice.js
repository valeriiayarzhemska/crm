import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  requests: [],
  isLoadingRequests: false,
  requestsError: null,
  request: [],
  isLoadingRequest: false,
  requestError: null,
};

export const setRequests = createAsyncThunk(
  'requests/setRequests',
  async payload => payload
);

export const setRequest = createAsyncThunk(
  'request/setRequest',
  async payload => payload
);

export const updateRequest = createAsyncThunk(
  'requests/updateRequest',
  async payload => payload
);

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setRequestInfo: (state, action) => {
      state.request = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(setRequests.pending, state => {
      state.isLoadingRequests = true;
    });
    builder.addCase(setRequests.fulfilled, (state, action) => {
      state.requests = action.payload.requests;
      state.isLoadingRequests = false;
    });
    builder.addCase(setRequests.rejected, state => {
      state.isLoadingRequests = false;
      state.requestsError = 'requestsError';
    });

    builder.addCase(updateRequest.pending, state => {
      state.isLoadingRequest = true;
    });
    builder.addCase(updateRequest.fulfilled, (state, action) => {
      state.isLoadingRequest = false;

      const updatedRequest = action.payload;
      const index = state.requests.findIndex(
        client => client.id === updatedRequest.id
      );

      if (index !== -1) {
        state.requests[index] = {
          ...state.requests[index],
          ...updatedRequest,
        };
      }
    });
    builder.addCase(updateRequest.rejected, state => {
      state.isLoadingRequest = false;
      state.requestError = 'requestError';
    });
  },
});

export const { setRequestInfo } = requestsSlice.actions;

export default requestsSlice.reducer;
