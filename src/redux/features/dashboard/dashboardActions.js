export const addData = (data, setData) => async dispatch => {
  await dispatch(setData.pending());

  try {
    await dispatch(setData.fulfilled(data));
  } catch (error) {
    await dispatch(setData.rejected(error));
  }
};
