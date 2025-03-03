import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import cn from 'classnames';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../redux/features/user/userSelectors';
import {
  useReadNotificationMutation,
  useUnreadNotificationMutation,
} from '../../../redux/services/notifications/notificationsApi';

import { IconButtonTemplate } from '../buttons/IconButtonTemplate';

import { errorMessages } from '../../../data/constants';

export const NotificationItem = ({
  notification = {},
  setErrorToast = () => {},
  isAllRead = false,
}) => {
  const { id, description, title, is_read } = notification;

  const [isNotificationRead, setIsNotificationRead] = useState(is_read);

  const userToken = useSelector(selectUserToken);
  const [
    readNotifications,
    { isLoading: isReadingLoading, error: readingError },
  ] = useReadNotificationMutation();
  const [
    uneadNotifications,
    { isLoading: isUnreadingLoading, error: unreadingError },
  ] = useUnreadNotificationMutation();

  const handleReadClick = async id => {
    let response;

    if (!isNotificationRead) {
      setIsNotificationRead(true);
      response = await readNotifications({ token: userToken, id });
    } else {
      setIsNotificationRead(false);
      response = await uneadNotifications({ token: userToken, id });
    }

    if (response?.error || unreadingError || readingError) {
      setErrorToast(errorMessages.wentWrong);
    }
  };

  useEffect(() => {
    if (isAllRead) {
      setIsNotificationRead(true);
    }
  }, [isAllRead]);

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-2 w-full',
        { 'bg-whiteColor': !isNotificationRead },
        { 'bg-gray-50 opacity-60': isNotificationRead }
      )}
    >
      <div className="flex flex-col gap-0.5 w-full">
        <span className="text-sm text-left text-blackColor font-bold break-words">
          {title}
        </span>

        <a
          href="/"
          className="text-sm text-left text-gray-800 underline break-words cursor-pointer"
        >
          {description}
        </a>
      </div>

      <div>
        <IconButtonTemplate
          isSmall={true}
          disabled={isReadingLoading || isUnreadingLoading}
          icon={Check}
          isRounded={true}
          bgColor={'bg-gray-100'}
          classes={'opacity-70 hover:opacity-90'}
          handleClick={() => handleReadClick(id)}
        />
      </div>
    </div>
  );
};
