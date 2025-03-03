import { validationSchema } from '../validationSchema';

export const initialValues = {
  original_name: '',
};

export const validationSchemaDocName = {
  original_name: validationSchema.minLength,
};

export const mock = [
  {
    id: 1,
    placeholder: 'New name',
    fieldType: 'text',
    name: 'original_name',
    classNames: 'w-full',
  },
];
