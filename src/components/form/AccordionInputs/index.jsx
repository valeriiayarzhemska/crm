import { Fragment, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { InputsTemplate } from '../inputs/InputsTemplate';
import { MandateBlockForm } from '../forms/realtyForm/mandates/MandateBlockForm';
import { InputList } from '../inputs/InputList';

import { calculateNettoPrice } from '../../../utils/utils';
import { transformArrayToObject } from '../../../utils/data';
import { scrollToElement } from '../../../utils/ui';
import { ImageUpload } from '../inputs/ImageUpload';
import { VideoUpload } from '../inputs/VideoUpload';
import { ContactsBlockForm } from '../forms/realtyForm/ContactsBlockForm';
import cn from 'classnames';
import { PhotosBlockForm } from '../forms/realtyForm/PhotosBlockForm';
import { DocumentsBlock } from '../forms/realtyForm/DocumentsBlock';
import { TextDescriptionBlock } from '../forms/realtyForm/TextDescriptionBlock';
import {
  colors,
  disabledOnAdding,
  mockAccordionTitles,
} from '../../../data/constants';
import { mockAccordionTitlesResidence } from '../../../lib/mocks/add-residence-mock';

export const AccordionInputs = ({
  realtyId = '',
  isEdit = false,
  title,
  mock,
  formProps = { values: {}, setFieldValue: () => {} },
  contactsList = [],
  setMultiSelectRefs = () => {},
  setInputsRefs = () => {},
  accordionToOpen = '',
}) => {
  const [inputs, setInputs] = useState([]);
  const [isOpen, setIsOpen] = useState(
    accordionToOpen && accordionToOpen === title ? true : false
  );
  const isDisabledOnAdding = disabledOnAdding[title] && !isEdit;

  const isMandateTitle = title === mockAccordionTitles.Mandate;
  const isContactsTitle = title === mockAccordionTitles.Contacts;
  const isTariffTitle = title === mockAccordionTitles.Tariff;
  const isTextDescriptionTitle = title === mockAccordionTitles.TextDescription;
  const isDocumentsTitle = title === mockAccordionTitles.Documents;
  const isVideosTitle = title === mockAccordionTitles.Videos;
  const isPhotosTitle = title === mockAccordionTitles.Photos;
  const isPhotoTitle = title === mockAccordionTitlesResidence.Photo;

  const photoTitle = mockAccordionTitlesResidence.Photo ? 'image' : '';

  const handleTarifsPrice = () => {
    if (formProps && formProps?.values && isTariffTitle) {
      const price = formProps.values['tariff_price'];
      const comission = formProps.values['tariff_commission'];
      let nettoPrice = '';

      if (!price || !comission) {
        formProps.setFieldValue('tariff_netto_price', '');
      } else {
        nettoPrice = calculateNettoPrice(price, comission);
        formProps.setFieldValue('tariff_netto_price', nettoPrice);
      }
    }
  };

  const updateMock = async () => {
    const filteredInputs = await mock.filter(input => {
      return input.title === title;
    });

    if (
      isMandateTitle ||
      isVideosTitle ||
      isContactsTitle ||
      isDocumentsTitle ||
      isTextDescriptionTitle
    ) {
      setInputs(filteredInputs);
    } else {
      const updatedMock = await transformArrayToObject(filteredInputs);

      setInputs(updatedMock);
    }
  };

  const handleClick = () => {
    if (!isDisabledOnAdding) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    if (
      formProps?.values &&
      Object.prototype.hasOwnProperty.call(
        formProps?.values,
        'tariff_commission'
      ) &&
      Object.prototype.hasOwnProperty.call(formProps?.values, 'tariff_price')
    ) {
      handleTarifsPrice();
    }
  }, [
    formProps?.values?.['tariff_commission'],
    formProps?.values?.['tariff_price'],
  ]);

  useEffect(() => {
    if (accordionToOpen && accordionToOpen === title && isOpen) {
      scrollToElement(title);
    }
  }, [inputs]);

  useEffect(() => {
    updateMock();
  }, []);

  return (
    <div className={`w-full border-[1px] border-lightGrayColor ${title}`}>
      <div
        className="flex justify-between py-2 px-1 w-full bg-lightGrayColor cursor-pointer md:px-4"
        onClick={handleClick}
      >
        <span
          className={cn(
            'text-sm md:text-ml',
            { 'text-gray-300': isDisabledOnAdding },
            { 'text-blackColor': !isDisabledOnAdding }
          )}
        >
          {title}
        </span>

        {isOpen ? (
          <ChevronUp
            color={
              isDisabledOnAdding ? colors.lightGrayColor : colors.blackColor
            }
            size={16}
          />
        ) : (
          <ChevronDown
            color={
              isDisabledOnAdding ? colors.lightGrayColor : colors.blackColor
            }
            size={16}
          />
        )}
      </div>

      {isMandateTitle && (
        <div
          className={cn(
            'flex-col items-start gap-4 py-4 px-1.5 md:py-8 md:px-6',
            { flex: isOpen },
            { hidden: !isOpen }
          )}
        >
          <MandateBlockForm
            realtyId={realtyId}
            formProps={formProps}
            inputsList={inputs}
          />
        </div>
      )}

      {isContactsTitle && (
        <div
          className={cn(
            'flex-col items-start gap-4 py-4 px-1.5 md:py-8 md:px-6',
            { flex: isOpen },
            { hidden: !isOpen }
          )}
        >
          <ContactsBlockForm
            contactsList={contactsList}
            formProps={formProps}
            inputsList={inputs}
          />
        </div>
      )}

      {isTextDescriptionTitle && (
        <div
          className={cn(
            'flex-col items-start gap-4 py-4 px-1.5 md:py-8 md:px-6',
            { flex: isOpen },
            { hidden: !isOpen }
          )}
        >
          <TextDescriptionBlock
            formProps={formProps}
            inputsList={inputs}
          />
        </div>
      )}

      {isPhotoTitle && (
        <div
          className={cn(
            'flex-col items-start gap-4 py-4 px-1.5 md:py-8 md:px-6',
            { flex: isOpen },
            { hidden: !isOpen }
          )}
        >
          <ImageUpload
            formProps={formProps}
            name={photoTitle}
            classes={'w-6/12 h-24'}
          />
        </div>
      )}

      {isPhotosTitle && (
        <div
          className={cn(
            'flex-col items-start gap-4 py-4 px-1.5 md:py-8 md:px-6',
            { flex: isOpen },
            { hidden: !isOpen }
          )}
        >
          <PhotosBlockForm
            realtyId={realtyId}
            formProps={formProps}
          />
        </div>
      )}

      {isVideosTitle && (
        <div
          className={cn(
            'flex-col items-start gap-4 py-4 px-1.5 md:py-8 md:px-6',
            { flex: isOpen },
            { hidden: !isOpen }
          )}
        >
          <VideoUpload
            realtyId={realtyId}
            formProps={formProps}
            inputsList={inputs}
          />
        </div>
      )}

      {isDocumentsTitle && (
        <div
          className={cn(
            'flex-col items-start gap-4 py-4 px-1.5 md:py-8 md:px-6',
            { flex: isOpen },
            { hidden: !isOpen }
          )}
        >
          <DocumentsBlock
            realtyId={realtyId}
            formProps={formProps}
            inputsList={inputs}
          />
        </div>
      )}

      {!isMandateTitle &&
      !isContactsTitle &&
      !isPhotoTitle &&
      !isPhotosTitle &&
      !isVideosTitle &&
      !isDocumentsTitle &&
      !isTextDescriptionTitle && (
        <div
          className={cn(
            'flex-col items-start gap-4 py-4 px-1.5 md:py-8 md:px-6',
            { flex: isOpen },
            { hidden: !isOpen }
          )}
        >
          {Object.keys(inputs).map((property, index) => {
            return (
              <Fragment key={index}>
                {property.includes('inputs') && (
                  <InputsTemplate
                    formProps={formProps}
                    inputsList={inputs[property]}
                    setMultiSelectRefs={setMultiSelectRefs}
                    setInputsRefs={setInputsRefs}
                  />
                )}

                {property.includes('listId') && (
                  <InputList
                    formProps={formProps}
                    inputs={inputs[property]}
                  />
                )}
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};
