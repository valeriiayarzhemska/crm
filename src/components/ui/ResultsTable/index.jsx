import { useEffect, useState } from 'react';
import cn from 'classnames';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../redux/features/user/userSelectors';
import { useGetAgentResultsQuery } from '../../../redux/services/data/agentResultsApi';

import { ResultsTableItem } from '../ResultsTableItem';
import { DateRangePicker } from '../../form/inputs/DateRangePicker';
import { ButtonTemplate } from '../buttons/ButtonTemplate';

import { errorMessages, myResults } from '../../../data/constants';
import {
  formatDateToString,
} from '../../../utils/utils';
import { showError } from '../../../utils/ui';

export const ResultsTable = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);

  const userToken = useSelector(selectUserToken);
  const {
    data: list = {},
    isFetching: isListLoading,
    error: listError,
  } = useGetAgentResultsQuery(
    {
      token: userToken,
      start_date: startDate,
      end_date: endDate,
    },
    { skip: !startDate || !endDate, refetchOnMountOrArgChange: true }
  );

  const handleClick = () => {
    setIsTableOpen(!isTableOpen);
  };

  const handleDateClick = date => {
    const from = formatDateToString(date.from);
    const to = formatDateToString(date.to);

    setStartDate(from);
    setEndDate(to);
  };

  const updateResults = () => {
    const newResults = myResults.map(item => {
      const { fieldTitle } = item;

      let value = 'No data';

      if (Object.prototype.hasOwnProperty.call(list, fieldTitle)) {
        value = list[fieldTitle];
      }

      return { ...item, value };
    });

    setResults(newResults);
    setIsLoading(false);
  };

  useEffect(() => {
    if (listError) {
      showError(errorMessages.agentResults);
    }
  }, [listError]);

  useEffect(() => {
    if (!isListLoading && list && startDate && endDate) {
      updateResults();
    }
  }, [isListLoading, list]);

  return (
    <div
      className={cn({
        'flex flex-col justify-between gap-4 py-3 px-2 w-[430px] min-w-[430px] bg-lightestGrayColor border-[1px] border-gray-200 lg:w-[50%]':
          isTableOpen,
      })}
    >
      <div className="flex justify-between items-center gap-1">
        <ButtonTemplate
          text={'My results'}
          classes={
            isTableOpen
              ? 'bg-lightestGrayColor border-lightestGrayColor font-bold italic'
              : 'bg-white border-gray-200 '
          }
          handleClick={handleClick}
        />

        {isTableOpen && <DateRangePicker handleClick={handleDateClick} />}
      </div>

      {isTableOpen && list && !isLoading && (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {results.map(({ id, title, value }) => {
              return (
                <ResultsTableItem
                  key={id}
                  title={title}
                  value={value}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
