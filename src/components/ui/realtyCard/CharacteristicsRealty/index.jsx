import { useState } from 'react';

import { Dialog } from '../../Dialog';
import { AddRealtyForm } from '../../../form/forms/realtyForm/AddRealtyForm';

import { generateCharacteristics } from '../../../../utils/ui';
import { mockAccordionTitles } from '../../../../data/constants';

export const CharacteristicsRealty = ({ realty = {} }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [accordionTitle, setAccordionTitle] = useState('');

  const {
    bathrooms,
    bedrooms,
    floor,
    living_area,
    realty_type,
    land_area,
    terrace,
    parking_garage_space,
    parking_parking_space,
    parking_storage_space,
  } = realty.main;
  const descriptionTitle = realty?.text_description?.description_title_en;

  const details = generateCharacteristics({
    realty_type,
    living_area,
    terrace,
    land_area,
    bedrooms,
    bathrooms,
    parking_garage_space,
    parking_parking_space,
    parking_storage_space,
    floor,
  });

  const handleMainOpen = () => {
    setAccordionTitle(mockAccordionTitles.Main);
    setIsFormOpen(true);
  };

  const handleTextOpen = () => {
    setAccordionTitle(mockAccordionTitles.TextDescription);
    setIsFormOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-0.5 flex-wrap">
        {details && details.length > 0 && (
          <div
            onClick={handleMainOpen}
            className="flex items-center flex-wrap p-0.5 rounded hover:bg-gray-100 cursor-pointer"
          >
            <span className="text-sm font-bold text-gray-700">{details}</span>
          </div>
        )}

        <div
          onClick={handleTextOpen}
          className="flex items-center flex-wrap cursor-pointer"
        >
          <span className="text-xs text-blackColor">
            {descriptionTitle && descriptionTitle?.length > 0
              ? descriptionTitle
              : 'No title'}
          </span>
        </div>
      </div>

      {isFormOpen && (
        <Dialog
          content={
            <AddRealtyForm
              isEdit={true}
              realty={realty}
              accordionToOpen={accordionTitle}
              handleClose={() => setIsFormOpen(false)}
            />
          }
          classes={'w-full max-w-[768px]'}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </>
  );
};
