import { Fragment, useEffect, useState } from 'react';
import * as Yup from 'yup';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../../../redux/features/user/userSelectors';
import {
  useAddCityMutation,
  useDeleteCityMutation,
  useGetCityQuery,
  useUpdateCityMutation,
} from '../../../../../redux/services/data/citiesApi';
import {
  citiesData,
  citiesDataError,
  citiesDataLoading,
} from '../../../../../redux/features/dashboard/dashboardSelectors';

import { FormTemplate } from '../../FormTemplate';
import { InputsTemplate } from '../../../inputs/InputsTemplate';
import { Loader } from '../../../../ui/Loader';
import { InputList } from '../../../inputs/InputList';
import { DeleteDialogButton } from '../../../DeleteDialogButton';

import {
  initialValues,
  mock,
  validationSchemaCity,
} from '../../../../../lib/mocks/add-city-mock';
import {
  getInitialValues,
  addDataForDepedentSelects,
  getDefaultValues,
  handleResponseError,
  transformArrayToObject,
} from '../../../../../utils/data';
import { errorMessages, selectsLocationNames } from '../../../../../data/constants';
import { closeDialog, showError } from '../../../../../utils/ui';

export const AddCityForm = ({
  formProps = {},
  name = {},
  isEdit = false,
  handleClose = () => {},
  handleResetInput = () => {},
}) => {
  const [newInitialValues, setNewInitialValues] = useState({
    ...initialValues,
  });
  const [inputs, setInputs] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const userToken = useSelector(selectUserToken);
  const cities = useSelector(citiesData);
  const citiesLoading = useSelector(citiesDataLoading);
  const citiesError = useSelector(citiesDataError);
  const inputValue = formProps?.values?.[name];

  const {
    data: city,
    isFetching: isCityLoading,
    error: cityError,
  } = useGetCityQuery(
    { token: userToken, id: formProps?.values[name] },
    { skip: !formProps?.values[name] || !userToken }
  );
  const [addNewCity, { isLoading: isAddingLoading, error: addingError }] =
    useAddCityMutation();
  const [editCity, { isLoading: isEditingLoading, error: editingError }] =
    useUpdateCityMutation();
  const [deleteCity, { isLoading: isDeletingLoading, error: deletingError }] =
    useDeleteCityMutation();

  const handleDelete = async setIsDeleteClick => {
    setIsDeleteClick(false);
    setError('');

    const response = await deleteCity({
      token: userToken,
      id: formProps?.values?.[name],
    });

    const errorStatus = await handleResponseError(
      response?.error,
      deletingError,
      () => closeDialog({ handleClose })
    );

    if (!errorStatus) {
      handleResetInput();
    }

    setError(errorStatus);
  };

  const updateMock = async () => {
    const mockWithCountries = await addDataForDepedentSelects({
      cities,
      mock,
    });

    if (isEdit) {
      setNewInitialValues(prevValues => getInitialValues(city, prevValues));

      const mockWithValues = await getDefaultValues(city, mockWithCountries);
      const updatedMock = await transformArrayToObject(mockWithValues);

      setInputs(updatedMock);
      setIsLoading(false);
    } else {
      const updatedMock = await transformArrayToObject(mockWithCountries);

      setNewInitialValues(initialValues);
      setInputs(updatedMock);
      setIsLoading(false);
    }
  };

  const handleSubmit = async values => {
    setError(null);

    const newValues = {
      ...values,
      country_id: formProps?.values[selectsLocationNames.country],
    };
    let response;
    let errorStatus;

    if (isEdit) {
      response = await editCity({
        token: userToken,
        id: inputValue,
        data: newValues,
      });

      errorStatus = await handleResponseError(
        response?.error,
        editingError,
        () => closeDialog({ handleClose })
      );
    } else {
      response = await addNewCity({ token: userToken, data: newValues });

      errorStatus = await handleResponseError(
        response?.error,
        addingError,
        () => closeDialog({ handleClose })
      );
    }

    setError(errorStatus);
  };

  useEffect(() => {
    if (!citiesLoading && !isCityLoading) {
      if ((isEdit && city && cities) || (!isEdit && cities)) {
        updateMock();
      }
    }

    if (citiesError || cityError) {
      setError(errorMessages.wentWrong);
      setIsLoading(false);
    }
  }, [cities, city, citiesLoading, isCityLoading]);

  useEffect(() => {
    showError(error);
  }, [error]);

  return (
    <div className="relative flex flex-col gap-4 w-[260px] sm:w-[420px] exclude-click">
      {!isLoading && (
        <FormTemplate
          initialValues={newInitialValues}
          validationSchema={Yup.object(validationSchemaCity)}
          handleSubmitForm={handleSubmit}
          buttonText={'Save'}
          bgColor={'bg-purpleColor border-purpleColor'}
        >
          {formProps => (
            <>
              {Object.keys(inputs).map((property, index) => {
                return (
                  <Fragment key={index}>
                    {property.includes('inputs') && (
                      <InputsTemplate
                        formProps={formProps}
                        inputsList={inputs[property]}
                      />
                    )}

                    {property.includes('listId') && (
                      <InputList
                        formProps={formProps}
                        inputs={inputs[property]}
                      />
                    )}
                  </Fragment>
                );
              })}

              {isEdit && (
                <DeleteDialogButton
                  isDeletingLoading={isDeletingLoading}
                  handleDelete={handleDelete}
                  error={error}
                />
              )}
            </>
          )}
        </FormTemplate>
      )}

      {isLoading && (
        <div className="flex items-center justify-center w-full h-[326px]">
          <Loader />
        </div>
      )}
    </div>
  );
};
