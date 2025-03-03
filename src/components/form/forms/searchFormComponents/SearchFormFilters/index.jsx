import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Search } from 'lucide-react';

import { useDispatch, useSelector } from 'react-redux';
import { selectUserToken } from '../../../../../redux/features/user/userSelectors';
import { useGetResidencesForCityQuery } from '../../../../../redux/services/data/residencesApi';
import { useGetStreetsForCityQuery } from '../../../../../redux/services/data/streetsApi';
import {
  filterResidencesSearch,
  filterStreetsSearch,
  setSearchLoading,
} from '../../../../../redux/features/dashboard/dashboardSlice';
import {
  selectMockAdditional,
  selectMockMore,
  selectSearchInitialValues,
  selectSearchLoading,
} from '../../../../../redux/features/dashboard/dashboardSelectors';

import { LoaderProgress } from '../../../../ui/LoaderProgress';
import { InputsTemplate } from '../../../inputs/InputsTemplate';
import { ButtonTemplate } from '../../../../ui/buttons/ButtonTemplate';

export const SearchFormFilters = ({
  formProps = {},
  showAdditionalFilters = false,
  setMultiSelectRefs = () => {},
  setIsResetClicked = () => {},
  setStatesInputsFromTo = () => {},
  isResetClicked = false,
  setDatePickerRefs = () => {},
  handleSubmit = () => {},
  handleResetClick = () => {},
  removedCityId = null,
  setRemovedCityId = () => {},
  citiesId = [],
}) => {
  const inputsMore = useSelector(selectMockMore);
  const inputsAdditional = useSelector(selectMockAdditional);
  const searchLoading = useSelector(selectSearchLoading);
  const initialValues = useSelector(selectSearchInitialValues);

  const [updatedInputsMore, setUpdatedInputsMore] = useState([]);
  const [updatedInputsAdditional, setUpdatedInputsAdditional] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const [moreFiltersButtonText, setMoreFiltersButtonText] =
    useState('More filters');
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const [selectedCityId, setSelectedCityId] = useState(null);

  const dispatch = useDispatch();
  const userToken = useSelector(selectUserToken);
  const {
    data: streets,
    isFetching: isStreetsLoading,
    error: streetsError,
  } = useGetStreetsForCityQuery(
    { token: userToken, city_id: selectedCityId, isCityArray: true },
    {
      skip: !selectedCityId || !userToken,
      refetchOnMountOrArgChange: true,
    }
  );
  const {
    data: residences,
    isFetching: isResidencesLoading,
    error: residencesError,
  } = useGetResidencesForCityQuery(
    { token: userToken, city_id: selectedCityId, isCityArray: true },
    {
      skip: !selectedCityId || !userToken,
      refetchOnMountOrArgChange: true,
    }
  );

  const handleMoreClick = () => {
    setShowMoreFilters(!showMoreFilters);

    if (moreFiltersButtonText === 'More filters') {
      setMoreFiltersButtonText('Less filters');
    } else {
      setMoreFiltersButtonText('More filters');
    }
  };

  const filterDepedentSelects = async () => {
    const idToRemove = removedCityId;

    await new Promise(resolve => setTimeout(resolve, 1000));

    await dispatch(filterStreetsSearch(idToRemove));
    await dispatch(filterResidencesSearch(idToRemove));

    setRemovedCityId(null);
  };

  const handleSelectsData = async values => {
    await setSelectedCityId(null);

    const cityValues = values;

    if (cityValues?.length !== citiesId.length && removedCityId) {
      filterDepedentSelects();
    }

    if (cityValues && Array.isArray(cityValues) && cityValues?.length > 0) {
      cityValues.forEach(async city => {
        if (!citiesId.has(city)) {
          citiesId.add(city);

          await setSelectedCityId(city);
        }
      });
    } else {
      await dispatch(filterStreetsSearch([]));
      await dispatch(filterResidencesSearch([]));
    }
  };

  const handleDeleteCityId = async () => {
    const idToRemove = removedCityId;

    citiesId.delete(idToRemove);
  };

  useEffect(() => {
    handleSelectsData(formProps?.values?.['city']);
  }, [formProps?.values?.['city']]);

  useEffect(() => {
    const citiesValues = initialValues?.['city'];

    if (citiesValues && citiesValues.length > 0) {
      citiesValues.forEach(async (city, index) => {
        await new Promise(resolve => setTimeout(resolve, (index + 1) * 1000));
        // need to invoke all requests for cities to add all streets and recidences

        handleSelectsData([city]);
      });
    }
  }, [initialValues?.['city']]);

  useEffect(() => {
    if (removedCityId) {
      handleDeleteCityId();
    }
  }, [removedCityId]);

  useEffect(() => {
    setUpdatedInputsMore(inputsMore);

    dispatch(setSearchLoading(false));
  }, [inputsMore]);

  useEffect(() => {
    setUpdatedInputsAdditional(inputsAdditional);

    dispatch(setSearchLoading(false));
  }, [inputsAdditional]);

  useEffect(() => {
    setIsSearchLoading(searchLoading);
  }, [searchLoading]);

  return (
    <>
      {isSearchLoading && <LoaderProgress />}

      <div
        className={
          !isSearchLoading && showAdditionalFilters ? 'flex flex-col w-full gap-4' : 'hidden'
        }
      >
        <div className="grid grid-cols-1 gap-2 pt-3 w-full border-t-2 sm:grid-cols-2 md:grid-cols-4 md:gap-3.5">
          {updatedInputsAdditional && updatedInputsAdditional?.length > 0 && (
            <InputsTemplate
              formProps={formProps}
              inputsList={updatedInputsAdditional}
              setMultiSelectRefs={setMultiSelectRefs}
              isResetClicked={isResetClicked}
              setIsResetClicked={setIsResetClicked}
              setStatesInputsFromTo={setStatesInputsFromTo}
            />
          )}
        </div>

        <div
          className={cn(
            'grid-cols-1 gap-2 pt-3 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-3.5',
            { grid: showMoreFilters },
            { hidden: !showMoreFilters }
          )}
        >
          {updatedInputsMore && updatedInputsMore?.length > 0 && (
            <InputsTemplate
              formProps={formProps}
              inputsList={updatedInputsMore}
              setMultiSelectRefs={setMultiSelectRefs}
              isResetClicked={isResetClicked}
              setIsResetClicked={setIsResetClicked}
              setDatePickerRefs={setDatePickerRefs}
              setStatesInputsFromTo={setStatesInputsFromTo}
            />
          )}
        </div>

        <div className="flex gap-2 md:gap-3.5">
          <ButtonTemplate
            text={'Search'}
            bgColor={'bg-redColor border-redColor'}
            isTextHiddenMobile={true}
            handleClick={handleSubmit}
            isLoadingData={formProps.isSubmiting}
            icon={Search}
            isIconText={true}
            type="submit"
          />

          <ButtonTemplate
            text={moreFiltersButtonText}
            handleClick={handleMoreClick}
          />

          <ButtonTemplate
            text={'Reset filters'}
            handleClick={handleResetClick}
          />
        </div>
      </div>
    </>
  );
};
