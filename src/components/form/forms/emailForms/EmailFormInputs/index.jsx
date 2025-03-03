import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import {
  selectUserInfo,
  selectUserToken,
} from '../../../../../redux/features/user/userSelectors';
import { useCreateEmailPreviewMutation } from '../../../../../redux/services/emails/emailsApi';

import { InputsTemplate } from '../../../inputs/InputsTemplate';
import { EmailDocumentsList } from '../EmailDocumentsList';
import { EmailPreview } from '../../EmailPreview';
import { Dialog } from '../../../../ui/Dialog';
import { ButtonTemplate } from '../../../../ui/buttons/ButtonTemplate';
import { ToggleGroupTemplate } from '../../../inputs/ToggleGroupTemplate';

import { showError } from '../../../../../utils/ui';
import { errorMessages, variablesValues } from '../../../../../data/constants';
import { addVariablesInText } from '../../../../../utils/utils';
import { langRadioData } from '../../../../../lib/mocks/add-client-mock';
import {
  emailsValuesTitles,
  mockLocale,
  textareaValues,
} from '../../../../../lib/mocks/email-mock';

export const EmailFormInputs = ({
  formProps = {},
  client = null,
  inputs = [],
  inputsTextareas = [],
  setInputsTextareas = () => {},
  setIsLoading = () => {},
  clientId = null,
  setClientId = () => {},
  clientData = null,
  isClientDataLoading = false,
}) => {
  const [localeValue, setlLocaleValue] = useState({
    id: 2,
    value: 1,
    title: 'en',
  });
  const [isLocaleShown, setlIsLocaleShown] = useState(false);
  const [isPreviewShown, setIsPreviewShown] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');

  const userToken = useSelector(selectUserToken);
  const userInfo = useSelector(selectUserInfo);

  const [
    createPreview,
    { isLoading: isCreatingLoading, error: creatingError },
  ] = useCreateEmailPreviewMutation();

  const setFieldValue = (inputName, value) => {
    formProps?.setFieldValue(inputName, value);
  };

  const handleLocaleChange = () => {
    const localeValue = formProps?.values?.[emailsValuesTitles.locale];

    setIsLoading(true);

    if (localeValue || localeValue === 0) {
      setInputsTextareas(prevInpunts => {
        return prevInpunts.map(input => {
          return {
            ...input,
            defaultValue:
              textareaValues[emailsValuesTitles[input.name]][
                Number(localeValue)
              ],
          };
        });
      });
    }

    setIsLoading(false);
  };

  const handleClientIdChanging = () => {
    const clientIdValue = formProps?.values?.[emailsValuesTitles.client_id];

    setIsLoading(true);

    if (clientIdValue) {
      const timer = setTimeout(() => {
        setClientId(clientIdValue);
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  };

  const handleClientData = () => {
    if (clientData && !isClientDataLoading && clientId && !client) {
      const clientEmail = clientData?.email;

      if (!clientEmail) {
        showError(errorMessages.noClientEmail);
      }

      if (
        formProps?.values?.[emailsValuesTitles.recipient] !== clientEmail &&
        clientEmail
      ) {
        setFieldValue(emailsValuesTitles.recipient, clientData.email);
      }
    }
  };

  const handlePreviewClick = async () => {
    const subjectValue = formProps?.values?.[emailsValuesTitles.subject];
    const titleValue = formProps?.values?.[emailsValuesTitles.title];
    const textValue = formProps?.values?.[emailsValuesTitles.text];
    const clientIdValue = formProps?.values?.[emailsValuesTitles.client_id];

    if (!subjectValue || !titleValue || !textValue) {
      showError(errorMessages.fillEmailInputs);
    } else {
      const values = {
        [emailsValuesTitles.subject]: subjectValue,
        [emailsValuesTitles.text]: textValue,
        [emailsValuesTitles.title]: titleValue,
      };

      const clientInfo = client ? client : clientData;
      const newValues = await addVariablesInText(
        values,
        clientInfo,
        userInfo,
        variablesValues
      );

      const response = await createPreview({
        token: userToken,
        data: JSON.stringify(newValues),
        clientId: client?.id ? client?.id : clientIdValue,
      });

      if (response?.error || response?.errors) {
        showError(errorMessages.wentWrong);
      } else {
        setHtmlContent(response?.data);
        setIsPreviewShown(true);
      }
    }
  };

  const handleClientInfo = () => {
    const localeValue = client?.locale?.value;

    if (client) {
      formProps?.setFieldValue(emailsValuesTitles.client_id, client.id);

      if (client?.email) {
        formProps?.setFieldValue(emailsValuesTitles.recipient, client.email);
      } else if (!client?.email) {
        showError(errorMessages.noClientEmail);
      }

      if ((localeValue || localeValue === 0) && localeValue !== 1) {
        const matchedLang = langRadioData.find(
          lang => Number(lang.value) === Number(localeValue)
        );

        if (matchedLang) {
          setlLocaleValue(matchedLang);
          formProps?.setFieldValue(
            emailsValuesTitles.locale,
            matchedLang.value
          );
          setlIsLocaleShown(true);
        }
      }
    } else {
      setlIsLocaleShown(true);
    }
  };

  useEffect(() => {
    handleClientIdChanging();
  }, [formProps?.values?.[emailsValuesTitles.client_id]]);

  useEffect(() => {
    handleLocaleChange();
  }, [formProps?.values?.[emailsValuesTitles.locale]]);

  useEffect(() => {
    handleClientData();
  }, [clientData, isClientDataLoading]);

  useEffect(() => {
    handleClientInfo();
  }, [client]);

  return (
    <>
      {isLocaleShown && (
        <ToggleGroupTemplate
          formProps={formProps}
          defaultValue={localeValue}
          {...Object.keys(mockLocale).reduce((acc, key) => {
            if (key !== 'fieldType') {
              acc[key] = mockLocale[key];
            }
            return acc;
          }, {})}
        />
      )}

      <InputsTemplate
        formProps={formProps}
        inputsList={inputs}
      />

      <InputsTemplate
        formProps={formProps}
        inputsList={inputsTextareas}
      />

      <EmailDocumentsList formProps={formProps} />

      <div className="flex flex-col gap-2 items-start">
        <ButtonTemplate
          text={'Show Preview'}
          handleClick={handlePreviewClick}
        />
      </div>

      {isPreviewShown && (
        <Dialog
          content={<EmailPreview htmlContent={htmlContent} />}
          classes={'w-fit'}
          isOpen={isPreviewShown}
          onClose={() => setIsPreviewShown(false)}
        />
      )}
    </>
  );
};
