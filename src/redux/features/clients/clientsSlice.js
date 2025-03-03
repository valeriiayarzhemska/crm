import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  clients: [],
  client: {},
  isLoadingClients: false,
  clientsError: null,
  isLoadingClient: false,
  clientError: null,
};

/* export const setClients = createAsyncThunk(
  'clients/setClients',
  async payload => payload
);

export const setClient = createAsyncThunk(
  'clients/setClient',
  async payload => payload
);

export const updateClient = createAsyncThunk(
  'clients/updateClient',
  async payload => payload
); */

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    /* setClientInfo: (state, action) => {
      state.client = action.payload;
    }, */
  },
  extraReducers: builder => {
    /* builder.addCase(setClients.pending, state => {
      state.isLoadingClients = true;
    });
    builder.addCase(setClients.fulfilled, (state, action) => {
      state.clients = action.payload.clients;
      state.isLoadingClients = false;
    });
    builder.addCase(setClients.rejected, state => {
      state.isLoadingClients = false;
      state.clientsError = 'clientsError';
    });

    builder.addCase(setClient.pending, state => {
      state.isLoadingClient = true;
    });
    builder.addCase(setClient.fulfilled, (state, action) => {
      state.client = action.payload.data;
      state.isLoadingClient = false;
    });
    builder.addCase(setClient.rejected, state => {
      state.isLoadingClient = false;
      state.clientError = 'clientError';
    });

    builder.addCase(updateClient.pending, state => {
      state.isLoadingClient = true;
    });
    builder.addCase(updateClient.fulfilled, (state, action) => {
      state.isLoadingClient = false;

      const updatedClientInfo = action.payload;
      const index = state.clients.findIndex(
        client => client.id === updatedClientInfo.id
      );

      if (index !== -1) {
        state.clients[index] = {
          ...state.clients[index],
          ...updatedClientInfo,
        };
      }
    });
    builder.addCase(updateClient.rejected, state => {
      state.isLoadingClient = false;
      state.clientError = 'clientError';
    }); */
  },
});

export const { setClientInfo } = clientsSlice.actions;

export default clientsSlice.reducer;
