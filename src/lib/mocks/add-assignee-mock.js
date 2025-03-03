import { validationSchema } from '../validationSchema';

export const initialValues = {
  buyer_assistant: '',
  buyer_agent: '',
};

export const validationSchemaCity = {
  buyer_assistant: validationSchema.default,
};

export const mock = [
  {
    id: 1,
    placeholder: 'Buyer assistant',
    name: 'buyer_assistant',
    fieldType: 'select',
    classNames: 'w-full sm:w-[64.6%]',
  },
];
