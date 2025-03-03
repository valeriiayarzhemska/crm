import { useEffect, useState } from 'react';
import { AlarmClock, Check } from 'lucide-react';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../../redux/features/user/userSelectors';

import { IconButtonTemplate } from '../../buttons/IconButtonTemplate';
import { AddReminderForm } from '../../../form/forms/AddReminderForm';
import { Dialog } from '../../Dialog';
import { ButtonTemplate } from '../../buttons/ButtonTemplate';
import { EditSelect } from '../../EditSelect';
import { DialogConfirm } from '../../DialogConfirm';
import { LoaderProgress } from '../../LoaderProgress';
import { RescheduleReminderForm } from '../../../form/forms/RescheduleReminderForm';

import { showError } from '../../../../utils/ui';
import { editSelectReminders } from '../../../../data/constants';
import {
  useDeleteReminderMutation,
  useFinishReminderMutation,
} from '../../../../redux/services/reminders/remindersApi';
import { reminderTypeTogleData } from '../../../../lib/mocks/add-reminder-mock';

export const ItemHeader = ({ reminder }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editSelect, setEditSelect] = useState(false);

  const reminderType = reminderTypeTogleData.find(
    item => item.title === reminder?.reminder_type?.title
  );

  const userToken = useSelector(selectUserToken);
  const [
    deleteReminder,
    { isLoading: isDeletingLoading, error: deletingError },
  ] = useDeleteReminderMutation();
  const [
    finishReminder,
    { isLoading: isFinishingLoading, error: finishingError },
  ] = useFinishReminderMutation();

  const handleFinishReminder = async () => {
    setIsLoading(true);
    setError('');

    const response = await finishReminder({
      token: userToken,
      id: reminder.id,
    });

    const errorStatus = response?.error || finishingError;

    setError(errorStatus);
    setIsLoading(false);
  };

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handleReschedule = () => {
    setIsRescheduleOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteOpen(true);
  };

  const handleDeleteReminder = async () => {
    setIsLoading(true);
    setError('');

    const response = await deleteReminder({
      token: userToken,
      id: reminder.id,
    });

    const errorStatus = response?.error || deletingError;

    setError(errorStatus);
    setIsLoading(false);
  };

  const addSelectHandlers = () => {
    const newEditSelect = editSelectReminders.map(select => {
      switch (select.title) {
      case 'Edit':
        return { ...select, handleSelection: handleEdit };
      case 'Reschedule':
        return { ...select, handleSelection: handleReschedule };
      case 'Delete':
        return { ...select, handleSelection: handleDelete };
      default:
        return select;
      }
    });

    setEditSelect(newEditSelect);
  };

  useEffect(() => {
    addSelectHandlers();
  }, []);

  useEffect(() => {
    showError(error);
  }, [error]);

  return (
    <>
      {isLoading && <LoaderProgress />}

      <div className={`flex justify-between items-center gap-2 w-full opacity-${reminder?.is_finish ? '60' : '100'}`}>
        <div className="flex gap-1 sm:gap-2 items-center">
          <span className="text-blackColor text-xs font-bold">
            {reminder.date}
          </span>

          <span
            className={`block p-0.5 text-whiteColor text-xs font-bold bg-${reminderType.color} rounded`}
          >
            {reminder.reminder_type.title}
          </span>
        </div>

        <div className="flex items-center gap-0.5 sm:gap-2">
          <IconButtonTemplate
            isSmall={true}
            icon={AlarmClock}
            isRounded={true}
            tooltipText={'Add reminder'}
            handleClick={() => setIsAddOpen(true)}
          />

          <ButtonTemplate
            isIconText={true}
            icon={Check}
            text={'Finish'}
            handleClick={handleFinishReminder}
          />

          <EditSelect selectData={editSelect} />
        </div>
      </div>

      {isAddOpen && (
        <Dialog
          content={
            <AddReminderForm
              isClientRequest={reminder?.client_request}
              reminder={reminder}
              setIsAddOpen={setIsAddOpen}
            />
          }
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          classes="max-w-[290px] sm:max-w-[420px]"
        />
      )}

      {isEditOpen && (
        <Dialog
          content={
            <AddReminderForm
              isEdit={true}
              isClientRequest={reminder?.client_request}
              reminder={reminder}
              setIsAddOpen={setIsEditOpen}
            />
          }
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          classes="max-w-[290px] sm:max-w-[420px]"
        />
      )}

      {isRescheduleOpen && (
        <Dialog
          content={
            <RescheduleReminderForm
              reminderId={reminder.id}
              setIsRescheduleOpen={setIsRescheduleOpen}
            />
          }
          isOpen={isRescheduleOpen}
          onClose={() => setIsRescheduleOpen(false)}
        />
      )}

      {isDeleteOpen && (
        <Dialog
          content={
            <DialogConfirm
              handleSubmit={() => handleDeleteReminder()}
              handleCancel={() => setIsDeleteOpen(false)}
            />
          }
          classes={'max-w-[290px] sm:max-w-[420px]'}
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
        />
      )}
    </>
  );
};
