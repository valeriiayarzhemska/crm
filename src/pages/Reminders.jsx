import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../redux/features/user/userSelectors';
import { useGetRemindersQuery } from '../redux/services/reminders/remindersApi';

import { TabBar } from '../components/ui/TabBar';
import { Container } from '../layouts/Container';
import { ErrorMsg } from '../components/ui/ErrorMsg';
import { Loader } from '../components/ui/Loader';
import { LoaderProgress } from '../components/ui/LoaderProgress';
import { RemindersList } from '../components/ui/remindersLists/RemindersList';
import { PaginationButtons } from '../components/ui/pagination/PaginationButtons';

import { errorMessages } from '../data/constants';
import { handlePageClick } from '../utils/utils';

export const Reminders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingReminders, setIsLoadingReminders] = useState(false);
  const [error, setError] = useState(null);

  const [type, setType] = useState('0');
  const [page, setPage] = useState(null);

  const userToken = useSelector(selectUserToken);
  const {
    data: reminders = {},
    isLoading: isRemindersLoading,
    isFetching: isRemindersFetching,
    error: remindersError,
  } = useGetRemindersQuery(
    {
      token: userToken,
      type,
      page,
    },
    { refetchOnMountOrArgChange: true, skip: !type }
  );

  const loadData = () => {
    if (!isRemindersLoading && reminders && !isRemindersFetching) {
      setIsLoading(false);
    }

    if (remindersError) {
      setError(errorMessages.reminders);
      setIsLoading(false);
    }
  };

  const handleTemplateClick = () => {};

  const handleTabClick = value => {
    setType(value);
  };

  const handleNextClick = () => {
    handlePageClick(reminders?.links?.next, setPage);
  };

  const handlePrevClick = () => {
    handlePageClick(reminders?.links?.prev, setPage);
  };

  useEffect(() => {
    setIsLoadingReminders(isRemindersFetching);
  }, [isRemindersFetching]);

  useEffect(() => {
    loadData();
  }, [reminders, isRemindersLoading]);

  return (
    <Container>
      <div className="flex flex-col items-start gap-4">
        {/* <ButtonTemplate
          text={'Message template'}
          handleClick={handleTemplateClick}
        /> */}

        <TabBar
          handleTabClick={handleTabClick}
          isLoading={isLoading}
        />

        {isLoadingReminders && <LoaderProgress />}

        {isLoading && (
          <div className="flex justify-center items-center h-40 w-full">
            <Loader
              width={30}
              height={30}
            />
          </div>
        )}

        {reminders?.data && reminders?.data?.length > 0 && !isRemindersFetching && (
          <>
            <div className='flex justify-end w-full'>
              <PaginationButtons
                links={reminders?.links}
                handleNextClick={handleNextClick}
                handlePrevClick={handlePrevClick}
                meta={reminders?.meta}
              />
            </div>

            <RemindersList
              type={type}
              reminders={reminders.data}
            />

            <div className='flex justify-end w-full'>
              <PaginationButtons
                links={reminders?.links}
                handleNextClick={handleNextClick}
                handlePrevClick={handlePrevClick}
                meta={reminders?.meta}
              />
            </div>
          </>
        )}

        {reminders?.data?.length < 1 && (
          <div className="flex justify-center items-center h-40 w-full">
            <span className="text-blackColor font-medium text-ml">
              No reminders
            </span>
          </div>
        )}

        {error && error.length > 0 && !isLoading && (
          <ErrorMsg message={error} />
        )}
      </div>
    </Container>
  );
};
