import axios from 'axios';
import { links } from '../../../data/links';
import { setRequests, setRequest, updateRequest } from './requestsSlice';

export const getRequests = token => async dispatch => {
  dispatch(setRequests.pending());

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
        setRequests.fulfilled({
          clients: data,
        })
      );
    }
  } catch (error) {
    dispatch(setRequests.rejected(error));

    return error.response.data.message;
  }
};

export const getRequest = (token, id) => async dispatch => {
  dispatch(setRequest.pending());

  try {
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      url: `${links.clients}/${id}`,
    };

    const response = await axios(options);
    const data = response?.data.data;

    if (data) {
      dispatch(
        setRequest.fulfilled({
          client: data,
        })
      );
    }
  } catch (error) {
    dispatch(setRequest.rejected(error));

    return error.response.data.message;
  }
};

export const addRequest = (token, data) => async dispatch => {
  dispatch(setRequests.pending());

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
      getRequests();
    }
  } catch (error) {
    dispatch(setRequests.rejected(error));

    return error.response.data.message;
  }
};

export const updateRequestInfo = (token, data, id) => async dispatch => {
  dispatch(updateRequest.pending());

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
      dispatch(updateRequest.fulfilled({ ...data, id }));
    }
  } catch (error) {
    dispatch(updateRequest.rejected(error));

    return error.response.data.message;
  }
};

export const deleteRequest = (token, id) => async dispatch => {
  dispatch(setRequests.pending());

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
      getRequests();
    }
  } catch (error) {
    dispatch(setRequests.rejected(error));

    return error.response.data.message;
  }
};
