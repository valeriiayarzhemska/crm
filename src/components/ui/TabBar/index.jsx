import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../redux/features/user/userSelectors';
import { useGetRemindersCounterQuery } from '../../../redux/services/reminders/remindersApi';

import { TabLink } from '../TabLink';

import { errorMessages, tabs, tabsTitles } from '../../../data/constants';
import { showError } from '../../../utils/ui';

export const TabBar = ({ isLoading = false, handleTabClick = () => {} }) => {
  const [updatedTabs, setUpdatedTabs] = useState([]);
  const [activeButton, setActiveButton] = useState(0);

  const userToken = useSelector(selectUserToken);
  const {
    data: remindersCounter = [],
    isFetching: isRemindersCounterLoading,
    error: remindersCounterError,
  } = useGetRemindersCounterQuery(
    {
      token: userToken,
    },
    { refetchOnMountOrArgChange: true }
  );

  const updateTabs = () => {
    if (!isRemindersCounterLoading && remindersCounter) {
      const newTabs = tabs.map(tab => {
        switch (tab.title) {
        case tabsTitles.Deals:
          return {
            ...tab,
            amount: remindersCounter?.dealsReminder,
            handleTabClick,
          };
        case tabsTitles.Listings:
          return {
            ...tab,
            amount: remindersCounter?.listingsReminder,
            handleTabClick,
          };
        case tabsTitles.Mandates:
          return {
            ...tab,
            amount: remindersCounter?.mandatesReminder,
            handleTabClick,
          };
        default:
          return tab;
        }
      });

      setUpdatedTabs(newTabs);
    }

    if (remindersCounterError) {
      showError(errorMessages.remindersCounters);
    }
  };

  useEffect(() => {
    updateTabs();
  }, [remindersCounter, isRemindersCounterLoading]);

  return (
    <>
      {!isLoading && (
        <div className="flex flex-wrap items-center gap-3 mb-5 w-full">
          {updatedTabs.map(tab => {
            return (
              <TabLink
                key={tab.id}
                tab={tab}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
