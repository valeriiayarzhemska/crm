import { countryFranceDefault } from '../../data/constants';
import {
  citiesData,
  citiesDataLoading,
} from '../../redux/features/dashboard/dashboardSelectors';
import { validationSchema } from '../validationSchema';

export const initialValues = {
  client_type: 1,
  first_name: '',
  last_name: '',
  gender: '',
  locale: '',
  phone: '',
  phone2: '',
  phone3: '',
  office_phone: '',
  office_phone2: '',
  email: '',
  email2: '',
  address: '',
  zip_code: '',
  city_id: '',
  country_id: '',
  invoice_address: '',
  documents: '',
};

export const validationSchemaClient = {
  first_name: validationSchema.firstName,
  last_name: validationSchema.lastName,
  locale: validationSchema.default,
};

export const leadBuyerToggleData = [
  { id: 1, value: '0', title: 'Lead' },
  { id: 2, value: 1, title: 'Buyer' },
];

export const genderRadioData = [
  { id: 1, value: '0', title: 'Female' },
  { id: 2, value: 1, title: 'Male' },
];

export const langRadioData = [
  { id: 1, value: '0', title: 'fr' },
  { id: 2, value: 1, title: 'en' },
  { id: 3, value: 2, title: 'ru' },
];

export const mock = [
  {
    id: 1,
    name: 'client_type',
    defaultValue: { id: 2, value: 1, title: 'Buyer' },
    toggleType: 'single',
    fieldType: 'toggle',
    toggleList: leadBuyerToggleData,
    className: 'justify-start gap-0',
  },
  {
    id: 2,
    placeholder: 'First Name',
    fieldType: 'text',
    name: 'first_name',
    classNames: 'w-full',
  },
  {
    id: 3,
    placeholder: 'Last Name',
    fieldType: 'text',
    name: 'last_name',
    classNames: 'w-full',
  },
  {
    id: 4,
    name: 'gender',
    fieldType: 'radio',
    radioList: genderRadioData,
  },
  {
    id: 5,
    name: 'locale',
    fieldType: 'radio',
    radioList: langRadioData,
  },
  {
    id: 6,
    fieldType: 'text',
    placeholder: 'Phone 1',
    name: 'phone',
    classNames: 'w-full',
  },
  {
    id: 7,
    fieldType: 'text',
    placeholder: 'Phone 2',
    name: 'phone2',
    classNames: 'w-full',
  },
  {
    id: 8,
    fieldType: 'text',
    placeholder: 'Phone 3',
    name: 'phone3',
    classNames: 'w-full',
  },
  {
    id: 9,
    placeholder: 'Office phone 1',
    fieldType: 'text',
    name: 'office_phone',
    classNames: 'w-full',
  },
  {
    id: 10,
    placeholder: 'Office phone 2',
    fieldType: 'text',
    name: 'office_phone2',
    classNames: 'w-full',
  },
  {
    id: 11,
    placeholder: 'Email 1',
    fieldType: 'text',
    name: 'email',
    classNames: 'w-full',
  },
  {
    id: 12,
    placeholder: 'Email 2',
    fieldType: 'text',
    name: 'email2',
    classNames: 'w-full',
  },
  {
    id: 13,
    placeholder: 'Country',
    name: 'country_id',
    fieldType: 'select',
    classNames: 'w-full',
  },
  {
    id: 14,
    placeholder: 'City',
    name: 'city_id',
    fieldType: 'selectDepedent',
    selectDepedentData: citiesData,
    selectDepedentDataLoading: citiesDataLoading,
    classNames: 'w-full',
  },
  {
    id: 15,
    placeholder: 'Address',
    fieldType: 'text',
    name: 'address',
    classNames: 'w-full',
  },
  {
    id: 16,
    placeholder: 'Zip Code',
    fieldType: 'text',
    name: 'zip_code',
    classNames: 'w-full',
  },
  {
    id: 17,
    placeholder: 'Invoice Address',
    fieldType: 'text',
    name: 'invoice_address',
    classNames: 'w-full',
  },
];
