import { useState } from 'react';
import { IconButtonTemplate } from '../../buttons/IconButtonTemplate';

import {
  realtySquareButtons,
  realtySquareButtonsType,
} from '../../../../data/cardRealty';
import { Dialog } from '../../Dialog';
import { AddReminderForm } from '../../../form/forms/AddReminderForm';

export const SquareButtons = ({ realtyId, externalLink = '' }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  let ButtonDropdown = null;

  const handleReminderClick = () => {
    setIsReminderOpen(true);
  };

  const handleLinkClick = () => {
    window.open(externalLink);
  };

  const handleDownloadClick = button => {
    setIsDropdownOpen(true);
    event.stopPropagation();
  };

  const buttonsHandlers = {
    [realtySquareButtonsType.reminder]: handleReminderClick,
    [realtySquareButtonsType.link]: handleLinkClick,
    [realtySquareButtonsType.download]: handleDownloadClick,
  };

  return (
    <>
      <div className="relative">
        <div className="absolute grid gap-1 left-1.5 bottom-1.5 opacity-80 z-[1]">
          {realtySquareButtons.map(button => {
            const {
              id,
              value,
              color,
              type,
              icon,
              tooltipText,
              counter,
              classes,
              dropdown,
            } = button;
            const handleClick = buttonsHandlers[type];

            if (type === realtySquareButtonsType.download) {
              ButtonDropdown = dropdown;
            }

            return (
              <IconButtonTemplate
                key={id}
                text={value}
                bgColor={color}
                handleClick={() => handleClick(button)}
                icon={icon}
                size={20}
                tooltipText={tooltipText}
                counter={counter}
                classes={classes}
              />
            );
          })}
        </div>

        {isDropdownOpen && (
          <ButtonDropdown
            realtyId={realtyId}
            setIsOpen={setIsDropdownOpen}
          />
        )}
      </div>

      {isReminderOpen && (
        <Dialog
          content={
            <AddReminderForm
              realtyId={realtyId}
              setIsAddOpen={setIsReminderOpen}
            />
          }
          isOpen={isReminderOpen}
          onClose={() => setIsReminderOpen(false)}
          classes="max-w-[290px] sm:max-w-[420px]"
        />
      )}
    </>
  );
};
