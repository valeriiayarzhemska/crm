import ReactDOM from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { CheckCheck, X } from 'lucide-react';
import { toast } from 'sonner';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../redux/features/user/userSelectors';
import {
  useGetNotificationsByPageQuery,
  useReadAllNotificationsMutation,
} from '../../../redux/services/notifications/notificationsApi';

import { NotificationItem } from '../NotificationItem';
import { Loader } from '../Loader';
import { ErrorMsg } from '../ErrorMsg';
import { ButtonTemplate } from '../buttons/ButtonTemplate';
import { IconButtonTemplate } from '../buttons/IconButtonTemplate';

import { disableBodyScroll, showError } from '../../../utils/ui';
import { errorMessages } from '../../../data/constants';

export const NotificationBar = ({ isOpen, handleComponentClose }) => {
  const [updatedNotifications, setUpdatedNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [isAllRead, setIsAllRead] = useState(false);
  const [isShowMoreClicked, setIsShowMoreClicked] = useState(false);
  const [error, setError] = useState(null);
  const [errorToast, setErrorToast] = useState(null);
  const [nextPage, setNextPage] = useState(null);

  const userToken = useSelector(selectUserToken);

  const {
    data: notificationsData = {},
    isLoading: isNotificationsLoading,
    error: notificationsError,
  } = useGetNotificationsByPageQuery(
    { token: userToken, page: nextPage },
    { skip: !userToken, refetchOnMountOrArgChange: true }
  );
  const [
    readAllNotifications,
    { isLoading: isReadingLoading, error: readingError },
  ] = useReadAllNotificationsMutation();

  const overlayRef = useRef(null);
  const portalContainerRef = useRef(document.createElement('div'));

  const handleClose = () => {
    disableBodyScroll(false);
    handleComponentClose();
  };

  const handleOverlayClick = e => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  const handleShowMoreClick = () => {
    if (notificationsData?.links?.next) {
      const page = notificationsData?.links?.next;

      setNextPage(page.slice(-1));
    } else {
      setNextPage(null);
    }

    setIsShowMoreClicked(true);
  };

  const handleReadAll = async () => {
    const response = await readAllNotifications({ token: userToken });

    if (response?.error || readingError) {
      setErrorToast(errorMessages.wentWrong);
    } else {
      setIsAllRead(true);
    }
  };

  useEffect(() => {
    if (notificationsData?.data && isShowMoreClicked) {
      setUpdatedNotifications(prevNotifications => [
        ...prevNotifications,
        ...notificationsData.data,
      ]);

      setIsShowMoreClicked(false);
    }
  }, [notificationsData?.data]);

  useEffect(() => {
    if (isFirstLoading && !isNotificationsLoading && notificationsData?.data) {
      setUpdatedNotifications(notificationsData.data);
      setIsFirstLoading(false);
      setIsLoading(false);
    }

    if (notificationsError) {
      setError(errorMessages.notifications);
      setIsLoading(false);
    }
  }, [isNotificationsLoading]);

  useEffect(() => {
    showError(errorToast);
  }, [errorToast]);

  useEffect(() => {
    if (isOpen) {
      disableBodyScroll(true);
    }
  }, [isOpen]);

  useEffect(() => {
    document.body.appendChild(portalContainerRef.current);

    return () => {
      document.body.removeChild(portalContainerRef.current);
    };
  }, []);

  const renderNotifications = () => {
    if (isLoading || isNotificationsLoading) {
      return (
        <div className="flex justify-center w-full min-h-9">
          <Loader />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center w-full min-h-9">
          <ErrorMsg message={error} />
        </div>
      );
    }

    if (!updatedNotifications.length)
      return (
        <div className="flex justify-center w-full min-h-9">
          <span className="text-sm font-medium text-blackColor">
            Notifications list is empty
          </span>
        </div>
      );

    return (
      <div className="flex flex-col justify-center gap-2 px-2">
        <div className="flex flex-col w-full">
          {updatedNotifications.map((notification, index) => (
            <NotificationItem
              key={index}
              notification={notification}
              setErrorToast={setErrorToast}
              isAllRead={isAllRead}
            />
          ))}
        </div>

        {notificationsData?.links?.next && (
          <ButtonTemplate
            text="Show more"
            bgColor="border-greenColor bg-greenColor"
            handleClick={handleShowMoreClick}
          />
        )}
      </div>
    );
  };

  return isOpen
    ? ReactDOM.createPortal(
      <div
        className="relative z-10 dialog"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-10 w-screen overflow-y-auto"
        >
          <div
            ref={overlayRef}
            className="relative flex min-h-full py-16 px-2 text-center md:p-4"
          >
            <div className="absolute top-4 left-4 flex flex-col gap-2 min-h-12 max-h-[80%] w-72 py-2 bg-gray-50 border-2 border-greenColor rounded shadow overflow-scroll hide-scroll sm:w-96 sm:left-[170px] md:left-[163px] lg:left-[177px]">
              <div className="flex justify-end gap-4 w-full h-full">
                {!error && !isLoading && updatedNotifications.length > 0 && (
                  <ButtonTemplate
                    text="Read all"
                    isIconText={true}
                    icon={CheckCheck}
                    disabled={isReadingLoading}
                    isSmall={true}
                    classes="p-2"
                    handleClick={handleReadAll}
                  />
                )}

                <IconButtonTemplate
                  isRounded={true}
                  icon={X}
                  handleClick={handleClose}
                />
              </div>

              {renderNotifications()}
            </div>
          </div>
        </div>
      </div>,
      portalContainerRef.current
    )
    : null;
};
