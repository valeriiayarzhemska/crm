import { mockAccordionTitles } from '../../../data/constants';
import { validationSchema } from '../../validationSchema';
import { mandateSelectData } from '../search-mock';

const mandateStatusSelectData = [
  { value: '0', title: 'None' },
  { value: 1, title: 'Sent for signature' },
  { value: 2, title: 'Signed' },
  { value: 3, title: 'Expired' },
  { value: 4, title: 'Canceled' },
];

const mockTitle = mockAccordionTitles.Mandate;

export const validationSchemaMandate = {
  mandate_number: validationSchema.default,
  mandate_status: validationSchema.default,
  mandate_type: validationSchema.default,
};

export const mandateMockValues = {
  mandate_number: '',
  mandate_status: '',
  mandate_type: '',
  mandate_start_date: '',
  mandate_end_date: '',
};

export const mandateMock = [
  {
    title: mockTitle,
    id: 1,
    placeholder: 'Mandate number',
    fieldType: 'text',
    name: 'mandate_number',
    classNames: 'w-11/12 sm:w-2/4',
  },
  {
    title: mockTitle,
    id: 2,
    placeholder: 'Mandate',
    fieldType: 'select',
    name: 'mandate_type',
    selectData: mandateSelectData,
    classNames: 'w-11/12 sm:w-2/4',
  },
  {
    title: mockTitle,
    id: 3,
    placeholder: 'Mandate status',
    fieldType: 'select',
    name: 'mandate_status',
    selectData: mandateStatusSelectData,
    classNames: 'w-11/12 sm:w-2/4',
  },
  {
    title: mockTitle,
    id: 4,
    placeholder: 'Mandate start date',
    fieldType: 'calendar',
    hasDeleteButton: true,
    name: 'mandate_start_date',
    classNames: 'w-10/12 sm:w-2/4',
  },
  {
    title: mockTitle,
    id: 5,
    placeholder: 'Mandate end date',
    fieldType: 'calendar',
    hasDeleteButton: true,
    name: 'mandate_end_date',
    classNames: 'w-10/12 sm:w-2/4',
  },
];
