import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../../../redux/features/user/userSelectors';
import {
  citiesData,
  citiesDataError,
  citiesDataLoading,
} from '../../../../../redux/features/dashboard/dashboardSelectors';
import {
  useAddDistrictMutation,
  useDeleteDistrictMutation,
  useGetDistrictQuery,
  useUpdateDistrictMutation,
} from '../../../../../redux/services/data/districtsApi';

import { FormTemplate } from '../../FormTemplate';
import { InputsTemplate } from '../../../inputs/InputsTemplate';
import { Loader } from '../../../../ui/Loader';
import { DeleteDialogButton } from '../../../DeleteDialogButton';

import {
  initialValues,
  mock,
  validationSchemaDistrict,
} from '../../../../../lib/mocks/add-district-mock';
import {
  addDataForDepedentSelects,
  getDefaultValueByValue,
  getDefaultValues,
  getInitialValues,
  handleResponseError,
} from '../../../../../utils/data';
import { errorMessages, selectsLocationNames } from '../../../../../data/constants';
import { closeDialog, showError } from '../../../../../utils/ui';

export const AddDistrictForm = ({
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
    data: district,
    isFetching: isDistrictLoading,
    error: districtError,
  } = useGetDistrictQuery(
    { token: userToken, id: inputValue },
    { skip: !inputValue || !userToken }
  );
  const [addNewDistrict, { isLoading: isAddingLoading, error: addingError }] =
    useAddDistrictMutation();
  const [editDistrict, { isLoading: isEditingLoading, error: editingError }] =
    useUpdateDistrictMutation();
  const [
    deleteDistrict,
    { isLoading: isDeletingLoading, error: deleteingError },
  ] = useDeleteDistrictMutation();

  const handleDelete = async setIsDeleteClick => {
    setIsDeleteClick(false);
    setError('');

    const response = await deleteDistrict({
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

        return getInitialValues(district, updatedValues);
      });

      const valuesData = hasSelectedCity
        ? { ...district, ...selectedCity }
        : district;
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
      response = await editDistrict({
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
      response = await addNewDistrict({ token: userToken, data: values });

      errorStatus = await handleResponseError(
        response?.error,
        addingError,
        () => closeDialog({ handleClose })
      );
    }

    setError(errorStatus);
  };

  useEffect(() => {
    if (!citiesLoading && !isDistrictLoading) {
      if ((isEdit && district && cities) || (!isEdit && cities)) {
        updateMock();
      }
    }

    if (citiesError || districtError) {
      setError(errorMessages.wentWrong);
      setIsLoading(false);
    }
  }, [citiesLoading, isDistrictLoading]);

  useEffect(() => {
    showError(error);
  }, [error]);

  return (
    <div className="relative flex flex-col gap-4 w-[260px] sm:w-[420px] exclude-click">
      {!isLoading && (
        <FormTemplate
          initialValues={newInitialValues}
          validationSchema={Yup.object(validationSchemaDistrict)}
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
                  error={error}
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
