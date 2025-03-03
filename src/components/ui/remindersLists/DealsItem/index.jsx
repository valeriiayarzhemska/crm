import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';

import { useDispatch, useSelector } from 'react-redux';
import { selectUserToken } from '../../../../redux/features/user/userSelectors';
import {
  useGetRequestQuery,
  useUpdateRequestMutation,
} from '../../../../redux/services/requests/requestsApi';
import {
  setSearchClientInfo,
  setSearchLoading,
  setSearchRequestId,
  setSearchRequestInfo,
  showSearch,
} from '../../../../redux/features/dashboard/dashboardSlice';
import { useGetClientQuery } from '../../../../redux/services/clients/clientsApi';

import { ItemHeader } from '../ItemHeader';
import { ItemFooter } from '../ItemFooter';
import { ClientsInfoBlock } from '../../../form/search/clients/ClientsInfoBlock';
import { RequestBadges } from '../../../form/search/requests/RequestBadges';
import { RequestNote } from '../../../form/search/requests/RequestNote';

import { colors, errorMessages } from '../../../../data/constants';
import { showError } from '../../../../utils/ui';
import { getDefaultValuesForEditing } from '../../../../utils/data';

export const DealsItem = ({ reminder = {}, setIsLoading = () => {} }) => {
  const {
    id,
    client = {},
    client_request = {},
    agent,
    subject,
    created,
  } = reminder;
  const { client_type, email, phone, locale, first_name, last_name } = client;
  const {
    id: requestId,
    urgency_type,
    status,
    created_at,
    comment,
    note,
    agent_name,
    budget_from,
    budget_to,
    realty_id,
  } = client_request;
  const budgetFrom = `${budget_from ? `${budget_from} €` : ''}`;
  const budgetTo = `${budget_to ? `${budget_to} €` : ''}`;

  const [searchClientId, setSearchClientId] = useState(null);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [selectedRequestValues, setSelectedRequestValues] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = useSelector(selectUserToken);
  const {
    data: clientData = {},
    isFetching: isClientDataLoading,
    error: clientDataError,
  } = useGetClientQuery(
    { token: userToken, id: searchClientId },
    { skip: !searchClientId, refetchOnMountOrArgChange: true }
  );
  const {
    data: clientRequest = {},
    isLoading: isClientsRequestLoading,
    error: clientsRequestError,
  } = useGetRequestQuery(
    {
      token: userToken,
      id: selectedRequestId,
    },
    { skip: !selectedRequestId, refetchOnMountOrArgChange: true }
  );
  const [editRequest, { isLoading: isEditingLoading, error: editingError }] =
    useUpdateRequestMutation();

  const handleSubmitEditing = async () => {
    const newRequest = await getDefaultValuesForEditing(clientRequest);

    const response = await editRequest({
      token: userToken,
      id: requestId,
      data: { ...newRequest, ...selectedRequestValues },
    });

    const errors = editingError || response?.error;

    showError(errors, errorMessages.wentWrong);
    setSelectedRequestId(null);
  };

  const handleEditRequest = values => {
    setSelectedRequestId(requestId);
    setSelectedRequestValues(values);
  };

  const handleRequestIdClick = async () => {
    await dispatch(setSearchRequestId(requestId));
  };

  const handleMatchingClick = async () => {
    setIsLoading(true);
    setSearchClientId(client?.id);
    setSelectedRequestId(requestId);
  };

  const setClientsValues = async () => {
    await navigate('/');
    await dispatch(setSearchClientInfo(clientData));
    await dispatch(setSearchRequestInfo(clientRequest));
  };

  const handleRealtyIdClick = async () => {
    await navigate('/');

    await dispatch(setSearchLoading(true));

    await dispatch(
      showSearch({
        isSearchVisible: true,
        searchQuery: realty_id,
        searchFilters: '',
        searchPage: null,
      })
    );

    await dispatch(setSearchLoading(false));
  };

  useEffect(() => {
    if (selectedRequestId && clientRequest && !isClientsRequestLoading) {
      handleSubmitEditing();
    }
  }, [selectedRequestId, isClientsRequestLoading, clientRequest]);

  useEffect(() => {
    if (
      clientData &&
      !isClientDataLoading &&
      clientRequest &&
      !isClientsRequestLoading &&
      searchClientId &&
      selectedRequestId
    ) {
      setClientsValues();
    }
  }, [clientData, isClientDataLoading]);

  return (
    <div className="flex flex-col gap-2 p-2 w-full bg-gray-100 rounded">
      <ItemHeader reminder={reminder} />

      {client && client_request && (
        <>
          <div className="flex gap-2 w-full">
            <div className="flex justify-center items-center p-1 w-10 h-10 bg-whiteColor rounded">
              <Camera
                size={26}
                color={colors.darkGrayColor}
              />
            </div>

            <ClientsInfoBlock
              email={email}
              phone={phone}
              id={id}
              firstName={first_name}
              lastName={last_name}
              clientType={client_type?.title?.toLowerCase()}
              language={locale?.title}
            />
          </div>

          <div className="flex gap-2 w-full">
            <div className="flex flex-col">
              <span className="block text-[10px] text-blackColor">
                {created_at}
              </span>

              <div onClick={handleRequestIdClick}>
                <Link
                  to="/clients"
                  rel="noopener noreferrer"
                >
                  <span className="text-xs text-darkBlueColor underline cursor-pointer">
                    {requestId}
                  </span>
                </Link>
              </div>

              <div onClick={handleMatchingClick}>
                <span className="text-xs text-darkBlueColor underline cursor-pointer">
                  Matching
                </span>
              </div>
            </div>

            <RequestBadges
              agent_name={agent_name}
              status={status}
              urgency_type={urgency_type}
              handleSubmitEditing={handleEditRequest}
            />
          </div>

          <div className="flex gap-2 items-center w-full">
            <span className="block text-[10px] text-blackColor">
              {budgetFrom && budgetTo
                ? `${budgetFrom} - ${budgetTo}`
                : budgetFrom || budgetTo}
            </span>

            {realty_id && (
              <div className="cursor-pointer" onClick={handleRealtyIdClick}>
                <span className="text-xs text-darkBlueColor underline">
                  {realty_id}
                </span>
              </div>
            )}
          </div>

          <div className="relative w-full">
            <RequestNote
              handleSubmitEditing={handleSubmitEditing}
              agent_name={agent_name}
              formatedDate={created_at}
              comment={comment}
              note={note}
            />
          </div>
        </>
      )}

      <ItemFooter
        agent={agent.name}
        subject={subject}
        created={created}
      />
    </div>
  );
};
