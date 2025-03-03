import { mockAccordionTitles } from '../../../data/constants';

export const textDescriptionValues = {
  description_title_ru: '',
  description_title_en: '',
  description_title_fr: '',
  description_text_ru: '',
  description_text_en: '',
  description_text_fr: '',
};

const mockTitle = mockAccordionTitles.TextDescription;

export const textDescriptionMock = [
  {
    title: mockTitle,
    id: 1,
    placeholder: 'Title Ru (max length 65)',
    fieldType: 'textarea',
    name: 'description_title_ru',
    classes: 'h-20',
    classNames: 'w-full',
  },
  {
    title: mockTitle,
    id: 2,
    placeholder: 'Title En (max length 65)',
    fieldType: 'textarea',
    name: 'description_title_en',
    classes: 'h-20',
    classNames: 'w-full',
  },
  {
    title: mockTitle,
    id: 3,
    placeholder: 'Title Fr (max length 65)',
    fieldType: 'textarea',
    name: 'description_title_fr',
    classes: 'h-20',
    classNames: 'w-full',
  },
  {
    title: mockTitle,
    id: 4,
    placeholder: 'Text Ru',
    fieldType: 'textarea',
    name: 'description_text_ru',
    classes: 'h-32',
    classNames: 'w-full',
  },
  {
    title: mockTitle,
    id: 5,
    placeholder: 'Text En',
    fieldType: 'textarea',
    name: 'description_text_en',
    classes: 'h-32',
    classNames: 'w-full',
  },
  {
    title: mockTitle,
    id: 5,
    placeholder: 'Text Fr',
    fieldType: 'textarea',
    name: 'description_text_fr',
    classes: 'h-32',
    classNames: 'w-full',
  },
];
