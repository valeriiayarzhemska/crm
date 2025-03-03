import { urgencySelectData } from '../../data/cardRealty';
import { textareaClientDefaultValue } from '../../data/clientData';
import { citiesSelectData } from '../../data/constants';
import {
  citiesData,
  citiesDataLoading,
} from '../../redux/features/dashboard/dashboardSelectors';
import { validationSchema } from '../validationSchema';
import { statusSelectData } from './clients-mock';

export const requestValues = {
  request_type: 'request_type',
  assistants: 'assistants',
  urgency_type: 'urgency_type',
  status: 'status',
  source: 'source',
  visit: 'visit',
  purpose: 'purpose',
  realty_types: 'realty_types',
  country_id: 'country_id',
  cities: 'cities',
  bedroom_to: 'bedroom_to',
  bedroom_from: 'bedroom_from',
  budget_to: 'budget_to',
  budget_from: 'budget_from',
  living_area_to: 'living_area_to',
  living_area_from: 'living_area_from',
  land_to: 'land_to',
  land_from: 'land_from',
  comment: 'comment',
  note: 'note',
  documents: 'documents',
};

export const initialValues = {
  [requestValues.request_type]: '0',
  [requestValues.assistants]: '',
  [requestValues.urgency_type]: '',
  [requestValues.status]: 1,
  [requestValues.source]: '',
  [requestValues.visit]: '',
  [requestValues.purpose]: '',
  [requestValues.realty_types]: '',
  [requestValues.country_id]: '',
  [requestValues.cities]: '',
  [requestValues.bedroom_to]: '',
  [requestValues.bedroom_from]: '',
  [requestValues.budget_to]: '',
  [requestValues.budget_from]: '',
  [requestValues.living_area_to]: '',
  [requestValues.living_area_from]: '',
  [requestValues.land_to]: '',
  [requestValues.land_from]: '',
  [requestValues.comment]: '',
  [requestValues.note]: '',
  [requestValues.documents]: '',
};

export const validationSchemaRequest = {
  urgency_type: validationSchema.default,
  country_id: validationSchema.default,
};

export const requestDealToggleData = [
  {
    id: 1,
    value: '0',
    title: 'Request',
    color: 'border-orangeColor bg-orangeColor text-whiteColor',
  },
  {
    id: 2,
    value: 1,
    title: 'Deal',
    color: 'border-greenColor bg-greenColor text-whiteColor',
  },
];

export const houseTypeData = [
  { id: 1, value: '0', title: 'Apartment' },
  { id: 2, value: 1, title: 'Villa' },
  { id: 3, value: 2, title: 'Land' },
];

const purposePurchaseSelectData = [
  { value: '0', title: 'Principal residence' },
  { value: 1, title: 'Second home' },
  { value: 2, title: 'Resell' },
  { value: 3, title: 'Rental investment' },
];

export const calendarsName = [
  'visit1',
  'visit2',
  'visit3',
  'visit4',
  'visit5',
  'visit6',
  'visit7',
  'visit8',
  'visit9',
];

export const mock = [
  {
    id: 1,
    name: requestValues.request_type,
    toggleType: 'single',
    defaultValue: requestDealToggleData[0],
    fieldType: 'toggle',
    toggleList: requestDealToggleData,
    className: 'justify-start gap-0',
  },
  {
    id: 2,
    placeholder: 'Assistant',
    fieldType: 'multiselect',
    name: requestValues.assistants,
    classNames: 'w-full',
  },
  {
    id: 3,
    placeholder: 'Urgency',
    name: requestValues.urgency_type,
    fieldType: 'select',
    selectData: urgencySelectData,
    classNames: 'w-full',
  },
  {
    id: 4,
    placeholder: 'Status',
    name: requestValues.status,
    fieldType: 'select',
    defaultValue: [
      {
        value: 1,
        title: 'Active',
        color: 'border-bluePastelColor bg-bluePastelColor',
      },
    ],
    selectData: statusSelectData,
    classNames: 'w-full',
  },
  {
    id: 5,
    placeholder: 'Source',
    name: requestValues.source,
    fieldType: 'text',
    classNames: 'w-full',
  },
  {
    id: 6,
    placeholder: 'Add visit',
    fieldType: 'calendar',
    hasAddButton: true,
    hasDeleteButton: true,
    name: requestValues.visit,
    classNames: 'w-9/12',
  },
  {
    id: 7,
    placeholder: 'Add visit',
    fieldType: 'calendar',
    hasDeleteButton: true,
    name: 'visit1',
    classNames: 'visit1 hidden w-9/12',
  },
  {
    id: 8,
    placeholder: 'Add visit',
    fieldType: 'calendar',
    hasDeleteButton: true,
    name: 'visit2',
    classNames: 'visit2 hidden w-9/12',
  },
  {
    id: 9,
    placeholder: 'Add visit',
    fieldType: 'calendar',
    hasDeleteButton: true,
    name: 'visit3',
    classNames: 'visit3 hidden w-9/12',
  },
  {
    id: 10,
    placeholder: 'Add visit',
    fieldType: 'calendar',
    hasDeleteButton: true,
    name: 'visit4',
    classNames: 'visit4 hidden w-9/12',
  },
  {
    id: 11,
    placeholder: 'Add visit',
    fieldType: 'calendar',
    hasDeleteButton: true,
    name: 'visit5',
    classNames: 'visit5 hidden w-9/12',
  },
  {
    id: 12,
    placeholder: 'Add visit',
    fieldType: 'calendar',
    hasDeleteButton: true,
    name: 'visit6',
    classNames: 'visit6 hidden w-9/12',
  },
  {
    id: 13,
    placeholder: 'Add visit',
    fieldType: 'calendar',
    hasDeleteButton: true,
    name: 'visit7',
    classNames: 'visit7 hidden w-9/12',
  },
  {
    id: 14,
    placeholder: 'Add visit',
    fieldType: 'calendar',
    hasDeleteButton: true,
    name: 'visit8',
    classNames: 'visit8 hidden w-9/12',
  },
  {
    id: 15,
    placeholder: 'Add visit',
    fieldType: 'calendar',
    hasDeleteButton: true,
    name: 'visit9',
    classNames: 'visit9 hidden w-9/12',
  },
  {
    id: 7,
    placeholder: 'Purpose of purchase',
    name: requestValues.purpose,
    fieldType: 'select',
    selectData: purposePurchaseSelectData,
    classNames: 'w-full',
  },
  {
    id: 8,
    name: requestValues.realty_types,
    toggleType: 'multiple',
    fieldType: 'toggle',
    toggleList: houseTypeData,
    className: 'justify-start gap-0',
  },
  {
    id: 9,
    placeholder: 'Country',
    name: requestValues.country_id,
    fieldType: 'select',
    classNames: 'w-full',
  },
  {
    id: 10,
    placeholder: 'Cities',
    name: requestValues.cities,
    fieldType: 'multiselectDepedent',
    selectDepedentData: citiesData,
    selectDepedentDataLoading: citiesDataLoading,
    classNames: 'w-full',
  },
  {
    title: 'Bedrooms',
    name: 'bedrooms',
    inputs: [
      {
        id: 10,
        placeholder: 'Min',
        name: requestValues.bedroom_from,
      },
      {
        id: 11,
        placeholder: 'Max',
        name: requestValues.bedroom_to,
      },
    ],
    fieldType: 'minMax',
    classNames: 'flex flex-row items-center gap-2 w-full sm:gap-8',
  },
  {
    title: 'Budget',
    name: 'budget',
    inputs: [
      {
        id: 12,
        placeholder: 'Min',
        name: requestValues.budget_from,
      },
      {
        id: 13,
        placeholder: 'Max',
        name: requestValues.budget_to,
      },
    ],
    fieldType: 'minMax',
    classNames: 'flex flex-row items-center gap-2 w-full sm:gap-8',
  },
  {
    title: 'Living size',
    name: 'living_area',
    inputs: [
      {
        id: 14,
        placeholder: 'Min',
        name: requestValues.living_area_from,
      },
      {
        id: 15,
        placeholder: 'Max',
        name: requestValues.living_area_to,
      },
    ],
    fieldType: 'minMax',
    classNames: 'flex flex-row items-center gap-2 w-full sm:gap-8',
  },
  {
    title: 'Land',
    name: 'land',
    inputs: [
      {
        id: 16,
        placeholder: 'Min',
        name: requestValues.land_from,
      },
      {
        id: 17,
        placeholder: 'Max',
        name: requestValues.land_to,
      },
    ],
    fieldType: 'minMax',
    classNames: 'flex flex-row items-center gap-2 w-full sm:gap-8',
  },
  {
    id: 18,
    placeholder: 'Comment',
    fieldType: 'textarea',
    name: requestValues.comment,
    classNames: 'w-full',
  },
  {
    id: 19,
    name: requestValues.note,
    fieldType: 'textareaDefaultValue',
    defaultValue: textareaClientDefaultValue,
    classNames: 'w-full',
  },
];
