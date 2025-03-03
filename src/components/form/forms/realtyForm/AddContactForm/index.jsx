import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../../../redux/features/user/userSelectors';
import {
  useAddContactMutation,
  useDeleteContactMutation,
  useGetContactQuery,
  useUpdateContactMutation,
} from '../../../../../redux/services/contacts/contactsApi';

import { FormTemplate } from '../../FormTemplate';
import { ButtonTemplate } from '../../../../ui/buttons/ButtonTemplate';
import { InputsTemplate } from '../../../inputs/InputsTemplate';
import { InputList } from '../../../inputs/InputList';
import { Loader } from '../../../../ui/Loader';
import { DeleteDialogButton } from '../../../DeleteDialogButton';

import {
  initialValues,
  mock,
  mockContactsAdditional,
  validationSchemaContact,
} from '../../../../../lib/mocks/add-contact-mock';
import {
  compareContactsInfo,
  getDefaultValues,
  getInitialValues,
  handleResponseError,
} from '../../../../../utils/data';
import { closeDialog, showError } from '../../../../../utils/ui';
import { errorMessages } from '../../../../../data/constants';

const buttonsTitle = {
  show: 'Show additional fields',
  hide: 'Hide additional fields',
};

export const AddContactForm = ({
  contactId = null,
  contactInfo = {},
  formProps = {},
  name = '',
  isEdit = false,
  handleClose = () => {},
  handleResetInput = () => {},
}) => {
  const [newInitialValues, setNewInitialValues] = useState({
    ...initialValues,
  });
  const [inputs, setInputs] = useState([]);
  const [inputsAdditional, setInputsAdditional] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [buttonTitle, setButtonTitle] = useState(buttonsTitle.show);
  const [isAdditionalOpen, setIsAdditionalOpen] = useState(false);

  const userToken = useSelector(selectUserToken);
  const inputValue = formProps?.values?.[name];

  const {
    data: contact,
    isFetching: isContactLoading,
    error: contactError,
  } = useGetContactQuery(
    { token: userToken, id: contactId ? contactId : inputValue },
    { skip: (!inputValue && !contactId) || !userToken }
  );
  const [addNewContact, { isLoading: isAddingLoading, error: addingError }] =
    useAddContactMutation();
  const [editContact, { isLoading: isEditingLoading, error: editingError }] =
    useUpdateContactMutation();
  const [
    deleteContact,
    { isLoading: isDeletingLoading, error: deletingError },
  ] = useDeleteContactMutation();

  const handleAdditionalClick = () => {
    setButtonTitle(isAdditionalOpen ? buttonsTitle.show : buttonsTitle.hide);

    setIsAdditionalOpen(!isAdditionalOpen);
  };

  const handleDelete = async setIsDeleteClick => {
    setIsDeleteClick(false);
    setError('');

    const response = await deleteContact({
      token: userToken,
      id: contactId ? contactId : inputValue,
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
    if (isEdit) {
      setNewInitialValues(prevValues => getInitialValues(contact, prevValues));

      const updatedMock = await getDefaultValues(contact, mock);
      const updatedMockAdditional = await getDefaultValues(
        contact,
        mockContactsAdditional
      );

      setInputs(updatedMock);
      setInputsAdditional(updatedMockAdditional);
      setIsLoading(false);
    } else {
      setNewInitialValues(initialValues);
      setInputs(mock);
      setInputsAdditional(mockContactsAdditional);
      setIsLoading(false);
    }
  };

  const handleSubmit = async values => {
    setError(null);

    let response;
    let errorStatus;

    if (isEdit) {
      response = await editContact({
        token: userToken,
        id: contactId ? contactId : inputValue,
        data: values,
      });

      if (
        !response?.error &&
        !editingError &&
        typeof contactInfo === 'object' &&
        contactInfo != null
      ) {
        await compareContactsInfo(contactInfo, values);
      }

      errorStatus = await handleResponseError(
        response?.error,
        editingError,
        () => closeDialog({ handleClose })
      );
    } else {
      response = await addNewContact({ token: userToken, data: values });

      errorStatus = await handleResponseError(
        response?.error,
        addingError,
        () => closeDialog({ handleClose })
      );
    }

    setError(errorStatus);
  };

  useEffect(() => {
    if ((isEdit && !isContactLoading) || !isEdit) {
      updateMock();
    }

    if (contactError) {
      setError(errorMessages.wentWrong);
      setIsLoading(false);
    }
  }, [contact, isContactLoading]);

  useEffect(() => {
    showError(error);
  }, [error]);

  return (
    <div className="relative flex flex-col gap-4 w-[260px] sm:w-[420px] exclude-click">
      {!isLoading && (
        <FormTemplate
          initialValues={newInitialValues}
          validationSchema={Yup.object(validationSchemaContact)}
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

              <div>
                <ButtonTemplate
                  text={buttonTitle}
                  handleClick={handleAdditionalClick}
                />
              </div>

              {isAdditionalOpen && (
                <InputList
                  formProps={formProps}
                  inputs={inputsAdditional}
                />
              )}

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
        <div className="flex items-center justify-center w-full h-[801px]">
          <Loader />
        </div>
      )}
    </div>
  );
};
