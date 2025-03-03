import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsSearch,
  selectSearchQuery,
} from '../redux/features/dashboard/dashboardSelectors';
import {
  setSearchRequestInfo,
  showSearch,
} from '../redux/features/dashboard/dashboardSlice';

import { Container } from '../layouts/Container';
import { ResultsTable } from '../components/ui/ResultsTable';
import { SortBlock } from '../components/ui/SortBlock';
import { ButtonTemplate } from '../components/ui/buttons/ButtonTemplate';
import { RealtyList } from '../components/ui/RealtyList';
import { Loader } from '../components/ui/Loader';
import { SearchForm } from '../components/form/forms/searchFormComponents/SearchForm';
import { RealtyListSearch } from '../components/ui/RealtyListSearch';

export const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSort, setShowSort] = useState(false);
  const [showAdditionalFilters, setShowAdditionalFilters] = useState(false);

  const dispatch = useDispatch();
  const isSearchShown = useSelector(selectIsSearch);
  const searchQueryData = useSelector(selectSearchQuery);

  const handleReturnToMain = async () => {
    await dispatch(
      showSearch({
        isSearchVisible: false,
        searchQuery: searchQueryData,
        searchFilters: '',
        searchPage: null,
      })
    );

    await dispatch(setSearchRequestInfo(null));
  };

  useEffect(() => {
    setShowAdditionalFilters(isSearchShown);
    setShowSort(isSearchShown);
  }, [isSearchShown]);

  return (
    <Container>
      {isSearchShown && (
        <ButtonTemplate
          text={'Return to main'}
          classes={'bg-white border-gray-200 mb-4'}
          handleClick={handleReturnToMain}
        />
      )}

      <SearchForm
        showAdditionalFilters={showAdditionalFilters}
        setShowAdditionalFilters={setShowAdditionalFilters}
        showSort={showSort}
        setShowSort={setShowSort}
      />

      {showSort && <SortBlock />}

      {isSearchShown ? (
        <RealtyListSearch
          isSearch={isSearchShown}
          setIsLoading={setIsLoading}
        />
      ) : (
        <>
          <div className="hide-scroll flex justify-between gap-3 mb-6 overflow-auto w-full lg:overflow-scroll">
            <ResultsTable />
          </div>

          <RealtyList
            isSearch={isSearchShown}
            setIsLoading={setIsLoading}
          />
        </>
      )}

      {isLoading && (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-screen bg-whiteColor z-[2]">
          <Loader
            width={40}
            height={40}
          />
        </div>
      )}
    </Container>
  );
};
