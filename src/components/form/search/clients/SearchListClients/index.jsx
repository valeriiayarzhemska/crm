import { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import { selectUserToken } from '../../../../../redux/features/user/userSelectors';
import { useGetClientsQuery } from '../../../../../redux/services/clients/clientsApi';

import { SearchItemClients } from '../SearchItemClients';
import { ToggleGroupTemplate } from '../../../inputs/ToggleGroupTemplate';
import { Loader } from '../../../../ui/Loader';

export const SearchListClients = ({
  setIsOpen,
  setClosedManuallySearch = () => {},
  formProps = {},
  inputName = '',
  handleEmptyList = () => {},
}) => {
  const [page, setPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const userToken = useSelector(selectUserToken);
  const {
    data: clients = {},
    isLoading: isClientsLoading,
    isFetching: isClientsFetching,
    error: clientsError,
  } = useGetClientsQuery(
    {
      token: userToken,
      activeSeachType: inputName === 'find_deal' ? 2 : '',
      page,
      isPagination: true,
    },
    { refetchOnMountOrArgChange: true }
  );
  const [clientsWithRequests, setClientsWithRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(isClientsLoading);
  const [error, setError] = useState('');
  const listRef = useRef(null);

  const loadClientsWithRequests = async isPageChanged => {
    if (!isPageChanged) {
      setClientsWithRequests([]);
    }

    const newClients = clients?.data;

    if (newClients && newClients.length > 0) {
      setError('');

      setClientsWithRequests(prevClients => {
        if (!isPageChanged) {
          return newClients;
        } else {
          setCurrentPage(prevPage => prevPage + 1);

          return [...prevClients, ...newClients];
        }
      });
    } else if (clientsError) {
      setError(clientsError.originalStatus, clientsError.status);
    }

    setIsLoading(isClientsLoading);
  };

  const onScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;

      if (scrollTop + clientHeight === scrollHeight) {
        if (clients?.links?.next) {
          setPage(Number(clients.links.next.slice(-1)));

          return;
        }
      }
    }
  };

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
        setClientsWithRequests([]);
        setPage(null);
        setCurrentPage(1);

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

  useEffect(() => {
    if (!isClientsFetching && page && page > currentPage) {
      loadClientsWithRequests(true);
    }
  }, [page, isClientsFetching]);

  useEffect(() => {
    if (!isClientsLoading) {
      loadClientsWithRequests();
    }
  }, [isClientsLoading]);

  useEffect(() => {
    handleEmptyList(clientsWithRequests);
  }, [formProps?.values?.[inputName]?.length]);

  return (
    <div
      ref={listRef}
      onScroll={onScroll}
      className="absolute top-[42px] left-[-40px] pb-2 w-fit max-h-[500px] border-[1px] b-gray-200 bg-white shadow-md z-[4] overflow-y-auto hide-scroll sm:left-0 md:left-[-80px] lg:left-0"
    >
      {clientsWithRequests && clientsWithRequests.length > 0 && !isLoading && (
        <>
          {/* <div className="flex py-3 px-1 gap-2 border-b-[1px] border-gray-200 md:py-4 md:px-2">
            <ToggleGroupTemplate toggleList={searchItemClientsButtons} />
          </div> */}

          {clientsWithRequests.map((item, index) => {
            return (
              <SearchItemClients
                key={item.id}
                item={item}
                formProps={formProps}
                inputName={inputName}
                setIsOpen={setIsOpen}
              />
            );
          })}
        </>
      )}

      {isLoading && (
        <div className="flex justify-center pt-3 pb-1.5 px-1.5 w-full sm:w-[348px]">
          <Loader
            width={26}
            height={26}
          />
        </div>
      )}

      {clientsWithRequests &&
      clientsWithRequests.length === 0 &&
      !isLoading &&
      !error && (
        <div className="flex justify-center pt-3 pb-1.5 px-1.5 w-full sm:w-[348px]">
          <span className="text-sm font-medium text-blackColor">
            Nothing found
          </span>
        </div>
      )}

      {error && error.length > 0 && (
        <div className="flex justify-center pt-3 pb-1.5 px-1.5 w-full sm:w-[348px]">
          <span className="text-sm font-medium text-blackColor">{error}</span>
        </div>
      )}
    </div>
  );
};
