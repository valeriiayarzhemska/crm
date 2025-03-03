import { useState } from 'react';

import cn from 'classnames';
import { Camera, Mail } from 'lucide-react';

import { ButtonTemplate } from '../../../../ui/buttons/ButtonTemplate';
import { SearchItemRequests } from '../../requests/SearchItemRequests';
import { Dialog } from '../../../../ui/Dialog';
import { AddClientForm } from '../../../forms/AddClientForm';
import { AddRequestForm } from '../../../forms/AddRequestForm';
import { ClientsInfoBlock } from '../ClientsInfoBlock';

import { colors } from '../../../../../data/constants';

export const SearchItemClients = ({
  item,
  isClientsPage = false,
  formProps = {},
  inputName = '',
  setIsOpen = () => {},
}) => {
  const [isEditClientOpen, setIsEditClientOpen] = useState(false);
  const [isAddRequestOpen, setIsAddRequestOpen] = useState(false);
  const [isCreatedClick, setIsCreatedClick] = useState(false);

  const {
    client_type,
    first_name,
    last_name,
    email,
    id,
    phone,
    locale,
    requests = [],
    agentsList = [],
  } = item;

  const clientType =
    client_type && client_type?.title ? client_type.title.toLowerCase() : '';

  const handleEditClientOpen = () => {
    setIsEditClientOpen(true);
  };

  const handleEditClientClose = () => {
    setIsEditClientOpen(false);
  };

  const handleAddRequestOpen = () => {
    setIsAddRequestOpen(true);
  };

  const handleAddRequestClose = () => {
    setIsAddRequestOpen(false);
  };

  const handleReminderClick = () => {};

  const handleCreatedClick = () => {
    setIsCreatedClick(!isCreatedClick);
  };

  return (
    <>
      <div
        className={cn(
          'relative flex flex-col gap-3 py-3.5 px-1 min-h-11md:py-4 md:px-2',
          { 'border-[1px] rounded shadow': isClientsPage },
          {
            'min-w-[302px] z-[4] sm:w-[600px] md:w-[620px] lg:w-[640px] exclude-click':
              !isClientsPage,
          }
        )}
      >
        <div className="flex flex-col justify-between w-full sm:flex-row">
          <div className="flex gap-1 md:gap-3">
            <div className="relative flex flex-col items-center justify-center h-10 w-12 md:h-12 md:w-16">
              {isClientsPage && (
                <div className="absolute top-[-14px] right-[-4px] z-[1]">
                  <span className="p-0.5 text-[10px] text-white font-medium capitalize bg-greenMintColor rounded">
                    {clientType}
                  </span>
                </div>
              )}

              <Camera
                size={26}
                color={colors.darkGrayColor}
              />

              {isClientsPage && (
                <div
                  onClick={handleCreatedClick}
                  className="absolute bottom-[-10px] z-[1]"
                >
                  <span className="text-[10px]">Created</span>

                  <Mail
                    size={14}
                    color={colors.redColor}
                    className="absolute top-[-4px] left-[-7px] md:top-2 md:left-auto md:right-[-16px]"
                  />
                </div>
              )}
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

          <div className="flex flex-row mt-2 items-center gap-2 min-w-28 sm:flex-col sm:items-end sm:mt-0 md:flex-row md:items-start">
            <ButtonTemplate
              handleClick={handleEditClientOpen}
              text="Edit"
              isSmallMobileText={true}
            />

            <ButtonTemplate
              handleClick={handleAddRequestOpen}
              text="Add Request"
              isSmallMobileText={true}
            />
          </div>
        </div>

        {/* {isClientsPage && isCreatedClick && (
          <div className="flex gap-3 w-fit">
            <ButtonTemplate
              handleClick={handleEditRequestClick}
              text={'Blocked'}
              tooltipText={'Enable/disable newsletter'}
            />

            <ButtonTemplate
              handleClick={handleEditRequestClick}
              text={'Subscribed'}
              tooltipText={
                'Unsubscribed status (normally changed by client itself)'
              }
            />

            <ButtonTemplate
              handleClick={handleEditRequestClick}
              text={'Verified'}
              tooltipText={
                'This email is not verified by user (click to change)'
              }
            />
          </div>
        )} */}

        {requests && requests.length > 0 && (
          <>
            {requests.map((request, index) => {
              return (
                <SearchItemRequests
                  key={index}
                  client={item}
                  request={request}
                  agentsList={agentsList}
                  isClientsPage={isClientsPage}
                  handleReminderClick={handleReminderClick}
                  formProps={formProps}
                  inputName={inputName}
                  setIsClientsOpen={setIsOpen}
                />
              );
            })}
          </>
        )}
      </div>

      {isEditClientOpen && (
        <Dialog
          content={
            <AddClientForm
              isEdit={true}
              client={item}
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
              client={item}
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
