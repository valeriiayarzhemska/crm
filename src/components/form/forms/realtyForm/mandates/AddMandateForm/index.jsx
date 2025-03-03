import { useEffect, useState } from 'react';
import * as Yup from 'yup';

import { useSelector } from 'react-redux';
import {
  useAddMandatesMutation,
  useUpdateMandatesMutation,
} from '../../../../../../redux/services/mandate/mandateApi';
import { selectUserToken } from '../../../../../../redux/features/user/userSelectors';

import { FormTemplate } from '../../../FormTemplate';
import { InputsTemplate } from '../../../../inputs/InputsTemplate';
import { LoaderProgress } from '../../../../../ui/LoaderProgress';

import { closeDialog, showError } from '../../../../../../utils/ui';
import {
  validationSchemaMandate,
  mandateMockValues,
  mandateMock,
} from '../../../../../../lib/mocks/add-realty-mock/mandate-mock';
import {
  getDefaultValues,
  getInitialValues,
  handleResponseError,
} from '../../../../../../utils/data';

export const AddMandateForm = ({
  isEdit = false,
  mandate = {},
  realtyId,
  handleCancel = () => {},
}) => {
  const [newInitialValues, setNewInitialValues] = useState({
    ...mandateMockValues,
  });
  const [inputs, setInputs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const userToken = useSelector(selectUserToken);
  const [addMandate, { isLoading: isAddingLoading, isError: addingError }] =
    useAddMandatesMutation();
  const [editMandate, { isLoading: isEditingLoading, error: editingError }] =
    useUpdateMandatesMutation();

  const handleSubmit = async values => {
    setError('');
    setIsLoading(true);

    let response;
    let errorStatus;

    if (isEdit) {
      response = await editMandate({
        token: userToken,
        data: values,
        mandate_id: mandate?.id,
      });

      errorStatus = await handleResponseError(
        response?.error,
        editingError,
        () => closeDialog({ handleClose: handleCancel })
      );
    } else {
      response = await addMandate({
        token: userToken,
        data: values,
        realty_id: realtyId,
      });

      errorStatus = await handleResponseError(
        response?.error,
        addingError,
        () => closeDialog({ handleClose: handleCancel })
      );
    }

    setError(errorStatus);
    setIsLoading(false);
  };

  const updateMock = () => {
    if (isEdit) {
      setNewInitialValues(prevValues => getInitialValues(mandate, prevValues));

      const updatedMock = getDefaultValues(mandate, mandateMock);

      setInputs(updatedMock);
    } else {
      setNewInitialValues(mandateMockValues);
      setInputs(mandateMock);
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

      <div className="flex flex-col gap-4 w-[260px] sm:w-[420px] exclude-click dialog-with-click">
        <FormTemplate
          initialValues={newInitialValues}
          validationSchema={Yup.object(validationSchemaMandate)}
          handleSubmitForm={handleSubmit}
          buttonText={'Save'}
          bgColor={'bg-purpleColor border-purpleColor'}
        >
          {formProps => (
            <InputsTemplate
              formProps={formProps}
              inputsList={inputs}
            />
          )}
        </FormTemplate>
      </div>
    </>
  );
};
