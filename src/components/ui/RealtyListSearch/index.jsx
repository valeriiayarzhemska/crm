import { useEffect, useState } from 'react';
import cn from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import { selectUserToken } from '../../../redux/features/user/userSelectors';
import { setTotalSearchResults } from '../../../redux/features/dashboard/dashboardSlice';
import {
  selectSearchFilters,
  selectSearchPage,
  selectSearchQuery,
  selectSearchQueryRequest,
  selectSearchType,
  selectShowMap,
  selectSortBy,
} from '../../../redux/features/dashboard/dashboardSelectors';
import { useGetSearchRealtiesMapQuery, useGetSearchRealtiesQuery } from '../../../redux/services/search/searchApi';

import { ErrorMsg } from '../ErrorMsg';
import { CardRealty } from '../realtyCard/CardRealty';
import { LoaderProgress } from '../LoaderProgress';
import { PaginationButtons } from '../pagination/PaginationButtons';
import Map from '../mapComponent/Map';

import { errorMessages } from '../../../data/constants';
import { handlePageClick } from '../../../utils/utils';

export const RealtyListSearch = ({
  isSearch = false,
  setIsLoading = false,
}) => {
  const [isLoadingRealties, setIsRealtiesLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchType, setSearchType] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryRequest, setSearchQueryRequest] = useState('');
  const [searchQueryFilters, setSearchQueryFilters] = useState('');
  const [searchSortBy, setSearchSortBy] = useState(null);
  const [pageSearch, setPageSearch] = useState(null);

  const dispatch = useDispatch();
  const userToken = useSelector(selectUserToken);
  const searchTypeData = useSelector(selectSearchType);
  const searchQueryData = useSelector(selectSearchQuery);
  const searchQueryDataRequest = useSelector(selectSearchQueryRequest);
  const searchPageData = useSelector(selectSearchPage);
  const searchFilters = useSelector(selectSearchFilters);
  const sortBy = useSelector(selectSortBy);
  const showMap = useSelector(selectShowMap);

  const {
    data: realtiesSearch = [],
    isLoading: isRealtiesSearchLoading,
    isFetching: isRealtiesSearchFetching,
    error: realtiesSearchError,
  } = useGetSearchRealtiesQuery(
    {
      token: userToken,
      search_type: searchType,
      search_query: searchQuery,
      search_query_request: searchQueryRequest,
      search_filters: searchQueryFilters,
      sort_by: searchSortBy,
      page: pageSearch,
    },
    {
      skip: !isSearch && (!searchQuery || !searchQueryFilters || !pageSearch),
      refetchOnMountOrArgChange: true,
    }
  );

  const {
    data: realtiesMap = [],
    isLoading: isRealtiesMapLoading,
    isFetching: isRealtiesMapFetching,
    error: realtiesMapError,
  } = useGetSearchRealtiesMapQuery(
    {
      token: userToken,
      search_query: searchQuery,
      search_filters: searchQueryFilters,
    },
    {
      skip: !showMap /* && (!searchQuery || !searchQueryFilters || !pageSearch) */,
      refetchOnMountOrArgChange: true,
    }
  );

  const loadRealtiesSearch = async () => {
    setIsRealtiesLoading(isRealtiesSearchFetching);

    if (
      !isRealtiesSearchFetching &&
      realtiesSearch?.realties &&
      !realtiesSearchError
    ) {
      setError(null);
      await dispatch(
        setTotalSearchResults(
          realtiesSearch?.links?.total ? realtiesSearch.links.total : 0
        )
      );
    }

    if (realtiesSearchError) {
      setError(errorMessages.data);
    }
  };

  const handlePrevClick = () => {
    handlePageClick(realtiesSearch?.links?.prev, setPageSearch);
  };

  const handleNextClick = () => {
    handlePageClick(realtiesSearch?.links?.next, setPageSearch);
  };

  useEffect(() => {
    setIsRealtiesLoading(isRealtiesSearchLoading);
  }, [isRealtiesSearchLoading]);

  useEffect(() => {
    if (searchTypeData) {
      setSearchType(searchTypeData);
    }
  }, [searchTypeData]);

  useEffect(() => {
    if (
      searchQueryData?.toString() &&
      searchQueryData?.toString()?.length > 0
    ) {
      setSearchQuery(searchQueryData);
    }
  }, [searchQueryData]);

  useEffect(() => {
    if (
      searchQueryDataRequest?.toString() &&
      searchQueryDataRequest?.toString()?.length > 0
    ) {
      setSearchQueryRequest(searchQueryDataRequest);
    }
  }, [searchQueryDataRequest]);

  useEffect(() => {
    if (searchFilters && searchFilters.length > 0) {
      setSearchQueryFilters(searchFilters);
    }
  }, [searchFilters]);

  useEffect(() => {
    setSearchSortBy(sortBy);
  }, [sortBy]);

  useEffect(() => {
    setPageSearch(searchPageData);
  }, [searchPageData]);

  useEffect(() => {
    setIsLoading(isRealtiesSearchLoading);
  }, [isRealtiesSearchLoading]);

  useEffect(() => {
    loadRealtiesSearch();
  }, [realtiesSearch?.realties, isRealtiesSearchFetching]);

  return (
    <>
      {realtiesSearch?.realties && realtiesSearch?.realties?.length > 0 && (
        <>
          <div className="flex justify-end mb-3">
            <PaginationButtons
              links={realtiesSearch?.links}
              meta={{
                to: realtiesSearch?.links?.to,
                from: realtiesSearch?.links?.from,
                total: realtiesSearch?.links?.total,
              }}
              handleNextClick={handleNextClick}
              handlePrevClick={handlePrevClick}
            />
          </div>

          <div className="flex flex-col-reverse gap-3 w-full h-full lg:flex-row">
            <div
              className={cn(
                'flex gap-3 h-max overflow-y-auto',
                { 'w-full flex-wrap': !showMap },
                { 'flex-col w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[750px] 3xl:h-[800px] xs:max-w-[360px] hide-scroll': showMap }
              )}
            >
              {realtiesSearch?.realties?.map(realty => {
                return (
                  <CardRealty
                    key={realty?.id}
                    realty={realty}
                  />
                );
              })}
            </div>

            {showMap && (
              <div className="flex w-full h-[500px] sm:h-[600px] md:h-[700px] lg:h-[750px] 3xl:h-[800px]">
                <Map realties={realtiesMap} />
              </div>
            )}
          </div>

          <div className="flex justify-end mt-3">
            <PaginationButtons
              links={realtiesSearch?.links}
              meta={{
                to: realtiesSearch?.links?.to,
                from: realtiesSearch?.links?.from,
                total: realtiesSearch?.links?.total,
              }}
              handleNextClick={handleNextClick}
              handlePrevClick={handlePrevClick}
            />
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
