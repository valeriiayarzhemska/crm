import { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'sonner';

import { useSelector } from 'react-redux';
import {
  selectUserInfo,
  selectUserToken,
} from '../../../../../redux/features/user/userSelectors';
import { useGetClientQuery } from '../../../../../redux/services/clients/clientsApi';
import { useAddEmailsMutation } from '../../../../../redux/services/emails/emailsApi';

import { FormTemplate } from '../../FormTemplate';
import { EmailFormInputs } from '../EmailFormInputs';
import { EmailVariables } from '../EmailVariables';
import { LoaderProgress } from '../../../../ui/LoaderProgress';

import {
  errorMessages,
  successMessages,
  variablesValues,
} from '../../../../../data/constants';
import { showError } from '../../../../../utils/ui';
import {
  emailsValuesTitles,
  initialValues,
  mockTextareas,
  validationSchemaEmail,
} from '../../../../../lib/mocks/email-mock';
import {
  addVariablesInText,
  createFormDataEmailForm,
} from '../../../../../utils/utils';

export const EmailForm = ({
  client = null,
  inputs = [],
  handleClose = false,
}) => {
  const [newInitialValues, setNewInitialValues] = useState({
    ...initialValues,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [inputsTextareas, setInputsTextareas] = useState(mockTextareas);
  const [error, setError] = useState('');

  const [clientId, setClientId] = useState(null);

  const userToken = useSelector(selectUserToken);
  const userInfo = useSelector(selectUserInfo);
  const {
    data: clientData = {},
    isFetching: isClientDataLoading,
    error: clientDataError,
  } = useGetClientQuery(
    { token: userToken, id: clientId },
    { skip: !clientId || client, refetchOnMountOrArgChange: true }
  );
  const [addEmails, { isLoading: isAddingLoading, error: addingError }] =
    useAddEmailsMutation();

  const handleSubmit = async values => {
    const clientInfo = client ? client : clientData;
    const newValues = await addVariablesInText(
      values,
      clientInfo,
      userInfo,
      variablesValues
    );

    const formData = await createFormDataEmailForm(
      newValues,
      emailsValuesTitles
    );

    const response = await addEmails({
      token: userToken,
      data: formData,
      clientId: client?.id ? client?.id : clientId,
    });

    if (response?.error || response?.errors) {
      showError(errorMessages.wentWrong);
    } else {
      toast.success(successMessages.emailSent, {
        action: {},
      });

      if (handleClose) {
        handleClose();
      }
    }
  };

  return (
    <div className="relative flex flex-wrap gap-4 w-full exclude-click dialog-with-click">
      {isLoading && <LoaderProgress />}

      <EmailVariables />

      <FormTemplate
        initialValues={newInitialValues}
        validationSchema={Yup.object(validationSchemaEmail)}
        handleSubmitForm={handleSubmit}
        buttonText={'Save'}
        bgColor={'bg-purpleColor border-purpleColor'}
      >
        {formProps => (
          <EmailFormInputs
            formProps={formProps}
            inputs={inputs}
            inputsTextareas={inputsTextareas}
            setInputsTextareas={setInputsTextareas}
            setIsLoading={setIsLoading}
            client={client}
            clientId={clientId}
            setClientId={setClientId}
            clientData={clientData}
            isClientDataLoading={isClientDataLoading}
          />
        )}
      </FormTemplate>
    </div>
  );
};
