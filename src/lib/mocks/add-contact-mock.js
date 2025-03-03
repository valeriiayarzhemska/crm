import { validationSchema } from '../validationSchema';
import { langRadioData } from './add-client-mock';

export const initialValues = {
  role: '',
  introducer_type: '',
  isCompany: '',
  company_name: '',
  company_address: '',
  relations: '',
  locale: '',
  gender: '',
  last_name: '',
  first_name: '',
  phone: '',
  email: '',
  additional_phone: '',
  website: '',
  note: '',
  country: '',
  city: '',
};

export const validationSchemaContact = {
  first_name: validationSchema.default,
  last_name: validationSchema.default,
};

export const roleSelectData = [
  { value: '0', title: 'None' },
  { value: 1, title: 'Owner' },
  { value: 2, title: 'Personal assistant' },
  { value: 3, title: 'Mediator' },
  { value: 4, title: 'Manager' },
  { value: 5, title: 'Housekeeping Staff' },
  { value: 6, title: 'Sales Agent' },
  { value: 7, title: 'Gardener' },
  { value: 8, title: 'Various Staff' },
  { value: 9, title: 'Family' },
  { value: 10, title: 'Friends' },
  { value: 11, title: 'Business Provider' },
  { value: 12, title: 'Client' },
  { value: 13, title: 'Former owner' },
];

const introducerSelectData = [
  { value: '0', title: 'None' },
  { value: 1, title: 'Property dealer' },
  { value: 2, title: 'Neighbour without commission' },
  { value: 3, title: 'Neighbour with commissionant' },
  { value: 4, title: 'Business introducer with commission' },
];

const raltionsSelectData = [
  { value: '0', title: 'None' },
  { value: 1, title: 'Prospecting of internet' },
  { value: 2, title: 'Re-lift of property' },
  { value: 3, title: 'Relations' },
  { value: 4, title: 'Letters sending' },
  { value: 5, title: 'Business introducer' },
  { value: 6, title: 'Teleskop' },
  { value: 7, title: 'Other' },
];

const genderToggleData = [
  { value: '0', title: 'None' },
  { value: 1, title: 'Monsieur' },
  { value: 2, title: 'Madame' },
];

export const mock = [
  {
    id: 1,
    placeholder: 'Role',
    name: 'role',
    fieldType: 'select',
    selectData: roleSelectData,
    hint: 'Role of this contact for the related listing',
    classNames: 'w-full',
  },
  {
    id: 2,
    placeholder: 'Introducer type',
    name: 'introducer_type',
    fieldType: 'select',
    selectData: introducerSelectData,
    classNames: 'w-full',
  },
  {
    id: 3,
    checkboxText: 'Company',
    name: 'isCompany',
    fieldType: 'checkbox',
    classNames: 'w-max',
  },
  {
    id: 4,
    placeholder: 'Company name',
    name: 'company_name',
    fieldType: 'text',
    classNames: 'w-full',
  },
  {
    id: 5,
    placeholder: 'Company address',
    name: 'company_address',
    fieldType: 'text',
    classNames: 'w-full',
  },
  {
    id: 6,
    placeholder: 'Source',
    name: 'relations',
    fieldType: 'select',
    selectData: raltionsSelectData,
    classNames: 'w-full',
  },
  {
    id: 7,
    name: 'locale',
    fieldType: 'toggle',
    toggleList: langRadioData,
    classNames: 'w-full',
    className: 'justify-start flex-wrap gap-0',
  },
  {
    id: 8,
    name: 'gender',
    fieldType: 'toggle',
    toggleList: genderToggleData,
    classNames: 'w-full',
    className: 'justify-start flex-wrap gap-0',
  },
  {
    id: 9,
    placeholder: 'Last name',
    name: 'last_name',
    fieldType: 'text',
    isRequired: true,
    classNames: 'w-full',
  },
  {
    id: 10,
    placeholder: 'First name',
    name: 'first_name',
    fieldType: 'text',
    isRequired: true,
    classNames: 'w-full',
  },
  {
    id: 11,
    placeholder: 'Mobile phone',
    name: 'phone',
    fieldType: 'text',
    classNames: 'w-full',
  },
  {
    id: 12,
    placeholder: 'Email',
    name: 'email',
    fieldType: 'text',
    classNames: 'w-full',
  },
];

export const mockContactsAdditional = [
  {
    id: 1,
    placeholder: 'Phone',
    name: 'additional_phone',
    fieldType: 'text',
    classNames: 'w-full',
  },
  {
    id: 2,
    placeholder: 'Address',
    name: 'address',
    fieldType: 'text',
    classNames: 'w-full',
  },
  {
    id: 3,
    placeholder: 'Postal code',
    name: 'postal_code',
    fieldType: 'text',
    classNames: 'w-full',
  },
  {
    id: 4,
    placeholder: 'Country',
    name: 'country',
    fieldType: 'text',
    classNames: 'w-full',
  },
  {
    id: 5,
    placeholder: 'City',
    name: 'city',
    fieldType: 'text',
    classNames: 'w-full',
  },
  {
    id: 6,
    placeholder: 'Website',
    name: 'website',
    fieldType: 'text',
    classNames: 'w-full',
  },
  {
    id: 7,
    placeholder: 'Notes',
    fieldType: 'textarea',
    name: 'note',
    classes: 'h-20',
    classNames: 'w-full',
  },
];
