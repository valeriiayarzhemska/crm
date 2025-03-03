import { validationSchema } from '../validationSchema';

export const initialValues = {
  email: '',
  password: '',
};

export const validationSchemaLogin = {
  email: validationSchema.email,
  password: validationSchema.password,
};

export const mock = [
  {
    id: 1,
    placeholder: 'Email',
    name: 'email',
    fieldType: 'text',
    classNames: 'w-60 sm:w-80',
  },
  {
    id: 2,
    placeholder: 'Password',
    name: 'password',
    type: 'password',
    fieldType: 'text',
    classNames: 'mb-5 w-60 sm:w-80',
  },
];
