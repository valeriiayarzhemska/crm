import { useEffect, useState } from 'react';
import { Camera } from 'lucide-react';

import { useSelector } from 'react-redux';
import {
  selectSearchClientInfo,
  selectSearchRequestInfo,
} from '../../../../../redux/features/dashboard/dashboardSelectors';

import { Dialog } from '../../../../ui/Dialog';
import { AddClientForm } from '../../AddClientForm';
import { AddRequestForm } from '../../AddRequestForm';
import { ClientsInfoBlock } from '../../../search/clients/ClientsInfoBlock';
import { SearchFormRequestInfo } from '../SearchFormRequestInfo';

export const SearchFormClientInfo = () => {
  const [clientInfo, setClientInfo] = useState(null);
  const [requestInfo, setRequestInfo] = useState(null);

  const [isEditClientOpen, setIsEditClientOpen] = useState(false);
  const [isAddRequestOpen, setIsAddRequestOpen] = useState(false);

  const client = useSelector(selectSearchClientInfo);
  const request = useSelector(selectSearchRequestInfo);

  const handleEditClientClose = () => {
    setIsEditClientOpen(false);
  };

  const handleAddRequestClose = () => {
    setIsAddRequestOpen(false);
  };

  useEffect(() => {
    setClientInfo(client);
  }, [client]);

  useEffect(() => {
    setRequestInfo(request);
  }, [request]);

  return (
    <>
      {clientInfo && requestInfo && (
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex gap-3 p-2 h-max w-max bg-gray-100 rounded">
            <div className="flex justify-center items-center w-16 h-12 bg-whiteColor rounded">
              <Camera size={30} />
            </div>

            <ClientsInfoBlock
              email={clientInfo?.email}
              phone={clientInfo?.phone}
              id={clientInfo.id}
              firstName={clientInfo.first_name}
              lastName={clientInfo.last_name}
              clientType={clientInfo?.client_type?.title?.toLowerCase()}
              language={clientInfo?.locale?.title}
              isSearch={true}
              client={clientInfo}
            />
          </div>

          <SearchFormRequestInfo
            client={clientInfo}
            request={requestInfo}
          />
        </div>
      )}

      {isEditClientOpen && (
        <Dialog
          content={
            <AddClientForm
              isEdit={true}
              client={clientInfo}
              handleClose={handleEditClientClose}
            />
          }
          classes={'max-w-[290px] sm:max-w-[420px]'}
          isOpen={isEditClientOpen}
          onClose={handleEditClientClose}
        />
      )}

      {isAddRequestOpen && (
        <Dialog
          content={
            <AddRequestForm
              client={clientInfo}
              setShowAddRequestForm={setIsAddRequestOpen}
            />
          }
          classes={'w-full sm:max-w-[420px]'}
          isOpen={isAddRequestOpen}
          onClose={handleAddRequestClose}
        />
      )}
    </>
  );
};
