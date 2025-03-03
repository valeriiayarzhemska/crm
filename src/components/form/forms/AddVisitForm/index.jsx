import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Users, X } from 'lucide-react';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../../redux/features/user/userSelectors';
import { agentsData } from '../../../../redux/features/dashboard/dashboardSelectors';
import {
  useAddVisitMutation,
  useDeleteVisitMutation,
  useUpdateVisitMutation,
} from '../../../../redux/services/visits/visitsApi';

import { FormTemplate } from '../FormTemplate';
import { ButtonsList } from '../../../ui/ButtonsList';
import { ButtonTemplate } from '../../../ui/buttons/ButtonTemplate';
import { DeleteDialogButton } from '../../DeleteDialogButton';
import { InputList } from '../../inputs/InputList';

import {
  initialValues,
  mock,
  validationSchemaVisit,
} from '../../../../lib/mocks/add-visit-mock';
import { filterValue } from '../../../../utils/utils';
import {
  getDefaultValues,
  getInitialValues,
  handleResponseError,
} from '../../../../utils/data';
import {
  closeDialog,
  showError,
  transformAssistantsDataInputs,
} from '../../../../utils/ui';

export const AddVisitForm = ({
  visit = {},
  isEdit = false,
  setShowAddVisitForm = () => {},
  realtyId,
}) => {
  const [newInitialValues, setNewInitialValues] = useState({
    ...initialValues,
  });
  const [inputs, setInputs] = useState([]);
  const [error, setError] = useState('');
  const [assistantsList, setAssistantsList] = useState([]);
  const [newAssistants, setNewAssistants] = useState([]);
  const [assistantsBadges, setAssistantsBadges] = useState([]);
  const [showAgents, setShowAgents] = useState(false);

  const assistants = useSelector(agentsData);
  const userToken = useSelector(selectUserToken);

  const [addNewVisit, { isLoading: isAddingLoading, error: addingError }] =
    useAddVisitMutation();
  const [editVisit, { isLoading: isEditingLoading, error: editingError }] =
    useUpdateVisitMutation();
  const [deleteVisit, { isLoading: isDeletingLoading, error: deleteingError }] =
    useDeleteVisitMutation();

  const addDataForAssistants = async assistants => {
    const updatedAssistants = await transformAssistantsDataInputs(assistants);

    setAssistantsList(updatedAssistants);
    setNewAssistants(updatedAssistants);

    if (isEdit) {
      return updatedAssistants;
    }
  };

  const handleVisitorClick = () => {
    setShowAgents(!showAgents);
  };

  const handleAssistentsClick = async (assistent, formProps = {}) => {
    const { value } = assistent;

    let badges = assistantsBadges.length === 0 ? [assistent] : assistantsBadges;
    let updatedAssistants = [...assistantsList];

    const isBadgePresent = assistantsBadges.some(
      badge => badge.value === value
    );

    if (isBadgePresent) {
      badges = filterValue(assistantsBadges, value);
      updatedAssistants = [...newAssistants, assistent];
    } else {
      badges = [...assistantsBadges, assistent];
      updatedAssistants = filterValue(newAssistants, value);
    }

    if (formProps?.setFieldValue) {
      const values = badges.map(badge => {
        return badge.value;
      });

      formProps.setFieldValue('visit_members', values);
    }

    setNewAssistants(updatedAssistants);
    setAssistantsBadges(badges);
    setShowAgents(false);
  };

  const updateAssistantsData = async () => {
    const receivedAssistants = await transformAssistantsDataInputs(
      visit['visit_members']
    );

    await receivedAssistants.forEach(assistant => {
      return handleAssistentsClick(assistant);
    });
  };

  const handleSubmit = async values => {
    setError('');

    let response;
    let errorStatus;

    if (isEdit) {
      response = await editVisit({
        token: userToken,
        id: visit.id,
        data: values,
      });

      errorStatus = await handleResponseError(
        response?.error,
        editingError,
        () => closeDialog({ setState: setShowAddVisitForm })
      );
    } else {
      response = await addNewVisit({
        token: userToken,
        data: values,
        realty_id: realtyId, //hardcode
      });

      errorStatus = await handleResponseError(
        response?.error,
        addingError,
        () => closeDialog({ setState: setShowAddVisitForm })
      );
    }

    setError(errorStatus);
  };

  const handleDelete = async setIsDeleteClick => {
    setIsDeleteClick(false);
    setError('');

    const response = await deleteVisit({
      token: userToken,
      id: visit.id,
    });

    const errorStatus = await handleResponseError(
      response?.error,
      deleteingError,
      () => closeDialog({ setState: setShowAddVisitForm })
    );

    setError(errorStatus);
  };

  const updateMock = async () => {
    if (isEdit) {
      setNewInitialValues(prevValues => getInitialValues(visit, prevValues));

      const updatedMock = getDefaultValues(visit, mock);

      setInputs(updatedMock);
    } else {
      setNewInitialValues(initialValues);
      setInputs(mock);
    }
  };

  useEffect(() => {
    showError(error);
  }, [error]);

  useEffect(() => {
    updateMock();
  }, []);

  useEffect(() => {
    if (assistants && assistants.length > 0) {
      addDataForAssistants(assistants);
    }
  }, [assistants]);

  useEffect(() => {
    if (assistantsList && assistantsList.length > 0) {
      if (isEdit && visit?.['visit_members']?.length > 0) {
        updateAssistantsData(assistantsList);
      }
    }
  }, [assistantsList, isEdit]);

  return (
    <div className="relative flex flex-wrap gap-4 w-full exclude-click dialog-with-click">
      <FormTemplate
        initialValues={newInitialValues}
        validationSchema={Yup.object(validationSchemaVisit)}
        handleSubmitForm={handleSubmit}
        buttonText={'Save'}
        bgColor={'bg-purpleColor border-purpleColor'}
      >
        {formProps => (
          <>
            <InputList
              formProps={formProps}
              inputs={inputs}
            />

            <div className="flex flex-wrap items-center gap-3 w-full">
              {assistantsBadges.map((assistant, index) => {
                return (
                  <ButtonTemplate
                    key={index}
                    text={assistant.title}
                    icon={X}
                    isIconText={true}
                    handleClick={() =>
                      handleAssistentsClick(assistant, formProps)
                    }
                  />
                );
              })}

              <div>
                <ButtonTemplate
                  text={'Add a visitor'}
                  icon={Users}
                  isIconText={true}
                  handleClick={handleVisitorClick}
                />

                {showAgents && (
                  <ButtonsList
                    list={newAssistants}
                    handleButtonClick={handleAssistentsClick}
                    formProps={formProps}
                    setIsOpen={setShowAgents}
                    //classes="bottom-7 right-0"
                  />
                )}
              </div>

              {isEdit && (
                <DeleteDialogButton
                  isDeletingLoading={isDeletingLoading}
                  handleDelete={handleDelete}
                  error={error}
                />
              )}
            </div>
          </>
        )}
      </FormTemplate>
    </div>
  );
};
