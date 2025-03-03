import { MoveDown } from 'lucide-react';
import {
  realtyButtonsTitles,
  realtyInfoButtons,
} from '../../../../data/cardRealty';
import { ButtonTemplate } from '../../buttons/ButtonTemplate';
import { IconButtonTemplate } from '../../buttons/IconButtonTemplate';
import {
  colors,
  mockAccordionTitles,
  successMessages,
} from '../../../../data/constants';
import { handleCopy } from '../../../../utils/utils';
import { apiUrl } from '../../../../redux/services/api';
import { links } from '../../../../data/links';
import { Dialog } from '../../Dialog';
import { AddAssignee } from '../../../form/forms/realtyForm/AddAssignee';
import { AddRealtyForm } from '../../../form/forms/realtyForm/AddRealtyForm';
import { useState } from 'react';
import { AddOwnerComment } from '../../../form/forms/realtyCardForms/AddOwnerComment';

export const InfoButtons = ({ realty = {} }) => {
  const [isEditOwnerOpen, setIsEditOwnerOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isEditPriceOpen, setIsEditPriceOpen] = useState(false);

  const { tariff, id } = realty;
  const { tariff_is_drop, tariff_price, tariff_price_per_meter } = tariff;

  const buttonsText = {
    [realtyButtonsTitles.copy]: `${id}`,
    [realtyButtonsTitles.editPrice]: tariff_price ? `${tariff_price} €, (${tariff_price_per_meter} € / m2)` : '',
  };

  const handleInfoClick = () => {
    setIsEditOwnerOpen(!isEditOwnerOpen);
  };

  const handleEditClick = () => {
    setIsEditOpen(!isEditOpen);
  };

  const handleCopyClick = () => {
    handleCopy(
      `${apiUrl}${links.realties}?search_query=${id}`,
      successMessages.copyLink
    );
  };

  const handleEditPriceClick = () => {
    setIsEditPriceOpen(!isEditPriceOpen);
  };

  const buttonsHandlers = {
    [realtyButtonsTitles.info]: handleInfoClick,
    [realtyButtonsTitles.edit]: handleEditClick,
    [realtyButtonsTitles.copy]: handleCopyClick,
    [realtyButtonsTitles.editPrice]: handleEditPriceClick,
  };

  return (
    <>
      <div className="flex gap-1.5 w-full">
        {realtyInfoButtons.map(button => {
          const isEditPrice = button.title === realtyButtonsTitles.editPrice;

          return button.hasText && buttonsText[button.title] ? (
            <ButtonTemplate
              key={button.id}
              handleClick={buttonsHandlers[button.title]}
              text={buttonsText[button.title]}
              classes={button.classes}
              isSmallText={true}
              isIconText={
                (isEditPrice && tariff_is_drop) || button?.isIconText
                  ? true
                  : false
              }
              icon={
                (isEditPrice && tariff_is_drop) || (!isEditPrice && button.icon)
                  ? button.icon
                  : null
              }
              isSmall={true}
              isSmallBorder={true}
              color={
                isEditPrice && tariff_is_drop
                  ? colors.redColor
                  : colors.blackColor
              }
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

      {isEditOwnerOpen && (
        <Dialog
          content={
            <AddOwnerComment handleClose={() => setIsEditOwnerOpen(false)} />
          }
          isOpen={isEditOwnerOpen}
          onClose={() => setIsEditOwnerOpen(false)}
        />
      )}

      {isEditOpen && (
        <Dialog
          content={
            <AddRealtyForm
              realty={realty}
              isEdit={true}
              handleClose={() => setIsEditOpen(false)}
            />
          }
          classes={'w-full max-w-[768px]'}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
      )}

      {isEditPriceOpen && (
        <Dialog
          content={
            <AddRealtyForm
              realty={realty}
              isEdit={true}
              accordionToOpen={mockAccordionTitles.Tariff}
              handleClose={() => setIsEditPriceOpen(false)}
            />
          }
          classes={'w-full max-w-[768px]'}
          isOpen={isEditPriceOpen}
          onClose={() => setIsEditPriceOpen(false)}
        />
      )}
    </>
  );
};
