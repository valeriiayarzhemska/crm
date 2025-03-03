import { useEffect, useState } from 'react';
import cn from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import { selectUserToken } from '../../../redux/features/user/userSelectors';
import { useGetRealtiesQuery } from '../../../redux/services/realties/realtiesApi';
import { setTotalSearchResults } from '../../../redux/features/dashboard/dashboardSlice';

import { ErrorMsg } from '../ErrorMsg';
import { CardRealty } from '../realtyCard/CardRealty';
import { ToggleGroupTemplate } from '../../form/inputs/ToggleGroupTemplate';

import {
  errorMessages,
  realtyListToggleData,
  realtyListToggleTitles,
} from '../../../data/constants';
import { LoaderProgress } from '../LoaderProgress';
import { PaginationButtons } from '../pagination/PaginationButtons';
import { handlePageClick } from '../../../utils/utils';

export const RealtyList = ({
  setIsLoading = () => {},
  isSearch = false,
  isPwa = false,
}) => {
  const [isLoadingRealties, setIsRealtiesLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toggleList, setToggleList] = useState([]);

  const [page, setPage] = useState(null);
  const [activeSeachType, setActiveSeachType] = useState('');

  const dispatch = useDispatch();
  const userToken = useSelector(selectUserToken);
  const {
    data: realties = {},
    isLoading: isRealtiesLoading,
    isFetching: isRealtiesFetching,
    error: realtiesError,
  } = useGetRealtiesQuery(
    {
      token: userToken,
      page,
      searchType: activeSeachType,
    },
    { refetchOnMountOrArgChange: true, skip: isSearch }
  );

  const loadRealties = () => {
    setIsRealtiesLoading(isRealtiesLoading);

    if (!isRealtiesLoading && realties && !realtiesError) {
      setError(null);
      dispatch(setTotalSearchResults(realties?.total ? realties.total : 0));
    }

    if (realtiesError) {
      setError(errorMessages.data);
    }
  };

  const handlePrevClick = () => {
    handlePageClick(realties?.links?.prev, setPage);
  };

  const handleNextClick = () => {
    handlePageClick(realties?.links?.next, setPage);
  };

  const handleToggleClick = value => {
    setActiveSeachType(value?.toLowerCase());
    setPage(1);
  };

  const handlersForToggle = {
    [realtyListToggleTitles.Team]: () =>
      handleToggleClick(realtyListToggleTitles.Team),
    [realtyListToggleTitles.Me]: () =>
      handleToggleClick(realtyListToggleTitles.Me),
  };

  const addHandleForToggles = data => {
    return data.map(item => {
      const handleClick = handlersForToggle[item.title] || (() => {});

      return { ...item, handleClick };
    });
  };

  const addHandlers = async () => {
    const newToggleList = await addHandleForToggles(realtyListToggleData);

    setToggleList(newToggleList);
  };

  useEffect(() => {
    addHandlers();
  }, []);

  useEffect(() => {
    setIsLoading(isRealtiesLoading);
  }, [isRealtiesLoading]);

  useEffect(() => {
    setIsRealtiesLoading(isRealtiesFetching);
  }, [isRealtiesFetching]);

  useEffect(() => {
    loadRealties();
  }, [realties?.data, isRealtiesLoading]);

  return (
    <>
      {!isSearch && (
        <>
          <div className="flex justify-between mb-3">
            <ToggleGroupTemplate
              toggleType={'single'}
              defaultValue={realtyListToggleData[0]}
              toggleList={toggleList}
              className={'justify-start gap-0'}
            />

            <PaginationButtons
              links={realties?.links}
              meta={realties?.meta}
              handleNextClick={handleNextClick}
              handlePrevClick={handlePrevClick}
            />
          </div>

          <div
            className={cn('flex flex-col gap-3 overflow-x-auto hide-scroll', {
              'xs:flex-row': !isPwa,
            })}
          >
            {realties?.data?.map(realty => {
              return (
                <CardRealty
                  key={realty?.id}
                  realty={realty}
                  isPwa={isPwa}
                />
              );
            })}
          </div>
        </>
      )}

      {isLoadingRealties && <LoaderProgress />}

      {error && (
        <div className="flex justify-center w-full h-20">
          <ErrorMsg message={errorMessages.data} />
        </div>
      )}
    </>
  );
};
