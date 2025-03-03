import * as Yup from 'yup';

const formatPhoneNumber = value => {
  const phoneNumber = value.replace(/[^\d]/g, '');
  const match = phoneNumber.match(/^(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/);

  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]} ${match[4]} ${match[5]}`;
  }

  return value;
};

export const validationSchema = {
  username: Yup.string().required(' ').min(4, ' '),
  phone: Yup.string()
    .required(' ')
    .matches(/^\+?\d{2} \(\d{3}\) \d{3} \d{2} \d{2}$/, ' ')
    .transform(formatPhoneNumber),
  email: Yup.string().email(' ').required(' '),
  password: Yup.string().required(' ').min(4, ' '),
  repeatPassword: Yup.string()
    .required(' ')
    .oneOf([Yup.ref('password')], ' '),
  minLength: Yup.string().required(' ').min(3, ' '),
  firstName: Yup.string().required(' ').min(2, ' '),
  lastName: Yup.string().required(' ').min(2, ' '),
  textInput: Yup.string().required(' ').min(2, ' '),
  default: Yup.string().required(' '),
  checkbox: Yup.bool().oneOf([true], ' '),
  percentage: Yup.number().max(100, ' '),
  arrayNumbers: Yup.array().required(' '),
  titleRealty: Yup.string().max(65, ' '),
};
