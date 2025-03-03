import { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../../../redux/features/user/userSelectors';
import { useGetResidencesForCityQuery } from '../../../../../redux/services/data/residencesApi';

import { Loader } from '../../../../ui/Loader';
import { SearchItemResidences } from '../SearchItemResidences';

import { selectsDependentNames } from '../../../../../lib/mocks/add-realty-mock';
import {
  residencesData,
  residencesDataError,
  residencesDataLoading,
} from '../../../../../redux/features/dashboard/dashboardSelectors';

export const SearchListResidences = ({
  setIsOpen,
  setClosedManuallySearch,
  formProps = {},
  inputName = '',
  handleEmptyList = () => {},
}) => {
  const userToken = useSelector(selectUserToken);

  const residences = useSelector(residencesData);
  const isResidencesLoading = useSelector(residencesDataLoading);
  const residencesError = useSelector(residencesDataError);

  const [isLoading, setIsLoading] = useState(isResidencesLoading);
  const [error, setError] = useState('');
  const listRef = useRef(null);

  const handleClick = async selectedItem => {
    if (formProps?.setFieldValue) {
      await formProps?.setFieldValue(inputName, selectedItem?.id);
    }

    setIsOpen(false);
  };

  const loadResidences = async () => {
    if (residences && residences.length > 0) {
      setError('');
    } else if (residencesError) {
      setError(residencesError.originalStatus, residencesError.status);
    }

    setIsLoading(isResidencesLoading);
  };

  useEffect(() => {
    handleEmptyList(residences);
  }, [formProps?.values?.[inputName]?.length]);

  useEffect(() => {
    loadResidences();
  }, [residences, isResidencesLoading]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        document.querySelector('.dialog') &&
        !document.querySelector('.dialog-with-click')
      ) {
        return;
      }

      if (
        listRef.current &&
        !listRef.current.contains(event.target) &&
        !event.target.classList.contains('exclude-click')
      ) {
        setIsOpen(false);
        setClosedManuallySearch(true);

        setTimeout(() => {
          setClosedManuallySearch(false);
        }, 100);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [listRef, setIsOpen, setClosedManuallySearch]);

  return (
    <div
      ref={listRef}
      className="absolute top-[42px] left-0 w-screen max-h-[500px] border-[1px] b-gray-200 bg-white shadow-md z-[2] overflow-y-auto hide-scroll sm:w-fit"
    >
      {!isLoading && (
        <>
          {residences.map((item, index) => {
            if (index < 10) {
              return (
                <SearchItemResidences
                  key={item.id}
                  item={item}
                  handleClick={handleClick}
                />
              );
            } else {
              return;
            }
          })}
        </>
      )}

      {isLoading && (
        <div className="flex justify-center py-3 px-1.5 w-full sm:w-[348px]">
          <Loader
            width={26}
            height={26}
          />
        </div>
      )}

      {residences && residences.length === 0 && !isLoading && !error && (
        <div className="flex justify-center py-3 px-1.5 px-1.5 w-full sm:w-[348px]">
          <span className="text-sm font-medium text-blackColor">
            Nothing found
          </span>
        </div>
      )}

      {error && error.length > 0 && (
        <div className="flex justify-center py-3 px-1.5 px-1.5 w-full sm:w-[348px]">
          <span className="text-sm font-medium text-blackColor">{error}</span>
        </div>
      )}
    </div>
  );
};
