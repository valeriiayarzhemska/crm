import { useState } from 'react';

import { Dialog } from '../../Dialog';

import { IconButtonTemplate } from '../../buttons/IconButtonTemplate';
import { ContactInfo } from '../ContactInfo';

import { colors } from '../../../../data/constants';
import {
  realtyButtonsTitles,
  realtyOwnersButtons,
} from '../../../../data/cardRealty';
import { handleWhatsUpClick } from '../../../../utils/utils';

export const OwnersItemRealty = ({
  contact = {},
  agent = {},
  userId,
  handleAddContactClick = () => {},
  setIsEditFormOpen = () => {},
  setContactId = () => {},
}) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const { id, first_name, last_name, role, source, phone, email } = contact;
  const isAgent = userId === agent?.id;
  const infoContact = `(${role?.title}${source?.title ? ` / ${source.title}` : ''})`;
  const infoContactTitle = isAgent
    ? `${first_name} ${last_name} ${infoContact}`
    : `*** ${infoContact}`;

  const handlePhoneEmailClick = () => {
    setIsInfoOpen(!isInfoOpen);
  };

  const handleOpenEditContact = async () => {
    if (isAgent) {
      await setIsEditFormOpen(true);
      await setContactId(id);

      handleAddContactClick();
    }
  };

  const buttonsHandlers = {
    [realtyButtonsTitles.phoneContact]: handlePhoneEmailClick,
    [realtyButtonsTitles.emailContact]: handlePhoneEmailClick,
    [realtyButtonsTitles.whatsUpContact]: handleWhatsUpClick,
  };

  /* const buttonsText = {
    [realtyButtonsTitles.infoContact]: infoContactTitle,
  }; */

  const buttonsActive = {
    [realtyButtonsTitles.phoneContact]:
      phone && phone.length > 0 ? colors.blueColor : colors.blackColor,
    [realtyButtonsTitles.emailContact]:
      email && email.length > 0 ? colors.blueColor : colors.blackColor,
  };

  return (
    <>
      <div className="flex gap-1.5 p-0.5 w-full">
        {realtyOwnersButtons.map(button => {
          return (
            <IconButtonTemplate
              key={button.id}
              handleClick={buttonsHandlers[button.title]}
              icon={button.icon}
              classes={button.classes}
              isSmallBorder={true}
              color={buttonsActive[button.title]}
              size={button.size ? button.size : 16}
              tooltipText={button.tooltipText}
              disabled={!isAgent}
            />
          );
        })}

        <div
          onClick={handleOpenEditContact}
          className="cursor-pointer"
        >
          <span className="block text-xs text-blackColor">
            {infoContactTitle}
          </span>
        </div>
      </div>

      {isInfoOpen && (
        <Dialog
          content={
            <ContactInfo
              contact={contact}
              handleWhatsUpClick={handleWhatsUpClick}
              handleClose={() => setIsInfoOpen(false)}
            />
          }
          isOpen={isInfoOpen}
          onClose={() => setIsInfoOpen(false)}
        />
      )}
    </>
  );
};
