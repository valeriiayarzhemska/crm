import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'sonner';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../../../redux/features/user/userSelectors';
import {
  useAddResidenceMutation,
  useDeleteResidenceMutation,
  useGetResidenceQuery,
  useUpdateResidenceMutation,
} from '../../../../../redux/services/data/residencesApi';
import {
  districtsData,
  districtsDataError,
  districtsDataLoading,
  streetsNumbersData,
  streetsNumbersDataError,
  streetsNumbersDataLoading,
} from '../../../../../redux/features/dashboard/dashboardSelectors';

import { FormTemplate } from '../../FormTemplate';
import { AccordionInputs } from '../../../AccordionInputs';
import { closeDialog, showError } from '../../../../../utils/ui';
import { Loader } from '../../../../ui/Loader';

import {
  booleanValues,
  initialValues,
  mock,
  mockAccordionTitlesResidence,
  validationSchemaResidence,
} from '../../../../../lib/mocks/add-residence-mock';
import {
  addDataForDepedentSelects,
  getDefaultValues,
  getInitialValues,
  handleResponseError,
} from '../../../../../utils/data';
import { errorMessages, selectsLocationNames } from '../../../../../data/constants';
import { DeleteDialogButton } from '../../../DeleteDialogButton';
import { equipmentInitialValues } from '../../../../../lib/mocks/add-realty-mock/equipment-mock';
import { createFormData } from '../../../../../utils/utils';

export const AddResidenceForm = ({
  isEdit = false,
  formProps: formPropsRealty = {},
  handleClose,
  handleResetInput,
}) => {
  const [newInitialValues, setNewInitialValues] = useState({
    ...initialValues,
  });
  const [inputs, setInputs] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [multiSelectRefs, setMultiSelectRefs] = useState({});

  const userToken = useSelector(selectUserToken);

  const districts = useSelector(districtsData);
  const districtsLoading = useSelector(districtsDataLoading);
  const districtsError = useSelector(districtsDataError);
  const streetsNumbers = useSelector(streetsNumbersData);
  const streetsNumbersLoading = useSelector(streetsNumbersDataLoading);
  const streetsNumbersError = useSelector(streetsNumbersDataError);

  const {
    data: residence,
    isFetching: isResidenceLoading,
    error: residenceError,
  } = useGetResidenceQuery(
    {
      token: userToken,
      id: formPropsRealty?.values[selectsLocationNames.residence_id],
    },
    {
      skip:
        !formPropsRealty?.values[selectsLocationNames.city] ||
        !userToken ||
        !isEdit,
    }
  );
  const [addNewResidence, { isLoading: isAddingLoading, error: addingError }] =
    useAddResidenceMutation();
  const [editResidence, { isLoading: isEditingLoading, error: editingError }] =
    useUpdateResidenceMutation();
  const [
    deleteResidence,
    { isLoading: isDeletingLoading, error: deletingError },
  ] = useDeleteResidenceMutation();

  const selectValues = {
    country_id: formPropsRealty?.values[selectsLocationNames.country],
    city_id: formPropsRealty?.values[selectsLocationNames.city],
    street_id: formPropsRealty?.values[selectsLocationNames.street],
  };

  const handleDelete = async setIsDeleteClick => {
    setIsDeleteClick(false);
    setError('');

    const response = await deleteResidence({
      token: userToken,
      id: formPropsRealty?.values[selectsLocationNames.residence_id],
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
    const selectsData = {
      districts,
      streetsNumbers,
    };
    const mockWithData = await addDataForDepedentSelects({
      ...selectsData,
      mock,
    });

    if (isEdit) {
      setNewInitialValues(prevValues =>
        getInitialValues(residence, { ...prevValues, ...selectValues })
      );

      const mockWithValues = await getDefaultValues(
        residence,
        mockWithData,
        selectsData
      );

      setInputs(mockWithValues);
    } else {
      setNewInitialValues({ ...initialValues, ...selectValues });
      setInputs(mockWithData);
    }
  };

  const handleSubmit = async values => {
    setError(null);

    let response;
    let errorStatus;

    const newValues = {
      ...values,
      ...selectValues,
    };

    const formData = await createFormData({
      values: newValues,
      keyArrayValues: equipmentInitialValues,
      keyBooleanValues: booleanValues,
    });

    if (isEdit) {
      response = await editResidence({
        token: userToken,
        id: formPropsRealty?.values[selectsLocationNames.residence_id],
        data: formData,
      });

      errorStatus = await handleResponseError(
        response?.error,
        editingError,
        () => closeDialog({ handleClose })
      );
    } else {
      response = await addNewResidence({
        token: userToken,
        data: formData,
      });

      errorStatus = await handleResponseError(
        response?.error,
        addingError,
        () => closeDialog({ handleClose })
      );
    }

    setError(errorStatus);
  };

  useEffect(() => {
    if (
      !isResidenceLoading &&
      !districtsLoading &&
      !streetsNumbersLoading &&
      inputs.length < 1
    ) {
      if (
        (isEdit && residence && districts && streetsNumbers) ||
        (!isEdit && districts && streetsNumbers)
      ) {
        updateMock();
        setIsLoading(false);
      }
    }

    if (residenceError || districtsError || streetsNumbersError) {
      setError(errorMessages.wentWrong);
      setIsLoading(false);
    }
  }, [
    residence,
    districts,
    streetsNumbers,
    isResidenceLoading,
    districtsLoading,
    streetsNumbersLoading,
  ]);

  useEffect(() => {
    showError(error);
  }, [error]);

  return (
    <div className="relative flex flex-col gap-4 w-[260px] sm:w-[420px] exclude-click">
      {!isLoading && (
        <FormTemplate
          initialValues={newInitialValues}
          validationSchema={Yup.object(validationSchemaResidence)}
          handleSubmitForm={handleSubmit}
          buttonText={'Save'}
          bgColor={'bg-purpleColor border-purpleColor'}
        >
          {formProps => (
            <>
              <div>
                {Object.entries(mockAccordionTitlesResidence).map(
                  ([key, title]) => {
                    return (
                      <AccordionInputs
                        title={title}
                        mock={inputs}
                        formProps={formProps}
                        key={key}
                        setMultiSelectRefs={setMultiSelectRefs}
                      />
                    );
                  }
                )}
              </div>

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
        <div className="flex items-center justify-center w-full h-[218px]">
          <Loader />
        </div>
      )}
    </div>
  );
};
