import { validationSchema } from '../validationSchema';
import { langRadioData } from './add-client-mock';

export const emailsValuesTitles = {
  locale: 'locale',
  client_id: 'client_id',
  subject: 'subject',
  recipient: 'recipient',
  recipient_cc: 'recipient_cc',
  title: 'title',
  text: 'text',
  attachments: 'attachments',
};

export const textareaValues = {
  [emailsValuesTitles.subject]: {
    0: 'Sélection immobilière personnalisée',
    1: 'Your personalized properties selection in French Riviera',
    2: 'Персональная подборка недвижимости',
  },
  [emailsValuesTitles.title]: {
    0: 'Bonjour {firstName} {lastName},',
    1: 'Dear {firstName} {lastName},',
    2: 'Добрый день, {firstName}!',
  },
  [emailsValuesTitles.text]: {
    0: 'Je vous invite à consulter cette sélection faite pour vous! Merci d`avance pour votre retour,',
    1: 'Please check out this real estate selected for you! Thank you in advance for your feedback.',
    2: 'Пожалуйста, ознакомьтесь с выбранной для вас недвижимостью! Заранее благодарю за обратную связь.',
  },
};

export const initialValues = {
  [emailsValuesTitles.locale]: '',
  [emailsValuesTitles.client_id]: '',
  [emailsValuesTitles.subject]: '',
  [emailsValuesTitles.recipient]: '',
  [emailsValuesTitles.recipient_cc]: '',
  [emailsValuesTitles.title]: '',
  [emailsValuesTitles.text]: '',
  [emailsValuesTitles.attachments]: [],
};

export const validationSchemaEmail = {
  [emailsValuesTitles.client_id]: validationSchema.default,
  [emailsValuesTitles.recipient]: validationSchema.default,
};

export const mockLocale = {
  id: 1,
  name: emailsValuesTitles.locale,
  fieldType: 'toggle',
  toggleList: langRadioData,
  className: 'justify-start gap-0 flex-wrap',
  classNames: 'w-full',
};

export const mock = [
  
  {
    id: 2,
    placeholder: 'Recipient',
    name: emailsValuesTitles.recipient,
    fieldType: 'text',
    classNames: 'w-full sm:w-1/2',
  },
  {
    id: 3,
    placeholder: 'Recipient CC (optional)',
    name: emailsValuesTitles.recipient_cc,
    fieldType: 'text',
    classNames: 'w-full sm:w-1/2',
  },
];

export const mockTextareas = [
  {
    id: 1,
    name: emailsValuesTitles.subject,
    textareaLabel: 'Email subject',
    fieldType: 'textareaDefaultValue',
    defaultValue: textareaValues[emailsValuesTitles.subject][1],
    classes: 'h-16',
    classNames: 'w-full sm:w-1/2',
  },
  {
    id: 2,
    name: emailsValuesTitles.title,
    textareaLabel: 'Title',
    fieldType: 'textareaDefaultValue',
    defaultValue: textareaValues[emailsValuesTitles.title][1],
    classes: 'h-16',
    classNames: 'w-full sm:w-1/2',
  },
  {
    id: 3,
    name: emailsValuesTitles.text,
    textareaLabel: 'Text',
    fieldType: 'textareaDefaultValue',
    defaultValue: textareaValues[emailsValuesTitles.text][1],
    classes: 'h-28',
    classNames: 'w-full sm:w-1/2',
  },
];
