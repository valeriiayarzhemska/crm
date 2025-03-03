import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';

import { useDispatch, useSelector } from 'react-redux';
import { useGetSearchInputRealtiesQuery } from '../../../../../redux/services/search/searchApi';
import { selectUserToken } from '../../../../../redux/features/user/userSelectors';
import {
  setTotalSearchResults,
  showSearch,
} from '../../../../../redux/features/dashboard/dashboardSlice';

import { SearchItem } from '../SearchItem';
import { Loader } from '../../../../ui/Loader';

export const SearchListRealty = ({
  setIsOpen = () => {},
  setClosedManuallySearch = () => {},
  formProps = {},
  inputName = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const listRef = useRef(null);
  const dispatch = useDispatch();

  const userToken = useSelector(selectUserToken);
  const {
    data: realties = {},
    isFetching: isRealtiesLoading,
    error: realtiesError,
  } = useGetSearchInputRealtiesQuery(
    {
      token: userToken,
      search_query: searchQuery,
    },
    { skip: !searchQuery }
  );

  const handleShowAllClick = async () => {
    await dispatch(showSearch({
      isSearchVisible: true,
      searchQuery,
      searchFilters: '',
      searchPage: null, 
    }));
    setIsOpen(false);
  };

  const handleDebounceSearch = useCallback(
    debounce(value => {
      setSearchQuery(value);
    }, 1000),
    []
  );

  const handleSearch = value => {
    handleDebounceSearch(value);
  };

  const handleItemClick = async query => {
    await dispatch(showSearch({
      isSearchVisible: true,
      searchQuery: query,
      searchFilters: '',
      searchPage: null,
    }));
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isRealtiesLoading && realties?.realties) {
      setIsLoading(false);
      dispatch(setTotalSearchResults(realties?.total ? realties.total : 0));
    }
  }, [realties, isRealtiesLoading]);

  useEffect(() => {
    setIsLoading(true);

    if (formProps?.values?.[inputName]) {
      handleSearch(formProps?.values?.[inputName]);
    } else {
      handleSearch('');
    }

    setIsLoading(false);
  }, [formProps?.values?.[inputName]?.length]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (document.querySelector('.dialog')) {
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
      className="absolute top-[44px] w-fit border-[1px] b-gray-200 bg-white shadow-md z-[2]"
    >
      {isLoading ||
        (isRealtiesLoading && (
          <div className="flex justify-center items-center p-1.5 w-64 h-14 sm:w-[348px]">
            <Loader />
          </div>
        ))}

      {!isLoading &&
      !isRealtiesLoading &&
      realties?.realties &&
      realties?.realties?.length ? (
          <>
            {realties?.realties.map((item, index) => {
              if (index < 10) {
                return (
                  <SearchItem
                    key={item.id}
                    item={item}
                    handleItemClick={handleItemClick}
                  />
                );
              } else {
                return;
              }
            })}

            {realties?.links?.next && (
              <div
                onClick={handleShowAllClick}
                className="flex justify-center p-1.5 bg-gray-200"
              >
                <span className="text-xs">Show all results</span>
              </div>
            )}
          </>
        ) : null}

      {!isLoading &&
      !isRealtiesLoading &&
      searchQuery.length > 0 &&
      realties?.realties?.length === 0 && (
        <div className="flex justify-center items-center p-1.5 w-64 h-14 sm:w-[348px]">
          <span className="text-xs">Nothing found</span>
        </div>
      )}

      {!isLoading && !isRealtiesLoading && error && error.length > 0 && (
        <div className="flex justify-center items-center p-1.5 w-64 h-14 sm:w-[348px]">
          <span className="text-sm font-medium text-blackColor">{error}</span>
        </div>
      )}
    </div>
  );
};
