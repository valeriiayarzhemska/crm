import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Filter, FilterX, Info, ListFilter } from 'lucide-react';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../redux/features/user/userSelectors';
import { useGetSearchRealtiesMapQuery } from '../redux/services/search/searchApi';

import Map from '../components/ui/mapComponent/Map';
import { ErrorMsg } from '../components/ui/ErrorMsg';
import { LoaderProgress } from '../components/ui/LoaderProgress';
import { IconButtonTemplate } from '../components/ui/buttons/IconButtonTemplate';
import { Dialog } from '../components/ui/Dialog';
import { FiltersMapForm } from '../components/form/forms/FiltersMapForm';
import { MapInfo } from '../components/ui/mapComponent/MapInfo';
import { RealtyList } from '../components/ui/RealtyList';

import { errorMessages } from '../data/constants';

export const MapPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isListingClick, setIsListingClick] = useState(false);
  const [isInfoClick, setIsInfoClick] = useState(false);
  const [isFiltersClick, setIsFiltersClick] = useState(false);
  const [isResetFilters, setIsResetFilters] = useState(false);
  const [isResetClicked, setIsResetClicked] = useState(false);
  const [searchQueryFilters, setSearchQueryFilters] = useState('');

  const userToken = useSelector(selectUserToken);
  const {
    data: realtiesMap = [],
    isFetching: isRealtiesMapFetching,
    error: realtiesMapError,
  } = useGetSearchRealtiesMapQuery(
    {
      token: userToken,
      search_filters: searchQueryFilters,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const handleResetFiltersClick = () => {
    setSearchQueryFilters('');
    setIsResetClicked(true);
    setIsResetFilters(false);
  };

  useEffect(() => {
    if (!isRealtiesMapFetching && realtiesMap) {
      setIsLoading(false);
    }
  }, [isRealtiesMapFetching]);

  return (
    <div className="relative flex pt-[54px] min-w-full w-screen h-screen">
      {isLoading && <LoaderProgress />}

      {realtiesMap && !isLoading && (
        <>
          <Map realties={realtiesMap} />

          <div className="absolute top-28 right-2 flex flex-col gap-2 opacity-80 z-[2]">
            <IconButtonTemplate
              bgColor="border-whiteColor bg-whiteColor"
              handleClick={() => setIsListingClick(true)}
              icon={ListFilter}
              size={20}
            />

            <IconButtonTemplate
              bgColor="border-whiteColor bg-whiteColor"
              handleClick={() => setIsInfoClick(true)}
              icon={Info}
              size={20}
            />
            <IconButtonTemplate
              bgColor="border-whiteColor bg-whiteColor"
              handleClick={() => setIsFiltersClick(true)}
              icon={Filter}
              size={20}
            />
            {isResetFilters && (
              <IconButtonTemplate
                bgColor="border-whiteColor bg-whiteColor"
                handleClick={handleResetFiltersClick}
                icon={FilterX}
                size={20}
              />
            )}
          </div>

          <div
            className={cn(
              'absolute flex-col justify-center p-2 h-full w-full bg-black bg-opacity-40 z-[2]',
              { flex: isFiltersClick },
              { hidden: !isFiltersClick }
            )}
          >
            <FiltersMapForm
              setSearchQueryFilters={setSearchQueryFilters}
              setIsResetFilters={setIsResetFilters}
              handleCancel={() => setIsFiltersClick(false)}
              isResetClicked={isResetClicked}
              setIsResetClicked={setIsResetClicked}
            />
          </div>
        </>
      )}

      {realtiesMapError && <ErrorMsg message={errorMessages.data} />}

      {isListingClick && (
        <Dialog
          content={
            <div className="max-w-[314px] xs:max-w-[376px] h-[600px] overflow-y-auto overflow-hidden hide-scroll">
              <RealtyList isPwa={true} />
            </div>
          }
          classes={'max-w-[314px] xs:max-w-[376px] h-[600px]'}
          isOpen={isListingClick}
          onClose={() => setIsListingClick(false)}
        />
      )}

      {isInfoClick && (
        <Dialog
          content={<MapInfo handleCancel={() => setIsInfoClick(false)} />}
          classes={'max-w-[540px] h-fit'}
          isOpen={isInfoClick}
          onClose={() => setIsInfoClick(false)}
        />
      )}
    </div>
  );
};
