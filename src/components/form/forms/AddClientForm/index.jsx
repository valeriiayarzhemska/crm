import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { useSelector } from 'react-redux';
import {
  useAddClientMutation,
  useDeleteClientDocumentMutation,
  useDeleteClientMutation,
  useUpdateClientMutation,
} from '../../../../redux/services/clients/clientsApi';
import { selectUserToken } from '../../../../redux/features/user/userSelectors';
import { apiUrl } from '../../../../redux/services/api';
import {
  countriesData,
  countriesDataError,
} from '../../../../redux/features/dashboard/dashboardSelectors';
import { useGetCitiesForCountryQuery } from '../../../../redux/services/data/citiesApi';

import { FormTemplate } from '../FormTemplate';
import { InputsTemplate } from '../../inputs/InputsTemplate';
import { DeleteDialogButton } from '../../DeleteDialogButton';
import { Loader } from '../../../ui/Loader';
import { LoaderProgress } from '../../../ui/LoaderProgress';
import { DocumentsList } from '../../documents/DocumentsList';

import {
  initialValues,
  mock,
  validationSchemaClient,
} from '../../../../lib/mocks/add-client-mock';
import {
  addDataForDepedentSelects,
  getDefaultValues,
  getInitialValues,
  handleResponseError,
} from '../../../../utils/data';
import { closeDialog, handleResetSelectsRefs, showError } from '../../../../utils/ui';
import {
  documentButtonsName,
  selectsDependentNames,
} from '../../../../lib/mocks/add-realty-mock';
import { errorMessages } from '../../../../data/constants';
import { createFormDataClientRequest } from '../../../../utils/utils';
import { links } from '../../../../data/links';

export const AddClientForm = ({
  client = {},
  isEdit = false,
  handleClose = () => {},
}) => {
  const [newInitialValues, setNewInitialValues] = useState({
    ...initialValues,
  });
  const [inputs, setInputs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [error, setError] = useState('');

  const [documents, setDocuments] = useState([]);
  const [filesFromBack, setFilesFromBack] = useState([]);

  const [selectedCountryId, setSelectedCountryId] = useState();
  const [activeSelect, setActiveSelect] = useState('');
  const [multiSelectRefs, setMultiSelectRefs] = useState({});

  const userToken = useSelector(selectUserToken);
  const countries = useSelector(countriesData);
  const countriesError = useSelector(countriesDataError);

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
  const [addNewClient, { isLoading: isAddingLoading, error: addingError }] =
    useAddClientMutation();
  const [editClient, { isLoading: isEditingLoading, error: editingError }] =
    useUpdateClientMutation();
  const [deleteClient, { isLoading: isDeletingLoading, error: deletingError }] =
    useDeleteClientMutation();

  const [
    deleteClientDoc,
    { isLoading: isDeletingDocLoading, error: deletingDocError },
  ] = useDeleteClientDocumentMutation();

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
      response = await editClient({
        token: userToken,
        id: client?.id,
        data: formData,
      });

      errorStatus = await handleResponseError(
        response?.error,
        editingError,
        () => closeDialog({ handleClose })
      );
    } else {
      response = await addNewClient({ token: userToken, data: formData });

      errorStatus = await handleResponseError(
        response?.error,
        addingError,
        () => closeDialog({ handleClose })
      );
    }

    setError(errorStatus);
  };

  const handleDocuments = files => {
    setDocuments(files);
  };

  const handleDelete = async setIsDeleteClick => {
    setIsDeleteClick(false);
    setError(null);

    const response = await deleteClient({
      token: userToken,
      id: client?.id,
    });

    const errorStatus = await handleResponseError(
      response?.error,
      deletingError,
      () => closeDialog({ handleClose })
    );

    setError(errorStatus);
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

    if (isEdit) {
      setNewInitialValues(prevValues => getInitialValues(client, prevValues));

      if (client?.country_id) {
        await setSelectedCountryId(client.country_id);
        selectsData = { countries, cities };
      } else {
        selectsData = { countries };
      }

      mockWithSelectData = await addDataForSelects(selectsData);
      
      const updatedMock = await getDefaultValues(
        client,
        mockWithSelectData,
        selectsData
      );

      setInputs(updatedMock);
    } else {
      selectsData = { countries };
      mockWithSelectData = await addDataForSelects(selectsData);

      setNewInitialValues(initialValues);
      setInputs(mockWithSelectData);
    }

    setIsFirstLoading(false);
  };

  const handleDownLoadDocument = ({ item }) => {
    const downloadUrl = `${apiUrl}${links.clients}/${client.id}/documents/${item.id}/download`;

    window.open(downloadUrl);
  };

  const handleDeleteDocument = async (item, handleCloseDialog) => {
    setIsLoadingProgress(true);
    setError(null);

    const response = await deleteClientDoc({
      token: userToken,
      id: client?.id,
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

  useEffect(() => {
    if (activeSelect) {
      handleResetSelectsRefs(activeSelect, multiSelectRefs);
    }
  }, [activeSelect, selectedCountryId]);

  useEffect(() => {
    if (isFirstLoading) {
      const errors = countriesError || citiesError;
      const checkCountries = countries && countries?.length > 0;

      if ((!isEdit && checkCountries) || (isEdit && checkCountries && client)) {
        updateMock();

        if (isEdit && client?.documents && client?.documents?.length > 0) {
          setFilesFromBack(client.documents);
        }
      }

      if (errors) {
        setError(errorMessages.countriesOrCitites);
        setInputs(mock);
      }

      setIsLoading(false);
    }
  }, [countries, client]);

  useEffect(() => {
    showError(error);
  }, [error]);

  return (
    <>
      {isLoadingProgress && <LoaderProgress />}

      <div className="relative flex flex-col gap-4 w-[260px] sm:w-[420px] exclude-click">
        {!isLoading && inputs && inputs.length > 0 && (
          <FormTemplate
            initialValues={newInitialValues}
            validationSchema={Yup.object(validationSchemaClient)}
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
        )}

        {!error && (!inputs || inputs.length < 1 || isLoading) && (
          <div className="flex items-center justify-center pt-6 h-[1000px]">
            <Loader
              height={40}
              width={40}
            />
          </div>
        )}
      </div>
    </>
  );
};
