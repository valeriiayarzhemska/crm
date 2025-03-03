import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'sonner';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../../../redux/features/user/userSelectors';
import {
  useAddCollaborationMutation,
  useGetCollaborationsRealtyQuery,
} from '../../../../../redux/services/collaborations/collaborationsApi';

import { FormTemplate } from '../../FormTemplate';
import { InputsTemplate } from '../../../inputs/InputsTemplate';
import { Loader } from '../../../../ui/Loader';

import {
  initialValues,
  mock,
  validationSchemaCity,
} from '../../../../../lib/mocks/add-assignee-mock';
import {
  getInitialValues,
  addDataForDepedentSelects,
  getDefaultValues,
  handleResponseError,
} from '../../../../../utils/data';
import {
  errorMessages,
} from '../../../../../data/constants';
import { closeDialog, showError } from '../../../../../utils/ui';

export const AddAssignee = ({
  realtyId,
  agentId,
  handleClose = () => {},
  assignees = [],
}) => {
  const [newInitialValues, setNewInitialValues] = useState({
    ...initialValues,
  });
  const [inputs, setInputs] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const userToken = useSelector(selectUserToken);
  const {
    data: collaborations = [],
    isLoading: isCollaborationsLoading,
    error: collaborationsError,
  } = useGetCollaborationsRealtyQuery(
    {
      token: userToken,
      realty_id: realtyId,
    },
    { refetchOnMountOrArgChange: true }
  );
  const [
    addNewCollaboration,
    { isLoading: isAddingLoading, error: addingError },
  ] = useAddCollaborationMutation();

  const updateMock = async () => {
    setError(null);

    setNewInitialValues(prevValues =>
      getInitialValues({ ...collaborations, buyer_agent: agentId }, prevValues)
    );

    const updatedMock = await addDataForDepedentSelects({
      mock,
      assistants: assignees,
    });
    let mockWithValues = updatedMock;

    if (collaborations?.buyer_assistant?.name) {
      mockWithValues = await getDefaultValues(collaborations, updatedMock, {
        agents: assignees,
      });
    }

    setInputs(mockWithValues);
    setIsLoading(false);
  };

  const handleSubmit = async values => {
    setError(null);

    if (Number(values?.buyer_assistant) === Number(agentId)) {
      toast.error(errorMessages.agentCollaboration, {
        error: true,
        action: {},
      });
    } else {
      let response;
      let errorStatus;

      response = await addNewCollaboration({
        token: userToken,
        realty_id: realtyId,
        data: values,
      });

      errorStatus = await handleResponseError(
        response?.error,
        addingError,
        () => closeDialog({ handleClose })
      );

      setError(errorStatus);
    }
  };

  useEffect(() => {
    if (!isCollaborationsLoading && collaborations) {
      updateMock();
    }

    if (collaborationsError) {
      setError(errorMessages.wentWrong);
      setIsLoading(false);
    }
  }, [collaborations, isCollaborationsLoading]);

  useEffect(() => {
    showError(error);
  }, [error]);

  return (
    <div className="relative flex flex-col gap-4 w-[260px] sm:w-[420px] exclude-click">
      {!isLoading && (
        <FormTemplate
          initialValues={newInitialValues}
          validationSchema={Yup.object(validationSchemaCity)}
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
      )}

      {isLoading && (
        <div className="flex items-center justify-center w-full h-[93px]">
          <Loader />
        </div>
      )}
    </div>
  );
};
