import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../../redux/features/user/userSelectors';
import {
  useAddReminderClientRequestMutation,
  useAddReminderRealtyMutation,
  useUpdateReminderMutation,
} from '../../../../redux/services/reminders/remindersApi';
import { selectSearchRequestInfo } from '../../../../redux/features/dashboard/dashboardSelectors';

import { FormTemplate } from '../FormTemplate';
import { InputList } from '../../inputs/InputList';
import { LoaderProgress } from '../../../ui/LoaderProgress';

import {
  initialValues,
  mock,
  validationSchemaReminder,
} from '../../../../lib/mocks/add-reminder-mock';
import {
  getDefaultValues,
  getInitialValues,
  handleResponseError,
} from '../../../../utils/data';
import { closeDialog, showError } from '../../../../utils/ui';
import { reminderValues } from '../../../../lib/mocks/add-reminder-mock';

export const AddReminderForm = ({
  reminder = {},
  isClientRequest = false,
  idClientRequest = null,
  isEdit = false,
  setIsAddOpen = () => {},
  realtyId,
}) => {
  const [newInitialValues, setNewInitialValues] = useState({
    ...initialValues,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [error, setError] = useState('');

  const userToken = useSelector(selectUserToken);
  const searchRequest = useSelector(selectSearchRequestInfo);

  const [
    addNewReminderRealty,
    {
      isLoading: isAddingReminderRealtyLoading,
      error: addingReminderRealtyError,
    },
  ] = useAddReminderRealtyMutation();
  const [
    addNewReminderClientRequest,
    {
      isLoading: isAddingReminderClientRequestLoading,
      error: addingReminderClientRequestError,
    },
  ] = useAddReminderClientRequestMutation();
  const [editReminder, { isLoading: isEditingLoading, error: editingError }] =
    useUpdateReminderMutation();

  const handleSubmit = async values => {
    setError('');
    setIsLoading(true);

    const reminderTypeValue = values?.[reminderValues.reminder_subtype];

    let response;
    let errorStatus;

    if (isEdit) {
      response = await editReminder({
        token: userToken,
        id: reminder.id,
        data: values,
      });

      errorStatus = await handleResponseError(
        response?.error,
        editingError,
        () => closeDialog({ setState: setIsAddOpen })
      );
    } else {
      if (reminderTypeValue === '0' || reminderTypeValue === 0) {
        let newValues = { ...values };
        let clientId = reminder?.client_request?.id ? reminder?.client_request?.id : idClientRequest;

        if (realtyId) {
          newValues = { ...values, client_request_realty_id: realtyId };
        }

        if (!clientId) {
          clientId = searchRequest?.client_id;
        }

        response = await addNewReminderClientRequest({
          token: userToken,
          data: newValues,
          id: clientId,
        });

        errorStatus = await handleResponseError(
          response?.error,
          addingReminderClientRequestError,
          () => closeDialog({ setState: setIsAddOpen })
        );
      } else {
        response = await addNewReminderRealty({
          token: userToken,
          data: values,
          id: realtyId,
        });

        errorStatus = await handleResponseError(
          response?.error,
          addingReminderRealtyError,
          () => closeDialog({ setState: setIsAddOpen })
        );
      }
    }

    setError(errorStatus);
    setIsLoading(false);
  };

  const filterToggleList = (isClientRequest) => {
    return mock.map(input => {
      if (input.name === reminderValues.reminder_subtype) {
        const newToggleData = input.toggleList.filter(tab => {
          const hasClientRequestValue = tab.value === '0';

          if (isClientRequest) {
            return hasClientRequestValue;
          } else {
            return !hasClientRequestValue;
          }
        });

        return { ...input, toggleList: newToggleData };
      } else {
        return input;
      }
    });
  };

  const updateMock = async () => {
    const newMock =
      isClientRequest || !searchRequest ? filterToggleList(isClientRequest) : mock;

    if (isEdit) {
      setNewInitialValues(prevValues => getInitialValues(reminder, prevValues));

      const updatedMock = getDefaultValues(reminder, newMock);

      setInputs(updatedMock);
    } else {
      setNewInitialValues(initialValues);
      setInputs(newMock);
    }
  };

  useEffect(() => {
    showError(error);
  }, [error]);

  useEffect(() => {
    updateMock();
  }, []);

  return (
    <>
      {isLoading && <LoaderProgress />}

      <div className="relative flex flex-wrap gap-4 w-full exclude-click dialog-with-click">
        <FormTemplate
          initialValues={newInitialValues}
          validationSchema={Yup.object(validationSchemaReminder)}
          handleSubmitForm={handleSubmit}
          buttonText={'Save'}
          bgColor={'bg-purpleColor border-purpleColor'}
        >
          {formProps => (
            <InputList
              formProps={formProps}
              inputs={inputs}
            />
          )}
        </FormTemplate>
      </div>
    </>
  );
};
