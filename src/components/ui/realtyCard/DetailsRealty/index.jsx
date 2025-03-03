import { useState } from 'react';

import { IconButtonTemplate } from '../../buttons/IconButtonTemplate';
import { ButtonTemplate } from '../../buttons/ButtonTemplate';
import { Dialog } from '../../Dialog';
import { AddRealtyForm } from '../../../form/forms/realtyForm/AddRealtyForm';

import {
  realtyButtonsTitles,
  realtyDetailsButtons,
} from '../../../../data/cardRealty';
import {
  mockAccordionTitles,
} from '../../../../data/constants';
import { generateDetailsInfo } from '../../../../utils/ui';

export const DetailsRealty = ({ realty }) => {
  const { main, location  } = realty;

  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const details = generateDetailsInfo([
    main?.property_name,
    location?.location_cadastre,
  ]);

  const handleOpenVideoClick = () => {
    setIsVideoOpen(!isVideoOpen);
  };

  const handleLinkClick = () => {
    const url = main?.external_link;
    const fullUrl = url?.startsWith('http') ? url : `https://${url}`;

    window.open(fullUrl, '_blank');
  };
  

  const buttonsHandlers = {
    [realtyButtonsTitles.openVideo]: handleOpenVideoClick,
    [realtyButtonsTitles.copyLink]: handleLinkClick,
  };

  return (
    <>
      <div className="flex gap-2 items-center flex-wrap">
        {details && details.length > 0 && (
          <div className="flex items-center flex-wrap">
            <span className="text-xs text-blackColor">{details}</span>
          </div>
        )}

        {realtyDetailsButtons.map(button => {
          return button.hasText ? (
            <ButtonTemplate
              key={button.id}
              handleClick={buttonsHandlers[button.title]}
              text={button.text}
              classes={button.classes}
              icon={button.icon}
              isSmall={true}
              isSmallBorder={true}
              tooltipText={button.tooltipText}
            />
          ) : (
            <IconButtonTemplate
              key={button.id}
              handleClick={buttonsHandlers[button.title]}
              icon={button.icon}
              classes={button.classes}
              isSmallBorder={true}
              size={16}
              tooltipText={button.tooltipText}
            />
          );
        })}
      </div>

      {isVideoOpen && (
        <Dialog
          content={
            <AddRealtyForm
              realty={realty}
              isEdit={true}
              accordionToOpen={mockAccordionTitles.Videos}
              handleClose={() => setIsVideoOpen(false)}
            />
          }
          classes={'w-full max-w-[768px]'}
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
        />
      )}
    </>
  );
};
