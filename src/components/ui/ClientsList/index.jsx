import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../redux/features/user/userSelectors';
import { useGetClientsQuery } from '../../../redux/services/clients/clientsApi';

import { Loader } from '../../ui/Loader';
import { SearchItemClients } from '../../form/search/clients/SearchItemClients';
import { PaginationComponent } from '../pagination/PaginationComponent';
import { handlePageClick } from '../../../utils/utils';

export const ClientsList = ({
  page = null,
  setPage = () => {},
  activeSeachType = '',
  searchQuery = '',
  status = '',
  budgetTo = '',
  urgencyType = '',
  addCountersForToggles = () => {},
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
      activeSeachType,
      searchQuery,
      status,
      budgetTo,
      urgencyType,
    },
    { refetchOnMountOrArgChange: true }
  );

  const handleNextClick = () => {
    handlePageClick(clients?.links?.next, setPage);
  };

  const handlePrevClick = () => {
    handlePageClick(clients?.links?.prev, setPage);
  };

  const addCounters = () => {
    const requests = clients?.meta?.request_request_type_count;
    const deals = clients?.meta?.request_deal_type_count;

    addCountersForToggles({
      counterRequest: requests,
      counterDeals: deals,
    });
  };

  useEffect(() => {
    addCounters();
  }, [
    clients?.meta?.request_deal_type_count,
    clients?.meta?.request_request_type_count,
  ]);

  useEffect(() => {
    addCounters();
  }, []);

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

          {clients?.data.map((item, index) => {
            return (
              <SearchItemClients
                key={item.id}
                item={item}
                isClientsPage={true}
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
