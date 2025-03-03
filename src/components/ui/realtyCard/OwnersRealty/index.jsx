import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import cn from 'classnames';

import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../../../redux/features/user/userSelectors';

import { Dialog } from '../../Dialog';
import { OwnersItemRealty } from '../OwnersItemRealty';
import { AddContactForm } from '../../../form/forms/realtyForm/AddContactForm';
import { ButtonTemplate } from '../../buttons/ButtonTemplate';
import { AddRealtyForm } from '../../../form/forms/realtyForm/AddRealtyForm';

import { mockAccordionTitles } from '../../../../data/constants';

export const OwnersRealty = ({ realty = false, contacts = [], agent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [contactId, setContactId] = useState(null);

  const user = useSelector(selectUserInfo);

  const handleAddContactClick = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleEditContactClick = () => {
    setIsEditFormOpen(!isEditFormOpen);
  };

  return (
    <>
      <div className="relative flex flex-col items-start gap-0.5 flex-wrap w-full">
        {contacts && contacts.length > 0 && (
          <div className="flex items-center flex-wrap gap-1.5 p-0.5">
            {contacts.map(contact => {
              return (
                <OwnersItemRealty
                  key={contact?.id}
                  userId={user?.id}
                  agent={agent}
                  contact={contact}
                  handleAddContactClick={handleEditContactClick}
                  setIsEditFormOpen={setIsEditFormOpen}
                  setContactId={setContactId}
                />
              );
            })}
          </div>
        )}

        {contacts.length > 1 && (
          <div
            className={cn(
              'w-full bottom-0 left-0 z-[3]',
              { absolute: !isOpen },
              { static: isOpen }
            )}
          >
            <div
              className={cn(
                'w-full h-6 bg-gradient-to-t from-white to-transparent',
                { hidden: isOpen }
              )}
            ></div>
            <div
              className={cn(
                'flex items-center justify-center w-full cursor-pointer z-[3]',
                { 'h-4 bg-whiteColor': !isOpen },
                { 'bg-transparent': isOpen }
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>
        )}
      </div>

      {realty && (
        <ButtonTemplate
          handleClick={handleAddContactClick}
          text={'Add contact'}
          classes={'border-[1px] border-gray-200'}
          isSmall={true}
          isSmallBorder={true}
        />
      )}

      {isFormOpen && (
        <Dialog
          content={
            <AddRealtyForm
              isEdit={true}
              realty={realty}
              accordionToOpen={mockAccordionTitles.Contacts}
              handleClose={() => setIsFormOpen(false)}
            />
          }
          classes={'w-full max-w-[768px]'}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {isEditFormOpen && (
        <Dialog
          content={
            <AddContactForm
              contactId={contactId}
              isEdit={isEditFormOpen}
              handleClose={() => setIsEditFormOpen(false)}
            />
          }
          isOpen={isEditFormOpen}
          onClose={() => setIsEditFormOpen(false)}
        />
      )}
    </>
  );
};
