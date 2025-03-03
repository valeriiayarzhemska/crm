import { useState } from 'react';
import { formatDate } from '../../../../../utils/utils';
import { RequestBadges } from '../../../search/requests/RequestBadges';
import { AddRequestForm } from '../../AddRequestForm';
import { Dialog } from '../../../../ui/Dialog';
import { ButtonTemplate } from '../../../../ui/buttons/ButtonTemplate';
import { IconButtonTemplate } from '../../../../ui/buttons/IconButtonTemplate';
import { AlarmClock } from 'lucide-react';
import { RequestNote } from '../../../search/requests/RequestNote';
import { getDefaultValuesForEditing } from '../../../../../utils/data';
import { useUpdateRequestMutation } from '../../../../../redux/services/requests/requestsApi';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../../../redux/features/user/userSelectors';
import { showError } from '../../../../../utils/ui';
import { errorMessages } from '../../../../../data/constants';
import { AddReminderForm } from '../../AddReminderForm';

export const SearchFormRequestInfo = ({ client = {}, request = {} }) => {
  const {
    agent_name,
    status,
    request_type,
    urgency_type,
    created_at,
    id,
    comment,
    note,
  } = request;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isReminderOpen, setIsReminderOpen] = useState(false);

  const userToken = useSelector(selectUserToken);
  const [editRequest, { isLoading: isEditingLoading, error: editingError }] =
    useUpdateRequestMutation();

  const formatedDate = formatDate(created_at || '');

  const handleSubmitEditing = async data => {
    const newRequest = await getDefaultValuesForEditing(request);

    const response = await editRequest({
      token: userToken,
      id: id,
      data: { ...newRequest, ...data },
    });

    const errors = editingError || response?.error;

    showError(errors, errorMessages.wentWrong);
  };

  const handleReminderClick = () => {
    setIsReminderOpen(!isReminderOpen);
  };

  const handleEditRequestClose = () => {
    setIsEditOpen(false);
  };

  return (
    <>
      <div className="relative flex flex-col gap-2 p-2 max-w-80 bg-blue-100 rounded">
        <div className="flex gap-3">
          <div className="flex flex-col gap-1">
            <span className="block font-medium text-blackColor text-xs uppercase">
              {request_type?.title} {id}
            </span>

            {formatedDate && (
              <span className="block text-blackColor text-[10px]">
                {formatedDate}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 max-w-40">
            <RequestBadges
              agent_name={agent_name}
              status={status}
              urgency_type={urgency_type}
              handleSubmitEditing={handleSubmitEditing}
            />

            <div className="flex items-center gap-2">
              <IconButtonTemplate
                handleClick={handleReminderClick}
                icon={AlarmClock}
                size={18}
                tooltipText={'Add reminder'}
              />

              <ButtonTemplate
                handleClick={() => setIsEditOpen(true)}
                isSmallText={true}
                bgColor="bg-redColor"
                text={'Edit request'}
              />
            </div>
          </div>
        </div>

        <RequestNote
          isClientsPage={false}
          isComment={false}
          color="bg-blue-100"
          handleSubmitEditing={handleSubmitEditing}
          agent_name={agent_name}
          formatedDate={formatedDate}
          comment={comment}
          note={note}
        />
      </div>

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
    </>
  );
};
