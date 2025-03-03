import { validationSchema } from '../validationSchema';

export const initialValues = {
  name: '',
  latitude: '',
  longitude: '',
  street_id: '',
  postal_code: '',
};

export const validationSchemaStreetNumber = {
  name: validationSchema.default,
  street_id: validationSchema.default,
};

export const mock = [
  {
    id: 1,
    placeholder: 'Name',
    name: 'name',
    fieldType: 'text',
    classNames: 'w-full',
  },
  {
    id: 2,
    placeholder: 'Latitude',
    type: 'number',
    name: 'latitude',
    fieldType: 'text',
    classNames: 'w-full',
  },
  {
    id: 3,
    placeholder: 'Longitude',
    type: 'number',
    name: 'longitude',
    fieldType: 'text',
    classNames: 'w-full',
  },
  {
    id: 4,
    placeholder: 'Street',
    name: 'street_id',
    fieldType: 'select',
    classNames: 'w-full',
  },
  {
    id: 5,
    placeholder: 'Postal code',
    name: 'postal_code',
    fieldType: 'text',
    classNames: 'w-full',
  },
];
