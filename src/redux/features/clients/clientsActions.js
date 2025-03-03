/* import axios from 'axios';
import { links } from '../../../data/links'; */

/* export const getClients = token => async dispatch => {
  dispatch(setClients.pending());

  try {
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      url: links.clients,
    };

    const response = await axios(options);
    const data = response?.data.data;

    if (data) {
      dispatch(
        setClients.fulfilled({
          clients: data,
        })
      );
    }
  } catch (error) {
    dispatch(setClients.rejected(error));

    return error.response.data.message;
  }
}; */

/* export const getClient = (token, id) => async dispatch => {
  dispatch(setClient.pending());

  try {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${links.clients}/${id}`,
    };

    const response = await axios(options);
    const data = response?.data.data;

    if (data) {
      dispatch(
        setClient.fulfilled({
          client: data,
        })
      );
    }
  } catch (error) {
    dispatch(setClient.rejected(error));

    return error.response.data.message;
  }
};

export const addClient = (token, data) => async dispatch => {
  dispatch(setClients.pending());

  try {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
      url: links.clients,
    };

    const response = await axios(options);

    if (response) {
      getClients();
    }
  } catch (error) {
    dispatch(setClients.rejected(error));

    return error.response.data.message;
  }
};

export const updateClientInfo = (token, data, id) => async dispatch => {
  dispatch(updateClient.pending());

  try {
    const options = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: { data: data, id: id },
      url: `${links.clients}/${id}`,
    };

    const response = await axios(options);

    if (response) {
      dispatch(updateClient.fulfilled({ ...data, id }));
    }
  } catch (error) {
    dispatch(updateClient.rejected(error));

    return error.response.data.message;
  }
};

export const deleteClient = (token, id) => async dispatch => {
  dispatch(setClients.pending());

  try {
    const options = {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: id,
      url: `${links.clients}/${id}`,
    };

    const response = await axios(options);

    if (response) {
      getClients();
    }
  } catch (error) {
    dispatch(setClients.rejected(error));

    return error.response.data.message;
  }
}; */
