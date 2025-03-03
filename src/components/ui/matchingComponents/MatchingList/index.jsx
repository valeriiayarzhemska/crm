import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../../redux/features/user/userSelectors';
import { useGetClientsQuery } from '../../../../redux/services/clients/clientsApi';

import { MatchingItem } from '../MatchingItem';
import { Loader } from '../../Loader';
import { PaginationComponent } from '../../pagination/PaginationComponent';

import { handlePageClick } from '../../../../utils/utils';

export const MatchingList = ({
  realtyId,
  page = null,
  setPage = () => {},
  searchQuery = '',
}) => {
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10);

  const userToken = useSelector(selectUserToken);
  const {
    data: clients = [],
    isLoading: isClientsLoading,
    error: clientsError,
  } = useGetClientsQuery(
    {
      token: userToken,
      isPagination: true,
      page,
      perPage: selectedItemsPerPage,
      searchQuery: searchQuery,
      activeSeachType: 2,
    },
  );

  const handleNextClick = () => {
    handlePageClick(clients?.links?.next, setPage);
  };

  const handlePrevClick = () => {
    handlePageClick(clients?.links?.prev, setPage);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {clients?.data && clients?.data.length > 0 && !isClientsLoading && (
        <>
          <div className="flex justify-end">
            <PaginationComponent
              links={clients?.links}
              meta={clients?.meta}
              handleNextClick={handleNextClick}
              handlePrevClick={handlePrevClick}
              selectedItemsPerPage={selectedItemsPerPage}
              setSelectedItemsPerPage={setSelectedItemsPerPage}
              setPage={setPage}
            />
          </div>

          <div className="flex gap-2 w-full">
            <div className="w-16">
              <span className="text-xs font-bold text-blackColor">ID</span>
            </div>

            <div>
              <span className="text-xs font-bold text-blackColor">NAME</span>
            </div>
          </div>

          {clients?.data.map((item, index) => {
            return (
              <MatchingItem
                key={item.id}
                realtyId={realtyId}
                item={item}
              />
            );
          })}
        </>
      )}

      {isClientsLoading && (
        <div className="flex justify-center pt-3 pb-1.5 px-1.5 w-full">
          <Loader
            width={26}
            height={26}
          />
        </div>
      )}

      {clients?.data &&
      clients?.data.length === 0 &&
      !isClientsLoading &&
      !clientsError && (
        <div className="flex justify-center pt-3 pb-1.5 px-1.5 w-full">
          <span className="text-sm font-medium text-blackColor">
            Nothing found
          </span>
        </div>
      )}

      {clientsError && (
        <div className="flex justify-center items-center pt-3 pb-1.5 px-1.5 w-full">
          <span className="text-sm font-medium text-blackColor">
            {clientsError.originalStatus} {clientsError.status}
          </span>
        </div>
      )}
    </div>
  );
};
