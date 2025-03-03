import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'sonner';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../../../redux/features/user/userSelectors';
import {
  citiesData,
  citiesDataError,
  citiesDataLoading,
} from '../../../../../redux/features/dashboard/dashboardSelectors';
import {
  useAddStreetMutation,
  useDeleteStreetMutation,
  useGetStreetQuery,
  useUpdateStreetMutation,
} from '../../../../../redux/services/data/streetsApi';

import { FormTemplate } from '../../FormTemplate';
import { InputsTemplate } from '../../../inputs/InputsTemplate';
import { Loader } from '../../../../ui/Loader';
import { DeleteDialogButton } from '../../../DeleteDialogButton';

import {
  initialValues,
  mock,
  validationSchemaStreet,
} from '../../../../../lib/mocks/add-street-mock';
import {
  addDataForDepedentSelects,
  getDefaultValueByValue,
  getDefaultValues,
  getInitialValues,
  handleResponseError,
} from '../../../../../utils/data';
import { closeDialog, showError } from '../../../../../utils/ui';
import { errorMessages, selectsLocationNames } from '../../../../../data/constants';

export const AddStreetForm = ({
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
    data: street,
    isFetching: isStreetLoading,
    error: streetError,
  } = useGetStreetQuery(
    { token: userToken, id: inputValue },
    { skip: !inputValue || !userToken }
  );
  const [addNewStreet, { isLoading: isAddingLoading, error: addingError }] =
    useAddStreetMutation();
  const [editStreet, { isLoading: isEditingLoading, error: editingError }] =
    useUpdateStreetMutation();
  const [
    deleteStreet,
    { isLoading: isDeletingLoading, error: deleteingError },
  ] = useDeleteStreetMutation();

  const handleDelete = async setIsDeleteClick => {
    setIsDeleteClick(false);
    setError('');

    const response = await deleteStreet({
      token: userToken,
      id: inputValue,
    });

    const errorStatus = await handleResponseError(
      response?.error,
      deleteingError,
      () => closeDialog({ handleClose })
    );

    if (!errorStatus) {
      handleResetInput();
    }

    setError(errorStatus);
  };

  const updateMock = async () => {
    const hasSelectedCity = formProps?.values[selectsLocationNames.city];
    let selectedCity = {};
    let newMock = await addDataForDepedentSelects({
      cities,
      mock,
    });

    if (hasSelectedCity) {
      selectedCity = {
        city_id: getDefaultValueByValue(hasSelectedCity, cities),
      };
    }

    if (isEdit) {
      setNewInitialValues(prevValues => {
        const updatedValues = hasSelectedCity
          ? { ...prevValues, city_id: hasSelectedCity }
          : prevValues;

        return getInitialValues(street, updatedValues);
      });

      const valuesData = hasSelectedCity
        ? { ...street, ...selectedCity }
        : street;
      const mockWithValues = await getDefaultValues(valuesData, newMock);

      setInputs(mockWithValues);
      setIsLoading(false);
    } else {
      if (hasSelectedCity) {
        newMock = await getDefaultValues(selectedCity, newMock);
      }

      const updatedInitialValues = hasSelectedCity
        ? { ...initialValues, city_id: hasSelectedCity }
        : initialValues;

      setNewInitialValues(updatedInitialValues);
      setInputs(newMock);
      setIsLoading(false);
    }
  };

  const handleSubmit = async values => {
    setError(null);

    let response;
    let errorStatus;

    if (isEdit) {
      response = await editStreet({
        token: userToken,
        id: inputValue,
        data: values,
      });

      errorStatus = await handleResponseError(
        response?.error,
        editingError,
        () => closeDialog({ handleClose })
      );
    } else {
      response = await addNewStreet({ token: userToken, data: values });

      errorStatus = await handleResponseError(
        response?.error,
        addingError,
        () => closeDialog({ handleClose })
      );
    }

    setError(errorStatus);
  };

  useEffect(() => {
    if (!citiesLoading && !isStreetLoading) {
      if ((isEdit && street && cities) || (!isEdit && cities)) {
        updateMock();
      }
    }

    if (citiesError || streetError) {
      setError(errorMessages.wentWrong);
      setIsLoading(false);
    }
  }, [citiesLoading, isStreetLoading]);

  useEffect(() => {
    showError(error);
  }, [error]);

  return (
    <div className="relative flex flex-col gap-4 w-[260px] sm:w-[420px] exclude-click">
      {!isLoading && (
        <FormTemplate
          initialValues={newInitialValues}
          validationSchema={Yup.object(validationSchemaStreet)}
          handleSubmitForm={handleSubmit}
          buttonText={'Save'}
          bgColor={'bg-purpleColor border-purpleColor'}
        >
          {formProps => (
            <>
              <InputsTemplate
                formProps={formProps}
                inputsList={inputs}
              />

              {isEdit && (
                <DeleteDialogButton
                  isDeletingLoading={isDeletingLoading}
                  handleDelete={handleDelete}
                />
              )}
            </>
          )}
        </FormTemplate>
      )}

      {isLoading && (
        <div className="flex items-center justify-center w-full h-[152px]">
          <Loader />
        </div>
      )}
    </div>
  );
};
