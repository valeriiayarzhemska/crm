import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

import { useDispatch, useSelector } from 'react-redux';
import { useGetSearchFiltersDataQuery } from '../../../../../redux/services/search/searchApi';
import {
  selectIsSearch,
  selectMockAdditional,
  selectMockMore,
  selectMockSort,
  selectSearchInitialValues,
  selectSearchRequestInfo,
} from '../../../../../redux/features/dashboard/dashboardSelectors';
import { selectUserToken } from '../../../../../redux/features/user/userSelectors';
import { useGetCitiesForCountryQuery } from '../../../../../redux/services/data/citiesApi';
import {
  setSearchInitialValues,
  setSearchLoading,
  setSearchMockAdditional,
  setSearchMockMore,
  setSearchMockSort,
  setSortBy,
  showSearch,
} from '../../../../../redux/features/dashboard/dashboardSlice';
import { useGetAgentsAssistantsWithUserQuery } from '../../../../../redux/services/agents/agentsApi';

import {
  mockSort,
  mockAdditional,
  mockMore,
  initialSearchValuesNames,
  localisationSelectData,
  searchValuesNames,
} from '../../../../../lib/mocks/search-mock';
import { SearchButtonBar } from '../../../../ui/SearchButtonBar';
import { SearchFormTemplate } from '../../searchFormComponents/SearchFormTemplate';
import { InputsTemplate } from '../../../inputs/InputsTemplate';
import { SearchFormFilters } from '../SearchFormFilters';
import { LoaderProgress } from '../../../../ui/LoaderProgress';
import { SearchFormClientInfo } from '../SearchFormClientInfo';
import { SearchFormInputs } from '../SearchFormInputs';
import { IconButtonTemplate } from '../../../../ui/buttons/IconButtonTemplate';
import { ButtonTemplate } from '../../../../ui/buttons/ButtonTemplate';

import {
  colors,
  errorMessages,
  searchRequestSortButtons,
} from '../../../../../data/constants';
import {
  getDefaultValues,
  transformRequestToSearch,
  transformSearchMock,
  transformSortMock,
} from '../../../../../utils/data';
import { initialValues } from '../../../../../lib/mocks/add-request-mock';
import { generateSearchQueriesRealty } from '../../../../../utils/utils';

export const SearchForm = ({
  showAdditionalFilters = false,
  setShowAdditionalFilters = () => {},
  showSort = false,
  setShowSort = () => {},
}) => {
  const dispatch = useDispatch();
  const inputsSort = useSelector(selectMockSort);
  const newInitialValues = useSelector(selectSearchInitialValues);
  const isSearchShown = useSelector(selectIsSearch);
  const searchRequest = useSelector(selectSearchRequestInfo);
  const inputsMore = useSelector(selectMockMore);
  const inputsAdditional = useSelector(selectMockAdditional);
  const userToken = useSelector(selectUserToken);

  const [isLoading, setIsLoading] = useState(true);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [isResetClicked, setIsResetClicked] = useState(false);
  const [isSearchClientRequest, setIsSearchClientRequest] = useState(false);
  const [activeButton, setActiveButton] = useState(
    searchRequestSortButtons.all
  );

  const [inputsRefs, setInputsRefs] = useState({});
  const [multiSelectRefs, setMultiSelectRefs] = useState({});
  const [datePickerRefs, setDatePickerRefs] = useState({});
  const [statesInputsFromTo, setStatesInputsFromTo] = useState([]);

  const [removedCityId, setRemovedCityId] = useState(null);
  const citiesId = new Set();

  const {
    data: filters = {},
    isLoading: isFiltersLoading,
    error: filtersError,
  } = useGetSearchFiltersDataQuery(userToken);
  const {
    data: cities,
    isLoading: isCitiesLoading,
    error: citiesError,
  } = useGetCitiesForCountryQuery({
    country_id: 73, // France countryId
  });
  const {
    data: agents,
    isFetching: isAgentsLoading,
    error: agentsError,
  } = useGetAgentsAssistantsWithUserQuery(userToken);

  const handleSettingsClick = () => {
    setShowAdditionalFilters(!showAdditionalFilters);
    setIsFirstClick(!isFirstClick);
  };

  const handleSearchReset = () => {
    Object.entries(inputsRefs).forEach(([refName, ref]) => {
      if (ref && ref.setFieldValue) {
        ref.setFieldValue(refName, '');
      }
    });
  };

  const handleResetClick = () => {
    setIsResetClicked(true);

    Object.entries(multiSelectRefs).forEach(([refName, ref]) => {
      if (ref && ref.current && ref.current.resetSelectedValues) {
        ref.current.resetSelectedValues();
        ref.current.state.searchValue = '';
        ref.setFieldValue(refName, '');
      }
    });

    Object.entries(datePickerRefs).forEach(([refName, ref]) => {
      if (ref && ref.current && ref.current.clearDate) {
        ref.current.clearDate();
        ref.setFieldValue(refName, '');
      }
    });

    statesInputsFromTo.forEach(setState => {
      setState('');
    });

    //removeKeywordTags();
  };

  const handleSubmit = async values => {
    if (values && values.nativeEvent && values._reactName) {
      console.warn('SyntheticBaseEvent detected. Submission aborted.');

      return;
    }

    setShowSort(true);

    const query = await generateSearchQueriesRealty(
      initialSearchValuesNames,
      localisationSelectData,
      searchValuesNames,
      values
    );

    await dispatch(
      showSearch({
        isSearchVisible: true,
        searchQuery: '',
        searchFilters: query,
        searchPage: null,
      })
    );

    await dispatch(setSearchLoading(false));
  };

  const handleCityIdRemove = (valuesList, name, removedItem) => {
    if (removedItem) {
      setRemovedCityId(removedItem.value);
    }
  };

  const handleSortSelection = async selectedItem => {
    await dispatch(setSortBy(selectedItem.value));
  };

  const updateMock = async () => {
    const newMock = await transformSearchMock({
      mockAdditional,
      mockMore,
      filters,
      cities,
      agents,
      handleCityIdRemove,
    });
    const newSortMock = await transformSortMock(mockSort, handleSortSelection);

    await dispatch(setSearchMockAdditional(newMock.newMockAdditional));
    await dispatch(setSearchMockMore(newMock.newMockMore));
    await dispatch(setSearchMockSort(newSortMock));
  };

  const handleRequestSearch = async () => {
    await dispatch(setSearchLoading(true));

    const requestValues = await transformRequestToSearch(
      searchRequest,
      initialValues
    );

    await dispatch(setSearchInitialValues(requestValues.initialValues));

    const requestMockAdditional = await getDefaultValues(
      requestValues.values,
      inputsAdditional,
      { cities }
    );

    const requestMockMore = await getDefaultValues(
      requestValues.values,
      inputsMore
    );

    await dispatch(setSearchMockAdditional(requestMockAdditional));
    await dispatch(setSearchMockMore(requestMockMore));

    setIsSearchClientRequest(true);

    handleSubmit(requestValues.initialValues);

    setActiveButton(searchRequestSortButtons.all);
  };

  const handleLikeSortClick = async type => {
    await dispatch(setSearchLoading(true));

    await dispatch(
      showSearch({
        isSearchVisible: true,
        searchQuery: '',
        searchQueryRequest: searchRequest.id,
        searchFilters: `?search_type=3&like=${type}`,
        searchPage: null,
      })
    );

    await dispatch(setSearchLoading(false));

    setActiveButton(type);
  };

  useEffect(() => {
    if (!isSearchShown) {
      handleSearchReset();
      handleResetClick();
    }
  }, [isSearchShown]);

  useEffect(() => {
    if (searchRequest && !isLoading) {
      handleRequestSearch();
    }
  }, [searchRequest, isLoading]);

  useEffect(() => {
    if (
      !isFiltersLoading &&
      filters &&
      !isCitiesLoading &&
      cities &&
      !isAgentsLoading &&
      agents
    ) {
      updateMock();
      setIsLoading(false);
    }

    if (filtersError) {
      toast.error(errorMessages.filters, {
        error: true,
        action: {},
      });
    }

    if (citiesError) {
      toast.error(errorMessages.countriesOrCitites, {
        error: true,
        action: {},
      });
    }
  }, [
    filters,
    isFiltersLoading,
    cities,
    isCitiesLoading,
    agents,
    isAgentsLoading,
  ]);

  return (
    <div className="flex gap-1 mb-4 min-h-[100px]">
      {isLoading && <LoaderProgress />}

      <SearchButtonBar />

      {!isLoading && (
        <div className="relative flex gap-2 flex-wrap flex-col w-full">
          <SearchFormTemplate
            initialValues={newInitialValues}
            handleSubmitForm={handleSubmit}
          >
            {formProps => (
              <div className="flex flex-col gap-2">
                <SearchFormInputs
                  formProps={formProps}
                  handleSettingsClick={handleSettingsClick}
                  setMultiSelectRefs={setMultiSelectRefs}
                  isResetClicked={isResetClicked}
                  setIsResetClicked={setIsResetClicked}
                  setInputsRefs={setInputsRefs}
                />

                <SearchFormFilters
                  formProps={formProps}
                  showAdditionalFilters={showAdditionalFilters}
                  setMultiSelectRefs={setMultiSelectRefs}
                  setIsResetClicked={setIsResetClicked}
                  setStatesInputsFromTo={setStatesInputsFromTo}
                  isResetClicked={isResetClicked}
                  setDatePickerRefs={setDatePickerRefs}
                  handleSubmit={handleSubmit}
                  handleResetClick={handleResetClick}
                  removedCityId={removedCityId}
                  setRemovedCityId={setRemovedCityId}
                  citiesId={citiesId}
                />

                {showSort && (
                  <div className="flex flex-wrap gap-2 items-center">
                    <InputsTemplate
                      formProps={formProps}
                      inputsList={inputsSort}
                    />

                    {searchRequest && (
                      <div className="flex gap-2 h-fit">
                        <ButtonTemplate
                          bgColor={
                            activeButton === searchRequestSortButtons.all
                              ? 'bg-redColor border-redColor'
                              : ''
                          }
                          text="All"
                          handleClick={handleRequestSearch}
                        />

                        <IconButtonTemplate
                          icon={ThumbsUp}
                          color={
                            activeButton === searchRequestSortButtons.like
                              ? colors.whiteColor
                              : colors.blackColor
                          }
                          classes={
                            activeButton === searchRequestSortButtons.like
                              ? 'bg-redColor border-redColor border-[1px]'
                              : 'border-[1px] border-gray-200'
                          }
                          handleClick={() => handleLikeSortClick('like')}
                        />

                        <IconButtonTemplate
                          icon={ThumbsDown}
                          color={
                            activeButton === searchRequestSortButtons.dislike
                              ? colors.whiteColor
                              : colors.blackColor
                          }
                          classes={
                            activeButton === searchRequestSortButtons.dislike
                              ? 'bg-redColor border-redColor border-[1px]'
                              : 'border-[1px] border-gray-200'
                          }
                          handleClick={() => handleLikeSortClick('dislike')}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </SearchFormTemplate>

          {isSearchClientRequest && <SearchFormClientInfo />}
        </div>
      )}
    </div>
  );
};
