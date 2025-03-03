import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { Plus } from 'lucide-react';

import { useDispatch, useSelector } from 'react-redux';
import { selectClientsToggleList, selectSearchRequestId } from '../redux/features/dashboard/dashboardSelectors';
import { setClientsToggleList, setSearchRequestId } from '../redux/features/dashboard/dashboardSlice';

import { FormTemplate } from '../components/form/forms/FormTemplate';
import { ClientsList } from '../components/ui/ClientsList';
import { FloatingButton } from '../components/ui/buttons/FloatingButton';
import { Dialog } from '../components/ui/Dialog';
import { AddClientForm } from '../components/form/forms/AddClientForm';
import { Container } from '../layouts/Container';
import { ClientsSearchForm } from '../components/form/forms/ClientsSearchForm';

import {
  initialValues,
  mock,
  requestDealsTitles,
  requestDealsValues,
} from '../lib/mocks/clients-mock';
import { fieldTypes } from '../data/constants';
import { addHandlerForSearch } from '../utils/utils';

export const Clients = () => {
  const [inputs, setInputs] = useState([]);
  const [searchValues, setSearchValues] = useState({});
  const [showAddClientForm, setShowAddClientForm] = useState(false);

  const [activeSeachType, setActiveSeachType] = useState('');
  const [page, setPage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('');
  const [budgetTo, setBudgetTo] = useState('');
  const [urgencyType, setUrgencyType] = useState('');

  const dispatch = useDispatch();
  const searchRequest = useSelector(selectSearchRequestId);
  const toggleList = useSelector(selectClientsToggleList);

  const handleDebounceSearch = useCallback(
    debounce(value => {
      setSearchQuery(value);
    }, 1000),
    []
  );

  const handleSearch = value => {
    handleDebounceSearch(value);

    if (searchRequest) {
      dispatch(setSearchRequestId(null));
    }
  };

  const handleToggleClick = value => {
    setActiveSeachType(value);
    setPage(1);
  };

  const handlersForToggle = {
    [requestDealsTitles.All]: () => handleToggleClick(null),
    [requestDealsTitles.Requests]: () =>
      handleToggleClick(requestDealsValues.requests),
    [requestDealsTitles.Deals]: () =>
      handleToggleClick(requestDealsValues.deals),
  };

  const addHandleForToggles = data => {
    return data.map(item => {
      const handleClick = handlersForToggle[item.title] || (() => {});

      return { ...item, handleClick };
    });
  };

  const addCountersForToggles = async ({ counterRequest, counterDeals }) => {
    const newToggleList = toggleList.map(item => {
      if (item.title === requestDealsTitles.Requests) {
        return { ...item, counter: counterRequest };
      } else if (item.title === requestDealsTitles.Deals) {
        return { ...item, counter: counterDeals };
      } else {
        return item;
      }
    });

    await dispatch(setClientsToggleList(newToggleList));
  };

  const addHandlers = async () => {
    const newMock = await addHandlerForSearch(mock, handleSearch, searchRequest);
    const newToggleList = await addHandleForToggles(toggleList);

    setInputs(newMock);
    await dispatch(setClientsToggleList(newToggleList));
  };

  useEffect(() => {
    addHandlers();
  }, []);

  return (
    <Container>
      <div className="flex flex-col items-start gap-5 w-full h-full bg-white">
        <FormTemplate
          initialValues={initialValues}
          buttonText={'Save'}
          isWithoutButton={true}
          bgColor={'bg-purpleColor border-purpleColor'}
        >
          {formProps => (
            <ClientsSearchForm
              formProps={formProps}
              inputs={inputs}
              setSearchValues={setSearchValues}
              setStatus={setStatus}
              setBudgetTo={setBudgetTo}
              setUrgencyType={setUrgencyType}
            />
          )}
        </FormTemplate>

        <ClientsList
          page={page}
          setPage={setPage}
          activeSeachType={activeSeachType}
          searchQuery={searchQuery}
          status={status}
          budgetTo={budgetTo}
          urgencyType={urgencyType}
          addCountersForToggles={addCountersForToggles}
        />
      </div>

      <FloatingButton
        icon={Plus}
        handleClick={() => setShowAddClientForm(true)}
      />

      {showAddClientForm && (
        <Dialog
          content={
            <AddClientForm handleClose={() => setShowAddClientForm(false)} />
          }
          classes={'max-w-[290px] sm:max-w-[420px]'}
          isOpen={showAddClientForm}
          onClose={() => setShowAddClientForm(false)}
        />
      )}
    </Container>
  );
};
