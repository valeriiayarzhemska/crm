import { useState } from 'react';
import cn from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import { selectUserToken } from '../../../../../redux/features/user/userSelectors';
import { useUpdateRequestMutation } from '../../../../../redux/services/requests/requestsApi';
import {
  setSearchClientInfo,
  setSearchRequestInfo,
} from '../../../../../redux/features/dashboard/dashboardSlice';

import { AddRequestForm } from '../../../forms/AddRequestForm';
import { Dialog } from '../../../../ui/Dialog';
import { ButtonTemplate } from '../../../../ui/buttons/ButtonTemplate';
import { RequestBadges } from '../RequestBadges';
import { RequestButtons } from '../RequestButtons';
import { RequestActions } from '../RequestActions';
import { RequestInfoBadges } from '../RequestInfoBadges';
import { RequestNote } from '../RequestNote';
import { EmailForm } from '../../../forms/emailForms/EmailForm';

import { errorMessages } from '../../../../../data/constants';
import { formatDate } from '../../../../../utils/utils';
import { showError } from '../../../../../utils/ui';
import { getDefaultValuesForEditing } from '../../../../../utils/data';
import { initialSearchValuesNames } from '../../../../../lib/mocks/search-mock';
import { mock } from '../../../../../lib/mocks/email-mock';
import { AddReminderForm } from '../../../forms/AddReminderForm';
import { useNavigate } from 'react-router';

export const SearchItemRequests = ({
  client = {},
  request = {},
  isClientsPage = false,
  isMatching = false,
  formProps = {},
  inputName = '',
  setIsClientsOpen = () => {},
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);

  const userToken = useSelector(selectUserToken);
  const [editRequest, { isLoading: isEditingLoading, error: editingError }] =
    useUpdateRequestMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isFindDeal = inputName === initialSearchValuesNames.find_deal;

  const {
    id,
    client_id,
    request_type,
    urgency_type,
    status,
    visit,
    purpose,
    comment,
    note,
    document,
    created_at,
    agent_name,
    source,
  } = request;

  const formatedDate = formatDate(created_at || '');

  const handleSubmitEditing = async data => {
    const newRequest = await getDefaultValuesForEditing(request);

    const response = await editRequest({
      token: userToken,
      id: request?.id,
      data: { ...newRequest, ...data },
    });

    const errors = editingError || response?.error;

    showError(errors, errorMessages.wentWrong);
  };

  const handleEditRequestClick = () => {
    setIsEditOpen(true);
  };

  const handleEditRequestClose = () => {
    setIsEditOpen(false);
  };

  const handleReminderClick = () => {
    setIsReminderOpen(!isReminderOpen);
  };

  const handleMatchingClick = async () => {
    await navigate('/');
    await dispatch(setSearchClientInfo(client));
    await dispatch(setSearchRequestInfo(request));
  };

  const handleSendReplyClick = () => {
    setIsEmailOpen(!isEmailOpen);
  };

  const handleRequestClick = async () => {
    if (formProps?.setFieldValue) {
      formProps.setFieldValue(inputName, client_id);
      setIsClientsOpen(false);

      if (isFindDeal) {
        await dispatch(setSearchClientInfo(client));
        await dispatch(setSearchRequestInfo(request));
      }
    }
  };

  return (
    <div className={cn('relative flex flex-col gap-2 py-3 px-1 w-full bg-gray-50')}>
      <div
        className={cn('flex flex-wrap', {
          'flex-col items-start gap-2': isClientsPage,
          'items-center gap-1': !isClientsPage,
        })}
      >
        <RequestButtons
          isClientsPage={isClientsPage}
          isMatching={isMatching}
          id={id}
          formatedDate={formatedDate}
          handleEditRequestClick={handleEditRequestClick}
          handleReminderClick={handleReminderClick}
          handleMatchingClick={handleMatchingClick}
        />

        {isClientsPage && (
          <RequestActions
            request_type={request_type}
            phone={client?.phone}
            email={client?.email}
            handleSubmitEditing={handleSubmitEditing}
            handleSendReplyClick={handleSendReplyClick}
          />
        )}

        <RequestBadges
          agent_name={agent_name}
          status={status}
          urgency_type={urgency_type}
          handleSubmitEditing={handleSubmitEditing}
        />
      </div>

      {!isClientsPage && !isMatching && (
        <ButtonTemplate
          handleClick={handleRequestClick}
          text={'Open the request'}
        />
      )}

      {source && source?.length > 0 && (
        <div className="text-xs text-blackColor">
          <span>{source}</span>
        </div>
      )}

      <RequestInfoBadges request={request} />

      <RequestNote
        isClientsPage={isClientsPage}
        handleSubmitEditing={handleSubmitEditing}
        agent_name={agent_name}
        formatedDate={formatedDate}
        comment={comment}
        note={note}
      />

      {isEditOpen && (
        <Dialog
          content={
            <AddRequestForm
              isEdit={true}
              client={client}
              request={request}
              setShowAddRequestForm={setIsEditOpen}
            />
          }
          classes={'w-full sm:max-w-[420px]'}
          isOpen={isEditOpen}
          onClose={handleEditRequestClose}
        />
      )}

      {isReminderOpen && (
        <Dialog
          content={
            <AddReminderForm
              isClientRequest={true}
              setIsAddOpen={setIsReminderOpen}
              idClientRequest={id}
            />
          }
          classes={'w-full sm:max-w-[420px]'}
          isOpen={isReminderOpen}
          onClose={() => setIsReminderOpen(false)}
        />
      )}

      {isEmailOpen && (
        <Dialog
          content={
            <EmailForm
              client={client}
              inputs={mock}
              handleClose={() => setIsEmailOpen(false)}
            />
          }
          classes={'sm:w-[600px]'}
          isOpen={isEmailOpen}
          onClose={() => setIsEmailOpen(false)}
        />
      )}
    </div>
  );
};
