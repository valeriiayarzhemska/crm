import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'sonner';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../../../redux/features/user/userSelectors';
import {
  streetsData,
  streetsDataError,
  streetsDataLoading,
} from '../../../../../redux/features/dashboard/dashboardSelectors';
import {
  useAddStreetNumberMutation,
  useDeleteStreetNumberMutation,
  useGetStreetNumberQuery,
  useUpdateStreetNumberMutation,
} from '../../../../../redux/services/data/streetsNumberApi';

import { FormTemplate } from '../../FormTemplate';
import { InputsTemplate } from '../../../inputs/InputsTemplate';
import { Loader } from '../../../../ui/Loader';
import { DeleteDialogButton } from '../../../DeleteDialogButton';
import { ToasterComponent } from '../../../../ui/ToasterComponent';

import {
  initialValues,
  mock,
  validationSchemaStreetNumber,
} from '../../../../../lib/mocks/add-street-number-mock';
import {
  addDataForDepedentSelects,
  getDefaultValueByValue,
  getDefaultValues,
  getInitialValues,
  handleResponseError,
} from '../../../../../utils/data';
import { closeDialog, disableBodyScroll, showError } from '../../../../../utils/ui';
import { errorMessages, selectsLocationNames } from '../../../../../data/constants';

export const AddStreetNumberForm = ({
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
  const [selectedStreetId, setSelectedStreetId] = useState();

  const userToken = useSelector(selectUserToken);
  const streets = useSelector(streetsData);
  const streetsLoading = useSelector(streetsDataLoading);
  const streetsError = useSelector(streetsDataError);
  const inputValue = formProps?.values?.[name];

  const {
    data: streetNumber,
    isFetching: isStreetNumberLoading,
    error: streetNumberError,
  } = useGetStreetNumberQuery(
    { token: userToken, id: inputValue },
    { skip: !inputValue || !userToken }
  );
  const [
    addNewStreetNumber,
    { isLoading: isAddingLoading, error: addingError },
  ] = useAddStreetNumberMutation();
  const [
    editStreetNumber,
    { isLoading: isEditingLoading, error: editingError },
  ] = useUpdateStreetNumberMutation();
  const [
    deleteStreetNumber,
    { isLoading: isDeletingLoading, error: deletingError },
  ] = useDeleteStreetNumberMutation();

  const handleDelete = async setIsDeleteClick => {
    setIsDeleteClick(false);
    setError('');

    const response = await deleteStreetNumber({
      token: userToken,
      id: inputValue,
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
    const hasSelectedStreet = formProps?.values[selectsLocationNames.street];
    let selectedStreet = {};
    let newMock = await addDataForDepedentSelects({
      streets,
      mock,
    });

    if (hasSelectedStreet) {
      selectedStreet = {
        street_id: getDefaultValueByValue(hasSelectedStreet, streets),
      };
    }

    if (isEdit) {
      setNewInitialValues(prevValues => {
        const updatedValues = hasSelectedStreet
          ? { ...prevValues, street_id: hasSelectedStreet }
          : prevValues;

        return getInitialValues(streetNumber, updatedValues);
      });

      const valuesData = hasSelectedStreet
        ? { ...streetNumber, ...selectedStreet }
        : streetNumber;
      const mockWithValues = await getDefaultValues(valuesData, newMock);

      setInputs(mockWithValues);
      setIsLoading(false);
    } else {
      if (hasSelectedStreet) {
        newMock = await getDefaultValues(selectedStreet, newMock);
      }

      const updatedInitialValues = hasSelectedStreet
        ? { ...initialValues, street_id: hasSelectedStreet }
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
      response = await editStreetNumber({
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
      response = await addNewStreetNumber({ token: userToken, data: values });

      errorStatus = await handleResponseError(
        response?.error,
        addingError,
        () => closeDialog({ handleClose })
      );
    }

    setError(errorStatus);
  };

  useEffect(() => {
    if (!streetsLoading && !isStreetNumberLoading) {
      if ((isEdit && streetNumber && streets) || (!isEdit && streets)) {
        updateMock();
      }
    }

    if (streetsError || streetNumberError) {
      setError(errorMessages.wentWrong);
      setIsLoading(false);
    }
  }, [streetsLoading, isStreetNumberLoading]);

  useEffect(() => {
    showError(error);
  }, [error]);

  return (
    <div className="relative flex flex-col gap-4 w-[260px] sm:w-[420px] exclude-click">
      {!isLoading && (
        <FormTemplate
          initialValues={newInitialValues}
          validationSchema={Yup.object(validationSchemaStreetNumber)}
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
