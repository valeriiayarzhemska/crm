import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import * as Yup from 'yup';
import cn from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import { selectUserToken } from '../../../../redux/features/user/userSelectors';
import {
  useAddRequestMutation,
  useDeleteRequestDocumentMutation,
  useDeleteRequestMutation,
  useUpdateRequestMutation,
} from '../../../../redux/services/requests/requestsApi';
import {
  agentsData,
  agentsDataError,
  countriesData,
  countriesDataError,
} from '../../../../redux/features/dashboard/dashboardSelectors';
import { useGetCitiesForCountryQuery } from '../../../../redux/services/data/citiesApi';
import { apiUrl } from '../../../../redux/services/api';
import { setSearchClientInfo, setSearchRequestInfo } from '../../../../redux/features/dashboard/dashboardSlice';

import { FormTemplate } from '../FormTemplate';
import { ButtonTemplate } from '../../../ui/buttons/ButtonTemplate';
import { InputsTemplate } from '../../inputs/InputsTemplate';
import { Loader } from '../../../ui/Loader';
import { DeleteDialogButton } from '../../DeleteDialogButton';
import { LoaderProgress } from '../../../ui/LoaderProgress';
import { DocumentsList } from '../../documents/DocumentsList';

import {
  initialValues,
  mock,
  validationSchemaRequest,
} from '../../../../lib/mocks/add-request-mock';
import {
  addDataForDepedentSelects,
  getDefaultValues,
  getInitialValues,
  handleResponseError,
} from '../../../../utils/data';
import {
  closeDialog,
  handleResetSelectsRefs,
  showError,
  transformAssistantsDataInputs,
} from '../../../../utils/ui';
import { errorMessages } from '../../../../data/constants';
import {
  documentButtonsName,
  selectsDependentNames,
} from '../../../../lib/mocks/add-realty-mock';
import { links } from '../../../../data/links';
import { createFormDataClientRequest } from '../../../../utils/utils';

export const AddRequestForm = ({
  request = {},
  client = {},
  isEdit = false,
  setShowAddRequestForm = () => {},
}) => {
  const [newInitialValues, setNewInitialValues] = useState({
    ...initialValues,
  });
  const [inputs, setInputs] = useState([]);
  const [error, setError] = useState('');
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);

  const [documents, setDocuments] = useState([]);
  const [filesFromBack, setFilesFromBack] = useState([]);

  const [selectedCountryId, setSelectedCountryId] = useState();
  const [activeSelect, setActiveSelect] = useState('');
  const [multiSelectRefs, setMultiSelectRefs] = useState({});

  const userToken = useSelector(selectUserToken);
  const assistants = useSelector(agentsData);
  const assistantsError = useSelector(agentsDataError);
  const countries = useSelector(countriesData);
  const countriesError = useSelector(countriesDataError);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: cities,
    isLoading: isCitiesLoading,
    error: citiesError,
  } = useGetCitiesForCountryQuery(
    {
      country_id: selectedCountryId,
      isSettingRedux: true,
    },
    {
      skip: !selectedCountryId,
      refetchOnMountOrArgChange: true,
    }
  );
  const [addNewRequest, { isLoading: isAddingLoading, error: addingError }] =
    useAddRequestMutation();
  const [editRequest, { isLoading: isEditingLoading, error: editingError }] =
    useUpdateRequestMutation();
  const [
    deleteRequest,
    { isLoading: isDeletingLoading, error: deletingError },
  ] = useDeleteRequestMutation();

  const [
    deleteRequestDoc,
    { isLoading: isDeletingDocLoading, error: deletingDocError },
  ] = useDeleteRequestDocumentMutation();

  const handleResetCountrySelect = selectsToReset => {
    setActiveSelect(selectsToReset);
  };

  const handleCountrySelect = async selectedItem => {
    await setSelectedCountryId(selectedItem?.value);
    handleResetCountrySelect(selectsDependentNames.countryId);
  };

  const handleSubmit = async values => {
    setError(null);

    let response;
    let errorStatus;
    const formData = await createFormDataClientRequest(values, documents);

    if (isEdit) {
      response = await editRequest({
        token: userToken,
        id: request?.id,
        data: formData,
      });

      errorStatus = await handleResponseError(
        response?.error,
        editingError,
        () => closeDialog({ setState: setShowAddRequestForm })
      );
    } else {
      response = await addNewRequest({
        token: userToken,
        client_id: client?.id,
        data: formData,
      });

      errorStatus = await handleResponseError(
        response?.error,
        addingError,
        () => closeDialog({ setState: setShowAddRequestForm })
      );
    }

    setError(errorStatus);
  };

  const handleDelete = async setIsDeleteClick => {
    setIsDeleteClick(false);
    setError(null);

    const response = await deleteRequest({
      token: userToken,
      id: request?.id,
    });

    const errorStatus = await handleResponseError(
      response?.error,
      deletingError,
      () => closeDialog({ setState: setShowAddRequestForm })
    );

    setError(errorStatus);
  };

  const handleMatchingClick = async () => {
    await navigate('/');
    await dispatch(setSearchClientInfo(client));
    await dispatch(setSearchRequestInfo(request));
  };

  const handleDocuments = files => {
    setDocuments(files);
  };

  const handleDownLoadDocument = ({ item }) => {
    const downloadUrl = `${apiUrl}${links.requests}/${request.id}/documents/${item.id}/download`;

    window.open(downloadUrl);
  };

  const handleDeleteDocument = async (item, handleCloseDialog) => {
    setIsLoadingProgress(true);
    setError(null);

    const response = await deleteRequestDoc({
      token: userToken,
      id: request?.id,
      document_id: item.id,
    });

    const errorStatus = await handleResponseError(
      response?.error,
      deletingDocError,
      () => closeDialog({ handleClose: handleCloseDialog })
    );

    if (errorStatus) {
      setError(errorStatus);
    }

    setIsLoadingProgress(false);
  };

  const buttonsHandlers = {
    [documentButtonsName.download]: handleDownLoadDocument,
  };

  const addDataForSelects = async props => {
    const updatedmock = await addDataForDepedentSelects({
      ...props,
      handleCountrySelect,
      mock,
    });

    return updatedmock;
  };

  const updateMock = async () => {
    let selectsData = {};
    let mockWithSelectData = [];
    const updatedAssistants = await transformAssistantsDataInputs(assistants);

    if (isEdit) {
      setNewInitialValues(prevValues => getInitialValues(request, prevValues));

      if (request?.country_id) {
        await setSelectedCountryId(request.country_id);
        selectsData = { countries, cities, assistants: updatedAssistants };
      } else {
        selectsData = { countries, assistants: updatedAssistants };
      }

      mockWithSelectData = await addDataForSelects(selectsData);
      const updatedMock = await getDefaultValues(
        request,
        mockWithSelectData,
        selectsData
      );

      setInputs(updatedMock);
    } else {
      selectsData = { countries, assistants: updatedAssistants };
      mockWithSelectData = await addDataForSelects(selectsData);

      setNewInitialValues(initialValues);
      setInputs(mockWithSelectData);
    }

    setIsFirstLoading(false);
  };

  useEffect(() => {
    if (activeSelect) {
      handleResetSelectsRefs(activeSelect, {
        ...multiSelectRefs,
      });
    }
  }, [activeSelect, selectedCountryId]);

  useEffect(() => {
    if (isFirstLoading) {
      const errors = countriesError || citiesError || assistantsError;
      const checkCountries = countries && countries?.length > 0;

      if (
        (!isEdit && checkCountries && assistants) ||
        (isEdit && checkCountries && assistants && request)
      ) {
        updateMock();

        if (isEdit && request?.documents && request?.documents?.length > 0) {
          setFilesFromBack(request.documents);
        }
      }

      if (errors) {
        setError(errorMessages.wentWrong);
      }

      setIsLoading(false);
    }
  }, [countries, assistants, request]);

  useEffect(() => {
    showError(error);
  }, [error]);

  return (
    <>
      {isLoadingProgress && <LoaderProgress />}

      <div
        className={cn('relative flex flex-col gap-4 w-full exclude-click', {
          'min-h-screen': !assistants || assistants.length < 1,
        })}
      >
        {!error && (!inputs || inputs.length < 1 || isLoading) && (
          <div className="flex justify-center items-center w-full min-h-screen">
            <Loader />
          </div>
        )}

        {!isLoading && inputs.length > 0 && (
          <>
            <div>
              <ButtonTemplate
                text={'Matching'}
                handleClick={handleMatchingClick}
              />
            </div>

            <FormTemplate
              initialValues={newInitialValues}
              validationSchema={Yup.object(validationSchemaRequest)}
              handleSubmitForm={handleSubmit}
              buttonText={'Save'}
              bgColor={'bg-purpleColor border-purpleColor'}
            >
              {formProps => (
                <>
                  <InputsTemplate
                    formProps={formProps}
                    inputsList={inputs}
                    setMultiSelectRefs={setMultiSelectRefs}
                  />

                  <DocumentsList
                    formProps={formProps}
                    buttonsHandlers={buttonsHandlers}
                    handleDocuments={handleDocuments}
                    filesFromBack={filesFromBack}
                    handleDeleteDocument={handleDeleteDocument}
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
          </>
        )}
      </div>
    </>
  );
};
