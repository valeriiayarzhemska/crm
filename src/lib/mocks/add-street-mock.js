import { validationSchema } from '../validationSchema';

export const initialValues = {
  name: '',
  city_id: '',
};

export const validationSchemaStreet = {
  name: validationSchema.default,
  city_id: validationSchema.default,
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
    placeholder: 'City',
    name: 'city_id',
    fieldType: 'select',
    classNames: 'w-full',
  },
];
