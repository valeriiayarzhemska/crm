import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../../redux/features/user/userSelectors';

import { ButtonTemplate } from '../../../ui/buttons/ButtonTemplate';
import {
  handleResponseError,
} from '../../../../utils/data';
import {
  closeDialog,
  showError,
} from '../../../../utils/ui';
import { reminderTypes } from '../../../../data/constants';
import { useRescheduleReminderMutation } from '../../../../redux/services/reminders/remindersApi';
import { LoaderProgress } from '../../../ui/LoaderProgress';

export const RescheduleReminderForm = ({
  reminderId,
  setIsRescheduleOpen = () => {},
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const userToken = useSelector(selectUserToken);

  const [
    rescheduleReminder,
    { isLoading: isRescheduleLoading, error: rescheduleError },
  ] = useRescheduleReminderMutation();

  const handleClick = async reminderType => {
    setIsLoading(true);
    setError('');

    const response = await rescheduleReminder({
      token: userToken,
      time: reminderType,
      id: reminderId,
    });

    const errorStatus = await handleResponseError(
      response?.error,
      rescheduleError,
      () => closeDialog({ setState: setIsRescheduleOpen })
    );

    setError(errorStatus);
    setIsLoading(false);
  };

  useEffect(() => {
    showError(error);
  }, [error]);

  return (
    <>
      {isLoading && <LoaderProgress />}

      <div className="relative flex flex-wrap gap-2 w-full exclude-click dialog-with-click">
        {reminderTypes.map(type => {
          return (
            <ButtonTemplate
              key={type.id}
              handleClick={() => handleClick(type.value)}
              text={type.value.charAt(0).toUpperCase() + type.value.slice(1)}
            />
          );
        })}
      </div>
    </>
  );
};
