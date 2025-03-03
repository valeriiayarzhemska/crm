import { useState } from 'react';

import { DealsItem } from '../DealsItem';
import { ListingsItem } from '../ListingsItem';
import { LoaderProgress } from '../../LoaderProgress';

import { tabs } from '../../../../data/constants';

export const RemindersList = ({ reminders = [], type = '0' }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading && <LoaderProgress />}

      <div className="flex flex-col gap-4 w-full">
        {reminders.map(reminder => {
          switch (Number(type)) {
          case Number(tabs[0].value):
            return (
              <DealsItem
                key={reminder.id}
                reminder={reminder}
                setIsLoading={setIsLoading}
              />
            );
          case Number(tabs[1].value):
          case Number(tabs[2].value):
            return (
              <ListingsItem
                key={reminder.id}
                reminder={reminder}
                setIsLoading={setIsLoading}
              />
            );
          default:
            return (
              <DealsItem
                key={reminder.id}
                reminder={reminder}
                setIsLoading={setIsLoading}
              />
            );
          }
        })}
      </div>
    </>
  );
};
